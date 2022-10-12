import { FormWrapper, Button, Select } from '../../../style/CommonStyle';
import { UserFormWrapper, UserConfirmWrapper } from '../../../style/StyledComponent';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Encrypt } from '../../../util/EncryptUtil';
import { SignOut } from '../../../util/SessionUtil';
import axios from 'axios';

const UserManagementContent = ({data, updateData, setUpdateData, setOpen}) => {
    const [authorityInfo, setAuthorityInfo] = useState([]);
    const [curAuth, setCurAuth] = useState();
    const {userInfo} = useSelector((state) => state.boffice);
    const {keyInfo} = useSelector((state) => state.boffice);
    
    const email_reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const pwd_reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const handleModifyUserInfo = (user_cd) => {
        let isConfirm = window.confirm("Do you want to modify this account's information");
        if(!isConfirm)
            return;
        
        let user_name = document.querySelector(".user_name");
        let user_id = document.querySelector(".user_id");
        let authority = document.querySelector(".authority");
        let email = document.querySelector(".email");
        let enable = document.querySelector(".enable");
        let user_pwd = document.querySelector(".user_pwd");
        let confirm_pwd = document.querySelector(".confirm_pwd");

        //validation
        if(!!user_id.value === false){
            alert("check user id field");
            user_id.focus();
            return;
        }
        if(!!user_name.value === false){
            alert("check user name field");
            user_name.focus();
            return;
        }
        if(!!email.value === false || !email_reg.test(email.value)){
            alert("check email field");
            email.value = "";
            email.focus();
            return;
        }
        if(!!user_pwd.value === false){
            alert("Check password field");
            user_pwd.value = "";
            user_pwd.focus();
            return;
        }
        if(user_pwd.value !== "securedPassword" && !pwd_reg.test(user_pwd.value)){
            alert("The length of password should be over 8 characters and should be contained at least over one number and special symbol");
            user_pwd.value = "";
            confirm_pwd.value = "";
            user_pwd.focus();
            return;
        }
        if(user_pwd.value !== confirm_pwd.value){
            alert("Confirm Password is not equal with password");
            confirm_pwd.value = "";
            confirm_pwd.focus();
            return;
        }

        let authority_id = parseInt(authority.value);
        let is_enable = parseInt(enable.value);

        let data = {user_id:user_id.value, user_name:user_name.value, email:email.value, authority_id:authority_id, is_enable:is_enable, user_cd:user_cd};

        if(user_pwd.value !== "securedPassword" && keyInfo){
            let sec_pwd = Encrypt(user_pwd, keyInfo);
            data["user_pwd"] = sec_pwd;
        }

        //modify
        axios.post("/updateUserInfo", data).then(res => {
            if(res.status !== 200){
                alert("Internet Error");
                return;
            }

            if(res.data.isSuccess){
                alert("success");
                let arr = updateData.map(val => {
                    let result = val;
                    if(result.user_cd === user_cd){
                        result = {...result, ...data};
                    }
                    return result;
                })

                setUpdateData(arr);
                setOpen(false);
            }else{
                SignOut(res.data.errorMessage);
                return;
            }
        })
    }

    const handleDeleteUserInfo = (user_cd) => {
        let isConfirm = window.confirm("Do you want to delete this account?");
        if(!isConfirm)
            return;

        let data = {user_cd : user_cd};
        axios.post("/deleteUserInfo", data).then(res => {
            if(res.status !== 200){
                alert("Internet Error");
                return;
            }

            if(res.data.isSuccess){
                alert("success");
                let arr = updateData.filter(x => x.user_cd !== user_cd);
                setUpdateData(arr);
                setOpen(false);
                return;
            }else{
                SignOut(res.data.errorMessage);
                return;
            }
        })
    }

    const onKeyUpPasswordHandler = (ev) => {
        let s_pwd_field = document.querySelector(".confirm_pwd");
        s_pwd_field.disabled = ev.target.value !== "securedPassword" ? false : true;
    }

    const handleSelect = (evt) => {
        setCurAuth(evt.target.value);
    }

    useEffect(() => {
        async function getAuthorityInfo(){
            let data = await axios.get('/getAuthorityInfo');

            if(data.status !== 200)
                return;
            
            let result = data.data;

            if(!result.isSuccess){
                SignOut(result.errorMessage);
                return;
            }
            setAuthorityInfo(result.data);
        }

        getAuthorityInfo();
        setCurAuth(data.authority_id);
    }, [])
    return (
        <>
        <UserFormWrapper>
            <FormWrapper className="modify">
                <label>사용자 ID</label>
                <input type="text" defaultValue={data.user_id} className="user_id"/>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>사용자 이름</label>
                <input type="text" defaultValue={data.user_name} className="user_name"/>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>이메일</label>
                <input type="text" defaultValue={data.email} className="email"/>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>관리자 등급</label>
                <Select className="authority" value={curAuth} onChange={handleSelect}>
                    {
                        authorityInfo.map((val) => {
                            return(
                                <option key={val.authority_id} value={val.authority_id}>{val.authority_name}</option>
                            )
                        })
                    }
                </Select>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>비밀번호</label>
                <input type="password" className="user_pwd" defaultValue="securedPassword" onKeyUp={onKeyUpPasswordHandler}/>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>비밀번호 확인</label>
                <input type="password" className="confirm_pwd" defaultValue="securedPassword" disabled/>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>사용 여부</label>
                {
                    <Select className="enable" defaultValue={data.is_enable}>
                        <option value={1}>가능</option>
                        <option value={0}>불가능</option>
                    </Select>
                }
            </FormWrapper>
            <FormWrapper className="modify"></FormWrapper>
        </UserFormWrapper>
        <UserConfirmWrapper>
            {(userInfo.authority_id === 1 || userInfo.user_id === data.user_id) && <Button className="modify" onClick={() => handleModifyUserInfo(data.user_cd)}>수정</Button>}
            {(userInfo.authority_id === 1 || userInfo.user_id === data.user_id) && <Button className="delete" onClick={() => handleDeleteUserInfo(data.user_cd)}>삭제</Button>}
        </UserConfirmWrapper>
        </>
    )
}

export default UserManagementContent;