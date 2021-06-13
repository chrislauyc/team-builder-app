import React, {useState} from 'react';
import {
    TableCell, Button, TextField
} from '@material-ui/core';
function Member(props){
    const {data,editIndex,setEditIndex,index,updateRow,deleteRow} = props;
    const [member,setMember] = useState(data);
    const isEditing = editIndex === index;
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
                    <TextField id='standard-basic' label={label} value={member[label]} onChange={
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
                <div>
                    <Button onClick={endEdit}>Save</Button>
                    <Button onClick={deleteMember}>Delete</Button>
                </div>
            );
        }
        else{
            return <Button onClick={startEdit}>Edit</Button>
        }
    }
    const headers = Object.keys(member);
    return(
        <>
            <TableCell>{index}</TableCell>
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