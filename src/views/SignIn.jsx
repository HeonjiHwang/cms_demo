import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo, setKeyInfo } from '../redux/boffice';
import { LeftSignInWrapper, SignInWrapper, RightSignInWrapper } from '../style/StyledComponent';
import { Button, FormWrapper, Input } from '../style/CommonStyle';
import { getPublicKey, Encrypt } from '../util/EncryptUtil'; 
import axios from 'axios';
import { LeakRemoveTwoTone } from '@mui/icons-material';
import moment from 'moment/moment';

const SignIn = () => {
    const [isLoginState, setIsLoginState] = useState(true);
    const dispatch = useDispatch();
    const {keyInfo} = useSelector((state) => state.boffice);

    const onClickSignInHandler = () => {
        //validation
        let user_id = document.querySelector(".user_id").value
        let user_password = document.querySelector(".user_pwd").value;
        
        if(!user_id || user_id === ''){
            alert("USER ID FIELD IS EMPTY");
            user_id.focus();
            return;
        }
        if(!user_password || user_password === ''){
            alert("PASSWORD FIELD IS EMPTY");
            user_password.focus();
            return;
        }

        if(keyInfo){
            let sec_pwd = Encrypt(user_password, keyInfo);
            let data = {password : sec_pwd, user_id : user_id};

            axios.post("/signIn", data).then(res => {
                if(res.status !== 200)
                    return false;
                    
                if(res.data.isSuccess){
                    let {data} = res.data;
                    dispatch(setUserInfo(data[0]));
                }else{
                    if(res.data.errorMessage){
                        alert(res.data.errorMessage);
                    }else{
                        alert("로그인에 실패하였습니다.");   
                    }
                    user_id = "";
                    user_password = "";
                }
            })
        }else{
            if(user_id === 'admin' && user_password === 'admin12!'){
                dispatch({
                    user_cd:1,
                    is_admin:1,
                    authority_id:1,
                    authority_name:'시스템 관리자',
                    user_name:'관리자',
                    user_id:'admin',
                    is_valid: 1,
                    is_enable:1,
                    email: 'dalsae95@gmail.com',
                    last_login_ip:'111.111.111.111',
                    last_login_time:moment(new Date()).format('YYYY-MM-DD')
                });
            }
        }
    }

    const resetField = () => {
        let inputs = document.getElementsByTagName("input");

        for(var i=0;i<inputs.length;i++){
            inputs[i].value = "";
        }
    }

    const onClickRequestHandler = () => {
        //이메일 & 패스워드 정규식
        let email_reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        let pwd_reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        let user_name = document.querySelector(".user_name");
        let user_id = document.querySelector(".user_id");
        let email = document.querySelector(".user_email");
        let user_pwd = document.querySelector(".user_pwd");
        let c_pwd = document.querySelector(".user_confirm_pwd");
        let sec_pwd;

        //사용자 이름
        if(!!user_name.value === false){
            alert("check name field");
            user_name.focus();
            return;
        }
        //사용자 아이디
        if(!!user_id.value === false){
            alert("check user id field");
            user_id.focus();
            return;
        }
        //사용자 이메일 / 정규식
        if(!!email.value === false || !email_reg.test(email.value)){
            alert("check email field");
            email.value = "";
            email.focus();
            return;
        }
        //사용자 패스워드
        if(!!user_pwd.value === false){
            alert("check password field");
            c_pwd.value = "";
            user_pwd.focus();
            return;
        }
        //사용자 패스워드 정규식
        if(!pwd_reg.test(user_pwd.value)){
            alert("The length of password should be over 8 characters and should be contained at least over one number and special symbol");
            user_pwd.value = "";
            c_pwd.value = "";
            user_pwd.focus();
            return;
        }
        //사용자 패스워드 확인
        if(user_pwd.value !== c_pwd.value){
            alert("password is not confirmed");
            user_pwd.value = "";
            c_pwd.value = "";
            user_pwd.focus();
            return;
        }
        
        //암호화
        if(keyInfo){
            sec_pwd = Encrypt(user_pwd.value, keyInfo);

            if(sec_pwd === ''){
                alert("encryption failed");
                return;
            }

            let data = {user_id:user_id.value, user_name:user_name.value, email:email.value, user_pwd:sec_pwd};
            
            axios.post("/setReqUserInfo", data).then(res => {
                if(res.data.isSuccess){
                    alert("Request Success");
                    resetField();
                    setIsLoginState(true);
                }else{
                    if(res.data.errorMessage){
                        alert(res.data.errorMessage);
                        return;
                    }
                    alert("Request Fail");
                }
            });
        }else{
            alert("Request Fail.");
            resetField();
            setIsLoginState(true);
        }
    }

    const onClickChangeStateHandler = () => {
        resetField();
        setIsLoginState(!isLoginState);
    }

    const onEnterHandler = (ev) => {
        if(ev.keyCode && ev.keyCode === 13){
            onClickSignInHandler();
        }
    }

    const setCookie = useCallback((name, value, exp) => {
        var date = new Date();
        date.setTime(date.getTime() + exp*24*60*60*1000);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    }, []);

    useEffect(() => {
        async function setKey(){
            // let result = await getPublicKey();
            // dispatch(setKeyInfo(result.data.data));
        }

        setCookie("KOR", "event0405", 7);
        setKey();
    }, [setCookie])

    return(
        <SignInWrapper>
            <div className="content">
                <LeftSignInWrapper>
                    <div className="logoWrapper">
                        <h2><strong>BACK OFFICE TEST</strong></h2>
                    </div>
                    <div className="logoDesc">
                        <span>This is pocketmemory's back office test web site.</span>
                        <span>made by React.js</span>
                    </div>
                </LeftSignInWrapper>
                <RightSignInWrapper>
                    <div className="titleWrapper">
                        {   
                            isLoginState ? 
                            <h2><strong>SIGN IN</strong> <span> | REQUEST</span></h2> : 
                            <h2><span>SIGN IN  | </span> <strong>REQUEST</strong></h2>
                        }
                        <div className="signup_">
                            <Button className="none" onClick={onClickChangeStateHandler}>{isLoginState ? "Do you want to request your account?" : "Do you already have your account?"}</Button>
                        </div>
                    </div>
                    <div className="signContent" onKeyUp={onEnterHandler}>
                        {
                            isLoginState ? 
                            <>
                                <FormWrapper>
                                    <label>USER ID</label>
                                    <Input type="text" className="user_id"/>
                                </FormWrapper>
                                <FormWrapper>
                                    <label>PASSWORD</label>
                                    <Input type="password"  className="user_pwd"/>
                                </FormWrapper>
                                <div className="findInfo">
                                    <a>Forget Password ?</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a>Forget User ID ?</a>
                                </div>
                                
                                <div className="signInConfirm" style={{textAlign:"right"}}>
                                    <Button className="circled confirm" onClick={onClickSignInHandler}>Sign In</Button>
                                </div>
                            </> : 
                            <>
                                <FormWrapper marginTop={20}>
                                    <label>NAME</label>
                                    <Input type="text" className="user_name" />
                                </FormWrapper>
                                <FormWrapper marginTop={20}>
                                    <label>USER ID</label>
                                    <Input type="text" className="user_id"/>
                                </FormWrapper>
                                <FormWrapper marginTop={20}>
                                    <label>E-MAIL</label>
                                    <Input type="text" className="user_email"/>
                                </FormWrapper>
                                <FormWrapper marginTop={20}>
                                    <label>PASSWORD</label>
                                    <Input type="password" className="user_pwd"/>
                                </FormWrapper>
                                <FormWrapper marginTop={20}>
                                    <label>CONFIRM PASSWORD</label>
                                    <Input type="password" className="user_confirm_pwd"/>
                                </FormWrapper>

                                <div className="signInConfirm" style={{textAlign:"right", bottom:"0px"}}>
                                    <Button className="circled confirm" onClick={onClickRequestHandler}>Request</Button>
                                </div>
                            </>
                        }
                    </div>
                </RightSignInWrapper>
            </div>
        </SignInWrapper>
    )
}

export default SignIn;
