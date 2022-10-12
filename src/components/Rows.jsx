import { useState } from "react";
import { Collapse, TableCell, TableRow, IconButton } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown, Power } from '@mui/icons-material'
import { CollapseTitle, CollapseWrppaer } from "../style/StyledComponent";
import { Icon } from '../style/CommonStyle';
import uuid from 'react-uuid';

const CollapseComponent = ({open, setOpen, title, data, length, CollapseContent, updateData, setUpdateData}) => {
    return (
        <TableRow>
            <TableCell style={{padding:0}} colSpan={length}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <CollapseWrppaer>
                        <CollapseTitle>
                            <h5>{title}</h5>
                            <button onClick={() => setOpen(!open)}>
                                <Icon src="Cross" width={20} height={20}/>
                            </button>
                        </CollapseTitle>
                        <CollapseContent data={data} updateData={updateData} setUpdateData={setUpdateData} setOpen={setOpen}/>
                    </CollapseWrppaer>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

const Row = ({title, ObjectKeys, data, isCollapse, CollapseContent, updateData, setUpdateData, length}) => {
    const [open, setOpen] = useState(false);

    return(
        <>
            <TableRow key={uuid()} sx={{ '& > *': { borderBottom: 'unset' }}}>
            {
                isCollapse && 
                <TableCell key={uuid()} align="center">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>{open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}</IconButton>
                </TableCell>
            }
            {
                ObjectKeys.map((key) => {
                    const color = data[key] === 1 ? 'primary' : '';
                    return(
                        key === "is_online" ? 
                        <TableCell key={uuid()} align="center">
                            <IconButton aria-label="online" size="small">
                                <Power color={color}/>
                            </IconButton>
                        </TableCell> : 
                        <TableCell key={uuid()} align="center">{data[key]}</TableCell>
                    )
                })
            }
            </TableRow>
            {
                isCollapse && 
                <CollapseComponent key={uuid()} open={open} setOpen={setOpen} title={title} data={data} length={length} 
                CollapseContent={CollapseContent} updateData={updateData} setUpdateData={setUpdateData}/>
            }
        </>
    )
}

const Rows = ({title, data, columns, isCollapse, CollapseContent, updateData, setUpdateData}) => {
    const ObjectKeys = columns.map((val) => val.field);
    if(isCollapse) ObjectKeys.splice(0,1);
    
    return (
        <>
        {
            data.map((val) => {
                return(
                    <Row title={title} key={uuid()} data={val} ObjectKeys={ObjectKeys} isCollapse={isCollapse} CollapseContent={CollapseContent} 
                    updateData={updateData} setUpdateData={setUpdateData} length={columns.length}/>
                )
            })
        }
        </>
    )
}

export default Rows;