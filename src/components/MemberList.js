import React from 'react';
import {
    Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@material-ui/core';
import Member from './Member';
import {useList} from '../hooks/useList';
import styled from 'styled-components';
const initialValue = {
    'first name':'',
    'last name':'',
    email:'',
    role:'',
    hobby:''
  };
function MemberList(){
    const [members,editIndex,setEditIndex,headers,addNewRow,deleteRow,updateRow] = useList(initialValue);
    return(
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <StyledCell>Index</StyledCell>
                        {
                            headers().map((h,i)=><StyledCell key={i}>{h}</StyledCell>)
                        }
                        <StyledCell></StyledCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        members.map((member,i)=>(
                        <TableRow key={i}>
                            <Member data={member} editIndex={editIndex} setEditIndex={setEditIndex} updateRow={updateRow} deleteRow={deleteRow} index={i} headers={headers()}></Member>
                        </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Button onClick={addNewRow}>New</Button>
        </TableContainer>
    );
}
export default MemberList;
const StyledCell = styled(TableCell)`
    text-transform:capitalize;
    font-weight:bold;
`;