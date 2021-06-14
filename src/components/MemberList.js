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
    ] = useList(initialValue);
    const [isEditingHeader,setIsEditingHeader] = useState(false);
    const [editedHeader, setEditedHeader] = useState(headers());
    const [toInsert, setToInsert] = useState([]);
    const [toDelete, setToDelete] = useState([]);
    const saveHeader = ()=>{
    }
    const cancelEditing=()=>{
        setIsEditingHeader(false);
        setEditedHeader(headers());
        setToInsert([]);
        setToDelete([]);
    };
    const makeButton = (isEditing) =>{
        if(isEditing){
            return(
                <StyledDiv>
                    <Button onClick={saveHeader}>Save</Button>
                    <Button onClick={cancelEditing}>Cancel</Button>
                </StyledDiv>
            );
        }
        else{
            return <Button onClick={()=>setIsEditingHeader(true)}>Edit Columns</Button>
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
                                        isEditingHeader?
                                        (
                                            <Grid container direction='column'>
                                                <Grid item>
                                                    <TextField id='standard-basic' label={'Field Name'} value={h}></TextField>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant='contained' color='primary'>Insert</Button>
                                                    <Button variant='contained' color='secondary'>Delete</Button>
                                                </Grid>
                                            </Grid>
                                        ):
                                        h
                                    }
                            </StyledCell>
                        ))
                    }
                    <TableCell>
                        {makeButton(isEditingHeader)}
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