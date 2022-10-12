import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import UserRequestContent from './Components/UserRequestContent';
import Rows from '../../components/Rows';
import BreadCrumb from '../../components/BreadCrumb';
import axios from 'axios';
import moment from 'moment';

const UserRequestInfo = () => {
    const [reqUserInfo, setReqUserInfo] = useState([]);
    const path = [{title:'사용자 관리', path:'/usermanagement'}, {title:'사용자 요청/등록'}];
    const columns = [
        {id:1, field:"", title:"등록/삭제", align:"center"},
        {id:2, field:"user_req_name", title:"이름", align:"center"},
        {id:3, field:"user_req_id", title:"아이디", align:"center"},
        {id:4, field:"email", title:"이메일", align:"center"},
        {id:5, field:"create_time", title:"등록일", align:"center"}
    ];

    useEffect(() => {
        async function getReqUserInfo(){
            let data = await axios.get('/getReqUserInfo');

            if(data.status !== 200)
                return;
            
            let result = data.data;

            if(!result.isSuccess){
                alert(result.errorMessage || 'Server Error');
                return;
            }

            result.data.forEach((val) => {
                val.create_time = moment(new Date(val.create_time)).format("YYYY-MM-DD H:mm:ss");
            })
            setReqUserInfo(result.data);
        }
        getReqUserInfo();
    }, []);

    return(
        <div className="content-wrapper">
            <BreadCrumb current="사용자 요청/등록" path={path}/>
            <Paper style={{boxShadow:"0px 0px 5px 0px rgba(0,0,0,0.2)", marginTop:"40px", overflow:"hidden", position:"relative"}}>
                <TableContainer sx={{maxHeight:745}}>
                    <Table aria-label="collapsible sticky table">
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((val) => {
                                        return(
                                            <TableCell key={val.id} align={val.align}>{val.title}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Rows title="사용자 요청 정보 수정" data={reqUserInfo} columns={columns} isCollapse={true} CollapseContent={UserRequestContent}
                            updateData={reqUserInfo} setUpdateData={setReqUserInfo}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default UserRequestInfo;