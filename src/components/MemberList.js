import React, {useState} from 'react';
import {
    Table, TableBody, TableContainer,TableRow, Paper, Button
} from '@material-ui/core';
import Member from './Member';
import ListHeaders from './ListHeaders';
import {useList} from '../hooks/useList';
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
    const handleSave=()=>{
        saveHeaders(insertButtons,deleteButtons,fieldNames);
        setInsertButtons(headers().map((h)=>false));
        setDeleteButtons(headers().map((h)=>false));
    };
    const handleStartEditing=()=>{
        startEditing();
        setFieldNames(headers());
    };

    return(
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <ListHeaders 
                    headers={headers}
                    isEditing={isEditing}
                    toggleButton={toggleButton}
                    insertButtons={insertButtons}
                    setInsertButtons={setInsertButtons}
                    deleteButtons={deleteButtons}
                    setDeleteButtons={setDeleteButtons}
                    handleInputChange={handleInputChange}
                    fieldNames={fieldNames}
                    handleSave={handleSave}
                    cancelEditing={cancelEditing}
                    handleStartEditing={handleStartEditing}
                />
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
            <Button size='small' variant='contained' onClick={addNewRow}>New</Button>
        </TableContainer>
    );
}
export default MemberList;