import React, {useState,useEffect} from 'react';
import {
    TableCell, Button, TextField
} from '@material-ui/core';
import styled from 'styled-components';
function Member(props){
    const {data,editIndex,setEditIndex,index,updateRow,deleteRow,headers} = props;
    const [member,setMember] = useState(data);
    const isEditing = editIndex === index;
    useEffect(()=>{
        setMember(data);
    },[data]);
    const startEdit = () =>{
        setMember(data);
        setEditIndex(index);
    };
    const endEdit = () =>{
        updateRow(member,index);
        setEditIndex(null);
    };
    const deleteMember = () =>{
        deleteRow(index);
        setEditIndex(null);
    };
    const updateMember = (attrs) =>{
        setMember({...member,...attrs});
    };
    const makeCell = (label,value,isEditing,index) =>{
        if(isEditing){
            return(
                <TableCell key={index}>
                    <TextField size='small' id='standard-basic' label={label} value={member[label]} onChange={
                        (e)=>{updateMember({[label]:e.target.value})}
                    }></TextField>
                </TableCell>
            );
        }
        else{
            return(
                <TableCell key={index}>
                    {value}
                </TableCell>
            );
        }
    }
    const makeButton = (isEditing) =>{
        if(isEditing){
            return(
                <StyledDiv>
                    <Button color='primary' size='small' variant='contained' onClick={endEdit}>Save</Button>
                    <Button color='secondary' size='small' variant='contained' onClick={deleteMember}>Delete</Button>
                </StyledDiv>
            );
        }
        else{
            return <Button size='small' variant='contained' onClick={startEdit}>Edit</Button>
        }
    }
    return(
        <>
            {
                headers.map((h,i)=>makeCell(h,member[h],isEditing,i))
            }
            <TableCell>
                {makeButton(isEditing)}
            </TableCell>
        </>
    );
}
export default Member;
const StyledDiv=styled.div`
    display:flex;
    flex-direction:column;
`;