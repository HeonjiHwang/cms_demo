import { FormWrapper, Button, Select } from "../../style/CommonStyle";
import { UserConfirmWrapper } from "../../style/StyledComponent";
import { useEffect, useState } from "react";
import uuid from 'react-uuid'
import BreadCrumb from "../../components/BreadCrumb";
import styled from 'styled-components';
import axios from 'axios';
import { SignOut } from "../../util/SessionUtil";

const AuthorityWrapper = styled.div`
    width:100%;
    height:auto;
    padding:20px;
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    grid-gap:20px;
    border-radius:10px;
    box-shadow:0px 0px 5px 0px rgba(0,0,0,0.2);

    div{
        &.box{
            grid-column-start: 1;
            grid-column-end: 3;
            margin:0px;
            button{
                font-size:15px;
            }
        }
    }
`;

const AuthorityManagement = () => {
    const [curAuthority, setCurAuthority] = useState({});
    const [authorityInfo, setAuthorityInfo] = useState([]);
    const path = [{title:'권한 관리', path:'/menuauthority'}, {title:'권한 관리'}];

    const handleOnChangeAuthority = (evt) => {
        let obj = authorityInfo.filter(x => x.authority_id === parseInt(evt.target.value));
        
        if(obj.length > 0)
            setCurAuthority(obj[0]);
        else{
            setCurAuthority({authority_id:0, authority_name:"", authority_desc:""});
        }
    }

    const getUpdateAuthority = async() => {            
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
        if(result.data.length > 0)
            setCurAuthority(result.data[0]);
    }

    const validation = () => {
        let authority_name = document.querySelector(".authority_name");
        let authority_desc = document.querySelector(".authority_desc");

        if(authority_name.value === "" ){
            alert("check authority name field");
            authority_name.focus();
            return false;
        }
        if(authority_desc.value === ""){
            alert("check authority description field");
            authority_desc.focus();
            return false;
        }
        return true;
    }
    const handleOnClickAdd = () => {
        let isConfirm = window.confirm("Do you want to add Authority Info?");
        if(!isConfirm)
            return;
        
        let authority_name = document.querySelector(".authority_name");
        let authority_desc = document.querySelector(".authority_desc");

        let result = validation();
        if(!result)
            return;

        let data = {authority_name:authority_name.value, authority_desc:authority_desc.value};
        axios.post("/setAuthorityInfo", data).then(res => {
            if(res.status !== 200){
                alert("Internet Error");
                return;
            }

            if(!res.data.isSuccess){
                SignOut(res.data.errorMessage);
                return;
            }

            getUpdateAuthority().then(() => alert("Saved!"));
        })
    }

    const handleOnClickModify = () => {
        let isConfirm = window.confirm("Do you want to modify authority information?");
        if(!isConfirm)
            return;

        let authority_name = document.querySelector(".authority_name");
        let authority_desc = document.querySelector(".authority_desc");
        let authority_id = document.querySelector(".authority_id");

        let result = validation();
        if(!result)
            return;

        let data = {authority_name:authority_name.value, authority_desc:authority_desc.value, authority_id:authority_id.value};
        axios.post("updateAuthorityInfo", data).then(res => {
            if(res.status !== 200){
                alert("Internet Error")
                return;
            }

            if(!res.data.isSuccess){
                SignOut(res.data.errorMessage);
                return;
            }

            getUpdateAuthority().then(() => alert("Modified!"));
        })
    }

    const handleOnClickDelete = () => {
        let isConfirm = window.confirm("Do you want to delete authority information?");
        if(!isConfirm)
            return;

        let authority_id = document.querySelector(".authority_id");

        if(authority_id.value === '0'){
            alert("Please select authority name");
            return;
        }

        let data = {authority_id:authority_id.value};
        axios.post("/deleteAuthorityInfo", data).then(res => {
            if(res.status !== 200){
                alert("Internet Error");
                return;
            }

            if(!res.data.isSuccess){
                SignOut(res.data.errorMessage);
                return;
            }

            getUpdateAuthority().then(() => alert("Deleted!"));
        })
    }

    useEffect(() => {
        getUpdateAuthority();
    }, [])

    return (
        <div className="content-wrapper">
            <BreadCrumb current="권한 관리" path={path}/>
            <AuthorityWrapper>
                <FormWrapper className="modify">
                    <label>권한 등급 이름</label>
                    <Select key={curAuthority.authority_id} defaultValue={curAuthority.authority_id} className="authority_id" onChange={handleOnChangeAuthority}>
                        <option value={0}>권한 추가하기</option>
                        {
                            authorityInfo.map((val) => {
                                return(
                                    <option key={uuid()} value={val.authority_id}>{val.authority_name}</option>
                                )
                            })
                        }
                    </Select>
                </FormWrapper>
                <FormWrapper className="modify">
                    <input type="text" className="authority_name" defaultValue={curAuthority.authority_name} key={curAuthority.authority_name}/>
                </FormWrapper>
                <FormWrapper className="modify box">
                    <label style={{width:'135px'}}>권한 등급 설명</label>
                    <textarea name="authority_desc" type="text" rows="5" className="authority_desc" defaultValue={curAuthority.authority_desc} key={curAuthority.authority_name}>
                    </textarea>
                </FormWrapper>
                <UserConfirmWrapper className="box">
                    {
                        !!curAuthority.authority_name ? 
                        <Button className="modify" onClick={handleOnClickModify}>수정</Button> : 
                        <Button className="confirm" onClick={handleOnClickAdd}>추가</Button>
                    }
                    {
                        !!curAuthority.authority_name && <Button className="delete" onClick={handleOnClickDelete}>삭제</Button>
                    }
                </UserConfirmWrapper>
            </AuthorityWrapper>
        </div>
    )
}

export default AuthorityManagement;