import React, {useState} from 'react';
import {
    Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, TextField
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
    const [
        members,
        editIndex,
        setEditIndex,
        headers,
        addNewRow,
        deleteRow,
        updateRow,
        isEditing,
        startEditing,
        cancelEditing,
        saveHeaders
    ] = useList(initialValue);
    const [insertButtons, setInsertButtons] = useState(()=>headers().map((h)=>false));
    const [deleteButtons, setDeleteButtons] = useState(()=>headers().map((h)=>false));
    const [fieldNames, setFieldNames] = useState(headers());
    const toggleButton=(index,arr,setArr)=>{
        const newArr = [...arr];
        newArr[index] = !newArr[index];
        setArr(newArr);
    };
    const handleInputChange=(e)=>{
        const {name, value} = e.target;
        const newArr = [...fieldNames];
        newArr[parseInt(name)] = value;
        setFieldNames(newArr);
    };
    const makeButton = (isEditing) =>{
        if(isEditing){
            return(
                <StyledDiv>
                    <Button onClick={()=>saveHeaders(insertButtons,deleteButtons,fieldNames)}>Save</Button>
                    <Button onClick={cancelEditing}>Cancel</Button>
                </StyledDiv>
            );
        }
        else{
            return <Button onClick={startEditing}>Edit Columns</Button>
        }
    }
    const makeHeader = ()=>{
        return(
            <TableHead>
                <TableRow>
                    {
                        headers().map((h,i)=>(
                            <StyledCell key={i}>
                                    {
                                        isEditing?
                                        (
                                            <Grid container direction='column'>
                                                <Grid item>
                                                    <TextField name={`${i}`} label={'Field Name'} value={fieldNames[i]} onChange={handleInputChange}></TextField>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant={insertButtons[i]?'outlined':'contained'} color='primary' onClick={()=>toggleButton(i,insertButtons,setInsertButtons)}>{insertButtons[i]?'Undo':'Insert'}</Button>
                                                    <Button variant={deleteButtons[i]?'outlined':'contained'} color='secondary' onClick={()=>toggleButton(i,deleteButtons,setDeleteButtons)}>{deleteButtons[i]?'Undo':'Delete'}</Button>
                                                </Grid>
                                            </Grid>
                                        ):
                                        h
                                    }
                            </StyledCell>
                        ))
                    }
                    <TableCell>
                        {makeButton(isEditing)}
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    };
    return(
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                {makeHeader()}
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
const StyledDiv=styled.div`
    display:flex;
    flex-direction:column;
`;