import React, {useState} from 'react';
import uuid from 'react-uuid';
import {
    Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@material-ui/core';
import Member from './Member';
import styled from 'styled-components';
// import {makeStyles} from '@material-ui/core/styles';
const getDefaultMember = () =>{
    return{
        ['first name']:'',
        ['last name']:'',
        email:'',
        role:'',
        hobby:'',
        gender:''
    };
  };
function MemberList(){
    const [members, setMembers] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const headers = Object.keys(getDefaultMember());
    const addNewRow = () => {
        setEditIndex(members.length);
        setMembers([...members,getDefaultMember()]);
    };
    const deleteRow = (index) => {
        setEditIndex(null);
        setMembers(members.filter((member,i)=>i!==index));
    };
    const updateRow = (newMember,index) => {
        setEditIndex(null);
        return setMembers(members.map((member,i)=>{
            if(index===i){
                return newMember;
            }
            else{
                return member;
            }
        }));
    };
    return(
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <StyledCell key={uuid()}>Index</StyledCell>
                        {
                            headers.map((h)=><StyledCell key={uuid()}>{h}</StyledCell>)
                        }
                        <StyledCell key={uuid()}></StyledCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        members.map((member,i)=>(
                        <TableRow key={uuid()}>
                            <Member data={member} editIndex={editIndex} setEditIndex={setEditIndex} updateRow={updateRow} deleteRow={deleteRow} index={i}></Member>
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