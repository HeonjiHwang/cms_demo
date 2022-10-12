import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import axios from 'axios';
import Rows from '../../components/Rows';
import moment from 'moment';
import { SignOut } from '../../util/SessionUtil';

const UserAccessList = () => {
    const [rows, setRows] = useState([]);
    const path = [{title:'사용자 관리', path:'/usermanagement'}, {title:'사용자 접속정보'}];
    const columns = [
        {id:1, field:"user_id", title:"사용자 ID", align:"center"},
        {id:2, field:"authority_name", title:"관리자 등급", align:"center"},
        {id:3, field:"menu", title:"메뉴", align:"center"},
        {id:4, field:"action", title:"액션", align:"center"},
        {id:5, field:"is_success", title:"성공여부", align:"center"},
        {id:6, field:"access_ip", title:"접근 IP", align:"center"},
        {id:7, field:"access_time", title:"접근 시간", align:"center"}
    ];

    useEffect(() => {
        async function getUserAccessInfo(){
            let data = await axios.get('/getUserAccessInfo');

            if(data.status !== 200)
                return;
            
            let result = data.data;

            if(!result.isSuccess){
                SignOut(result.errorMessage);
                return;
            }

            let _action = {S:"조회", D:"삭제", U:"수정", I:"추가"};
            result.data.forEach((val) => {
                val.is_success = val.is_success === 0 ? '실패' : '성공';
                val.action = _action[val.action_type];
                val.access_time = moment(new Date(val.access_time)).format("YYYY-MM-DD H:mm:ss");
                val.user_id = !val.user_id ? '-' : val.user_id;
                val.authority_name = !val.authority_name ? '-' : val.authority_name;
            })
            setRows(result.data);
        }

        getUserAccessInfo();
    }, []);

    return(
        <div className="content-wrapper">
            <BreadCrumb current="사용자 접속정보" path={path}/>
            <Paper style={{boxShadow:"0px 0px 5px 0px rgba(0,0,0,0.2)", marginTop:"40px", overflow:"hidden", position:"relative"}}>
                <TableContainer sx={{maxHeight:745}}>
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((val) => {
                                        return(
                                            <TableCell key={val.id} align={val.align} style={{fontWeight:'bold'}}>{val.title}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Rows data={rows} columns={columns} isCollapse={false}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default UserAccessList;