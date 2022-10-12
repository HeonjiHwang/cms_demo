import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { useState, useEffect } from 'react';

import BreadCrumb from '../../components/BreadCrumb';
import axios from 'axios';
import Rows from '../../components/Rows';
import UserManagementContent from './Components/UserManagementContent';
import moment from 'moment';
import uuid from 'react-uuid';

const UserManagement = () => {
    const [usersInfo, setUsersInfo] = useState([]);
    const path = [{title:'사용자 관리', path:'/usermanagement'}, {title:'사용자 정보'}];
    
    const columns = [
        {id:1, field:"", title:"수정/삭제", align:"center"},
        {id:2, field:"is_online", title:"온라인", align:"center"},
        {id:3, field:"user_id", title:"아이디", align:"center"},
        {id:4, field:"authority_name", title:"관리자 등급", align:"center"},
        {id:5, field:"email", title:"이메일", align:"center"},
        {id:5, field:"isEnable", title:"사용여부", align:"center"},
        {id:5, field:"create_time", title:"가입일", align:"center"},
        {id:5, field:"last_login_time", title:"마지막 로그인 시간", align:"center"},
        {id:5, field:"last_login_ip", title:"마지막 로그인 아이피", align:"center"},
    ];

    useEffect(() => {
        async function getUsersInfo(){
            let data = await axios.get('/getUsersInfo');

            if(data.status !== 200)
                return;
            
            let result = data.data;

            if(!result.isSuccess){
                alert("데이터가 존재하지 않습니다.");
                return;
            }

            result.data.forEach((val) => {
                val.create_time = moment(new Date(val.create_time)).format("YYYY-MM-DD H:mm:ss");
                val.last_login_time = moment(new Date(val.last_login_time)).format("YYYY-MM-DD H:mm:ss");
            })
            setUsersInfo(result.data);
        }
        getUsersInfo();
    }, []);

    return(
        <div className="content-wrapper">
        <BreadCrumb current="사용자 정보" path={path}/>
        <Paper style={{boxShadow:"0px 0px 5px 0px rgba(0,0,0,0.2)", marginTop:"40px", overflow:"hidden", position:"relative"}}>
            <TableContainer sx={{maxHeight:745}}>
                <Table stickyHeader aria-label="collapsible sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((val, idx) => {
                                    return(
                                        <TableCell key={uuid()} align={val.align}>{val.title}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Rows title="사용자 정보 수정" data={usersInfo} columns={columns} isCollapse={true} CollapseContent={UserManagementContent}
                        updateData={usersInfo} setUpdateData={setUsersInfo}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        </div>
    )
}

export default UserManagement;