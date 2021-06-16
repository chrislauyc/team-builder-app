import React from 'react';
import {
    Button,
    TextField,
    Grid,
    TableHead,
    TableRow,
    TableCell
} from '@material-ui/core';
import styled from 'styled-components';
const ListHeaders=(props)=>{
    const {
        headers,
        isEditing,
        toggleButton,
        insertButtons,
        setInsertButtons,
        deleteButtons,
        setDeleteButtons,
        handleInputChange,
        fieldNames,
        handleSave,
        cancelEditing,
        handleStartEditing
    } = props;
    const makeHeader=(i,fieldName)=>{
        return(
            <StyledCell key={i}>
            {
                isEditing?
                (
                    <Grid container direction='column'>
                        <Grid item>
                            <TextField size='small' name={`${i}`} label={'Field Name'} value={fieldNames[i]} onChange={handleInputChange}></TextField>
                        </Grid>
                        <Grid item>
                            <StyledButton size='small' variant={insertButtons[i]?'outlined':'contained'} color='primary' onClick={()=>toggleButton(i,insertButtons,setInsertButtons)}>{insertButtons[i]?'Undo':'Insert'}</StyledButton>
                            <StyledButton size='small' variant={deleteButtons[i]?'outlined':'contained'} color='secondary' onClick={()=>toggleButton(i,deleteButtons,setDeleteButtons)}>{deleteButtons[i]?'Undo':'Delete'}</StyledButton>
                            <StyledButton size='small' variant={deleteButtons[i]?'outlined':'contained'} color='inherit'>{deleteButtons[i]?'Undo':'Edit'}</StyledButton>
                        </Grid>
                    </Grid>
                ):
                fieldName
            }
            </StyledCell>
        );
    }
    const makeButton = (isEditing) =>{
        if(isEditing){
            return(
                <StyledDiv>
                    <StyledButton color='primary' variant='contained' size='small' onClick={handleSave}>Save</StyledButton>
                    <StyledButton variant='contained' size='small' onClick={cancelEditing}>Cancel</StyledButton>
                </StyledDiv>
            );
        }
        else{
            return <StyledButton size='small' variant='contained' onClick={handleStartEditing}>Edit Columns</StyledButton>
        }
    }
    const makeHeaders = ()=>{
        return(
            <TableHead>
                <TableRow>
                    {
                        headers().map((fieldName,i)=>makeHeader(i,fieldName))
                    }
                    <TableCell>
                        {makeButton(isEditing)}
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    };
    // render
    return(
        <>
            {makeHeaders()}
        </>
    );
};
export default ListHeaders;
const StyledButton=styled(Button)`
    font-size: 10px;
    max-width: 20px;
`;
const StyledCell = styled(TableCell)`
    text-transform:capitalize;
    font-weight:bold;
`;
const StyledDiv=styled.div`
    display:flex;
    flex-direction:column;
`;