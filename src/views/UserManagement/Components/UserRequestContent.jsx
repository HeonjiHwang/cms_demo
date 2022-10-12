import { FormWrapper, Button, Select } from '../../../style/CommonStyle';
import { UserFormWrapper, UserConfirmWrapper } from '../../../style/StyledComponent';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SignOut } from '../../../util/SessionUtil';

const UserRequestContent = ({data, updateData, setUpdateData}) => {
    const [authorityInfo, setAuthorityInfo] = useState([]);
    
    const onClickRegisterHandler = (req_num) => {
        let isConfirm = window.confirm("Do you want to register?");
        if(!isConfirm)
            return;

        let authority = document.querySelector(".authority");
        let enable = document.querySelector(".enable");

        let aIndex = authority.selectedIndex;
        if(aIndex === 0){
            alert("please select authority info");
            return;
        }

        let eIndex = enable.selectedIndex;
        if(eIndex === 0){
            alert("please select enable info");
            return;
        }

        let authority_id = authority.options[aIndex].getAttribute("code");
        let is_enable = enable.options[eIndex].getAttribute("code");

        const data = {user_req_cd:req_num, authority_id:authority_id, is_enable:is_enable};

        axios.post("/setReqUsertoUserInfo", data).then(res => {
            if(res.status !== 200){
                alert("internet error");
                return;
            }

            if(res.data.isSuccess){
                alert("success");
                let arr = updateData.filter(x => x.user_req_cd !== req_num);
                setUpdateData(arr);
            }else{
                SignOut(res.data.errorMessage);
                return;
            }
        })
    }

    const onClickDeleteHandler = (req_num) => {
        let isConfirm = window.confirm("Do you want to delete request?");
        if(!isConfirm)
            return;

        let data = {user_req_cd:req_num};

        axios.post("/deleteReqUserInfo", data).then(res => {
            if(res.status !== 200){
                alert("internet error");
                return;
            }

            if(res.data.isSuccess){
                alert("success");
                let arr = updateData.filter(x => x.user_req_cd !== req_num);
                setUpdateData(arr);
            }else{
                SignOut(res.data.errorMessage);
                return;
            }
        })
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
    }, [])
    return(
        <>
        <UserFormWrapper>
            <FormWrapper className="modify">
                <label>사용자 ID</label>
                <input type="text" defaultValue={data.user_req_id} disabled/>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>사용자 이름</label>
                <input type="text" defaultValue={data.user_req_name} disabled/>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>이메일</label>
                <input type="text" defaultValue={data.email} disabled/>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>관리자 등급</label>
                <Select className="authority">
                    <option>선택하세요.</option>
                    {
                        authorityInfo.map((val) => {
                            return(
                                <option key={val.authority_id} code={val.authority_id}>{val.authority_name}</option>
                            )
                        })
                    }
                </Select>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>사용 여부</label>
                <Select className="enable">
                    <option>선택하세요.</option>
                    <option code={1}>가능</option>
                    <option code={0}>불가능</option>
                </Select>
            </FormWrapper>
            <FormWrapper className="modify">
                <label>비밀번호</label>
                <input type="password" defaultValue="securedPassword" disabled/>
            </FormWrapper>
        </UserFormWrapper>
        <UserConfirmWrapper>
            <Button className="confirm" onClick={() => onClickRegisterHandler(data.user_req_cd)}>등록</Button>
            <Button className="delete" onClick={() => onClickDeleteHandler(data.user_req_cd)}>삭제</Button>
        </UserConfirmWrapper>
        </>
    )
}

export default UserRequestContent;