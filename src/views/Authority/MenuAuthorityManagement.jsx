import { Button, FormWrapper, Select } from "../../style/CommonStyle";
import { UserConfirmWrapper } from "../../style/StyledComponent";
import { SignOut } from "../../util/SessionUtil";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import uuid from 'react-uuid'
import axios from 'axios'
import BreadCrumb from '../../components/BreadCrumb';

const MenuAuthorityWrapper = styled.div`
    width:100%;
    height:auto;
    padding:20px;
    border-radius:10px;
    box-shadow:0px 0px 5px 0px rgba(0,0,0,0.2);
`;

const AuthorityWrapper = styled.div`
    width:100%;
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    grid-gap:20px;

    .confirm-wrapper{
        grid-column-start:1;
        grid-column-end:4;
        margin-bottom:0px;
        margin-top:20px;
    }
`;

const MenuWrapper = styled.div`
    grid-column-start:1;
    grid-column-end:4;
    overflow:auto;
    margin-top:40px;
`;

const Tr = styled.div`
    width:100%;
    display:grid;
    grid-template-columns:repeat(4, 1fr);
    border-bottom:1px solid #ddd;

    &.title{
        border-top:1px solid #ddd;
        div{
            height:50px;
            font-size:15px;
        }
    }
    &.mainMenu{
        font-weight:bold;

        div {
            height:45px;
            border-top:0px;
            border-bottom:0px;
            grid-column-start:1;
            grid-columns-end:5;
        }
    }
`;

const Cell = styled.div`
    text-align:center;
    font-weight:${(props => props.fontWeight || 'inherit')};
    font-size:14px;
    height:38px;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const MenuAuthorityManagement = () => {
    const [authorityInfo, setAuthorityInfo] = useState([]);
    const [menuInfo, setMenuInfo] = useState([]);
    const [curAuthority, setCurAuthority] = useState(1);
    const path = [{title:'권한 관리', path:'/authority'}, {title:'메뉴 권한 관리'}];

    const getAuthorityInfo = async () => {            
        /**다시 불러오기 */
        let data = await axios.get('/getAuthorityInfo');

        if(data.status !== 200)
            return;
        
        let result = data.data;

        if(!result.isSuccess){
            SignOut(result.errorMessage);
            return;
        }

        setAuthorityInfo(result.data);
        if(result.data.length > 0){
            getMenuInfo(result.data[0].authority_id);
            setCurAuthority(result.data[0].authority_id);
        }
    }

    const getMenuInfo = async (authority_id) => {
        let data = await axios.get('/getMenuAuthorityInfo', {params : {authority_id : authority_id, is_all : 1}});

        //데이터를 가져오는 것에 실패한 경우
        if(data.status !== 200){
            onclick(data.data.errorMessage);
            return;
        }

        //세션이 닫힌 경우
        if(!data.data.isSuccess){
            SignOut(data.data.errorMessage);
            return;
        }

        let menuObj = {};
        let menuArr = [];

        if(data.data.data.length <= 0){
            let arr = menuInfo.map((val) => {
                return {...val, authority:undefined, authority_id:authority_id};
            })
            setMenuInfo(arr);
            return;
        }

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
        setMenuInfo(menuArr);
    }

    const handleAuthoritySelect = (evt) => {
        const authority_id = evt.target.value;
        setCurAuthority(authority_id);
        getMenuInfo(parseInt(authority_id));
    }

    const handleOnClickModify = () => {
        let updateData = menuInfo.filter(x => x.sub_menu_cd).map(x => {return {menu_cd:x.menu_cd, authority:x.authority, sub_menu_cd:x.sub_menu_cd, authority_id:curAuthority}});
        

        let validation = updateData.filter(x => x.authority === undefined);
        if(validation.length > 0){
            alert("권한을 체크해주세요.");
            return;
        }

        let data = {menuAuthority:JSON.stringify(updateData)};

        axios.post()
    }

    const handleChangeData = (sub_menu_cd, str) => {
        let arr = menuInfo.map((val) => {
            if(val.sub_menu_cd === sub_menu_cd){
                val.authority = str;
            }
            return val;
        })

        setMenuInfo(arr);
    }

    useEffect(() => {
        getAuthorityInfo();
    }, [])
    return (
        <div className="content-wrapper">
            <BreadCrumb current="메뉴 권한 관리" path={path}/>
            <MenuAuthorityWrapper>
                <AuthorityWrapper>
                    <FormWrapper className="modify">
                        <label>권한 등급 이름</label>
                        <Select value={curAuthority} onChange={handleAuthoritySelect}>
                            {
                                authorityInfo.map((val) => {
                                    return(
                                        <option key={uuid()} value={val.authority_id}>{val.authority_name}</option>
                                    )
                                })
                            }
                        </Select>
                    </FormWrapper>
                    <div></div><div></div>
                    <MenuWrapper>
                        <Tr className="title">
                            <Cell fontWeight="bold">메뉴 이름</Cell>
                            <Cell fontWeight="bold">읽기/쓰기</Cell>
                            <Cell fontWeight="bold">읽기</Cell>
                            <Cell fontWeight="bold">권한 없음</Cell>
                        </Tr>
                        {
                            menuInfo.map((val) => {
                                if(!val.sub_menu_cd){
                                    return (
                                        <Tr className="mainMenu" key={uuid()}>
                                            <Cell>{val.menu_name}</Cell>
                                        </Tr>
                                    )
                                }else{
                                    return (
                                        <AuthorityRadio key={uuid()} changeData={handleChangeData} sub_menu_cd={val.sub_menu_cd} sub_menu_name={val.sub_menu_name} authority={val.authority}/>
                                    )
                                }
                            })
                        }
                    </MenuWrapper>
                    <UserConfirmWrapper className="confirm-wrapper">
                        <Button className="modify" onClick={handleOnClickModify}>수정</Button>
                    </UserConfirmWrapper>
                </AuthorityWrapper>
            </MenuAuthorityWrapper>
        </div>
    )
}

const AuthorityRadio = ({changeData, sub_menu_cd, sub_menu_name, authority}) => {
    const [curAuth, setCurAuth] = useState('');

    const handleRadioData = (str) => {
        setCurAuth(str);
        changeData(sub_menu_cd, str);
    }

    useEffect(() => {
        setCurAuth(authority)
    }, [])

    return (
        <Tr>
            <Cell>{sub_menu_name}</Cell>
            <Cell> <input type="radio" checked={curAuth === 'W' && true} onChange={() => handleRadioData('W')}/> </Cell>
            <Cell> <input type="radio" checked={curAuth === 'R' && true} onChange={() => handleRadioData('R')}/> </Cell>
            <Cell> <input type="radio" checked={curAuth === 'N' && true} onChange={() => handleRadioData('N')}/> </Cell>
        </Tr>
    )
}

export default MenuAuthorityManagement; 