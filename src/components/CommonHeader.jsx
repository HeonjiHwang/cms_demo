import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from "../redux/boffice";
import { Link } from 'react-router-dom';
import { Header } from '../style/StyledComponent';
import { Icon } from '../style/CommonStyle';
import axios from "axios";

const CommonHeader = () => {
    const [mainMenu, setMainMenu] = useState([]);
    const [activeMenu, setActiveMenu] = useState(1);
    const [activeSubMenu, setActiveSubMenu] = useState(1);
    const [isClose, setIsClose] = useState(false);
    const {userInfo} = useSelector((state) => state.boffice);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onClickSignOut = (msg) => {
        if(msg && typeof(msg) === 'string')
            alert(msg);

        dispatch(setUserInfo({}));
        navigate("/");
        //signout server session 삭제
        axios.post("/signout")
    }

    const toggleMenu = (menu_cd) => {
        let subMenus = document.getElementsByClassName(`submenu-${menu_cd}`);
        for(let i=0;i<subMenus.length;i++){
            let val = subMenus[i];

            if(val.classList.contains("close")){
                val.classList.remove("close");
                val.classList.add("open");
            }else{
                val.classList.remove("open");
                val.classList.add("close");
            }
        }
    }

    const chgActiveMenu = (menu_cd, sub_menu_cd) => {
        setActiveMenu(menu_cd);
        setActiveSubMenu(sub_menu_cd)
    }

    const onCloseHeaderHandler = () => {
        let header = document.querySelector(".mainHeader");
        let contentwrapper = document.querySelector(".content-wrapper");

        header.style.width = isClose ? "300px" : "100px";
        contentwrapper.style.width = isClose ? "calc(100% - 300px)" : "calc(100% - 100px)";

        setIsClose(!isClose);
    }

    useEffect(() => {
        async function getMenuInfo(){
            if(userInfo.authority_id){
                let data = await axios.get('/getMenuAuthorityInfo', {params : {authority_id : userInfo.authority_id}});

                //데이터를 가져오는 것에 실패한 경우
                if(data.status !== 200){
                    onClickSignOut("Internet Error");
                    return;
                }

                //세션이 닫힌 경우
                if(!data.data.isSuccess){
                    let errorMsg = data.data.errorMessage;
                    onClickSignOut(errorMsg);
                    return;
                }

                let menuObj = {};
                let menuArr = [];

                data.data.data.forEach(val => {
                    if(!menuObj[val.menu_cd]) menuObj[val.menu_cd] = [];

                    menuObj[val.menu_cd].push(val);
                })

                for(let k in menuObj){
                    let {menu_cd, menu_icon, menu_name, menu_url, authority} = menuObj[k][0];
                    let obj = {menu_cd, menu_icon, menu_name, menu_url, authority};
                    menuArr.push(obj);

                    let arr = menuObj[k];
                    arr.forEach(val => menuArr.push(val));
                }
                //정상
                setMainMenu(menuArr);
            }
        }
        getMenuInfo();
    }, [])

    return (
        <Header className="mainHeader">
            <div className="logo-wrapper">
                <span>PocketMemory</span>
                <h2>BACK OFFICE TEST</h2>
            </div>
            {
                !isClose ? 
                <div className="userinfo-wrapper">
                    <div className="profile"></div>
                    <div className="userinfo">
                            <div>
                                <span><strong>{userInfo.user_name}</strong>님 환영합니다.</span> 
                                <input type="checkbox" name="chk-userinfo" id="chk-userinfo"/>
                                <label htmlFor="chk-userinfo"><i className="arrow"></i></label>
        
                                <div className="toggle-userinfo">
                                    <p>
                                        <Icon src="Notice" width={15} height={15}></Icon>
                                        <span>{[userInfo.user_id,userInfo.authority_name].join(' | ')}</span>
                                    </p>
                                    <p>
                                        <Icon src="Email" width={15} height={15}></Icon>
                                        <span>{userInfo.email}</span>
                                    </p>
                                    <br/>
                                    <p>
                                        <Icon src="Edit" width={15} height={15}></Icon>
                                        <Link to="/usermanagement" onClick={() => chgActiveMenu(4,6)}>사용자 정보 수정</Link>
                                    </p>
                                </div>
                            </div>
                    </div>
                </div>
                :
                <div className="close-userinfo">
                    <p>
                        <Link to="/usermanagement"><Icon src="User" width={30} height={30} opacity={1}></Icon></Link>
                    </p>
                </div>
            }
            <div className="menu-wrapper">
                <ul>
                    {
                        !isClose ? 
                        mainMenu.map((val) => {
                            if(!val.sub_menu_cd){
                                let opacity = activeMenu === val.menu_cd ? 1 : 0.5;
                                let _className = activeMenu === val.menu_cd ? 'active' : '';
                                return(
                                    <li key={val.menu_cd} className={`mainmenu-${val.menu_cd}`} onClick={() => toggleMenu(val.menu_cd)}>
                                        <a href="#"  title={val.menu_name}>
                                            <Icon src={val.menu_icon} width={20} height={20} opacity={opacity} className={`mainmenu-icon-${val.menu_cd}`}/>
                                            <span className={_className}>{val.menu_name}</span>
                                        </a>
                                    </li>
                                )
                            }else{
                                let className = activeMenu === val.menu_cd ? 'open' : 'close';
                                let _className = activeSubMenu === val.sub_menu_cd ? 'active' : '';
                                return(
                                    <li key={`${val.menu_cd}_${val.sub_menu_cd}`} className={`submenu ${className} submenu-${val.menu_cd}`}>
                                        <Link to={val.sub_menu_url} onClick={() => chgActiveMenu(val.menu_cd, val.sub_menu_cd)}>
                                            <span className={_className}>{val.sub_menu_name}</span>
                                        </Link>
                                    </li>
                                )
                            }
                        })
                        :
                        mainMenu.map((val) => {
                            if(!val.sub_menu_cd){
                                return(
                                    <li key={val.menu_cd} className={`mainmenu-${val.menu_cd} closed-wrppaer`} onClick={() => toggleMenu(val.menu_cd)}>
                                        <a href="#">
                                            <Icon src={val.menu_icon} width={25} height={25}/>
                                        </a>
                                    </li>
                                )
                            }else{
                            }
                        })
                    }
                </ul>                
            </div>
            <div className="header-footer">
                {
                    !isClose ?
                    <a href="#" onClick={onClickSignOut}>
                        <Icon src="Logout" width={20} height={20}/>
                        <span>로그아웃</span>
                    </a>
                    :
                    <a href="#" onClick={onClickSignOut} style={{left:"50%", transform:"translateX(-50%)"}} title="로그아웃">
                        <Icon src="Logout" width={30} height={30}/>
                    </a>
                }
            </div>

            {/* <div className="closeButton">
                <button onClick={onCloseHeaderHandler}>
                    {
                        isClose ? <Icon width={30} height={30} src={'Arrow'} transform={"rotate(-90deg)"}/> : <Icon width={30} height={30} src={'Arrow'} transform={"rotate(90deg)"}/>
                    }
                </button>
            </div> */}
        </Header>
    )
}

export default CommonHeader;