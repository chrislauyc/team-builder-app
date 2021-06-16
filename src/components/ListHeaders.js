import React from 'react';
import {
    Button,
    Grid,
    TableHead,
    TableRow,
    TableCell
} from '@material-ui/core';
import styled from 'styled-components';
import HeaderControls from './HeaderControls';
const ListHeaders=(props)=>{
    const {
        headers,
        isEditing,
        handleSave,
        cancelEditing,
        handleStartEditing,
        toggleButton,
        insertButtons,
        setInsertButtons,
        deleteButtons,
        setDeleteButtons,
        handleInputChange,
        fieldNames,
    } = props;
    const makeHeader=(i,fieldName)=>{
        return(
            <StyledCell key={i}>
                <Grid container direction='column'>
                    <Grid item>
                        {fieldName}                
                    </Grid>
                    <Grid item>
                        {
                            isEditing?
                            <HeaderControls 
                                i={i}
                                toggleButton={toggleButton}
                                insertButtons={insertButtons}
                                setInsertButtons={setInsertButtons}
                                deleteButtons={deleteButtons}
                                setDeleteButtons={setDeleteButtons}
                                handleInputChange={handleInputChange}
                                fieldNames={fieldNames}
                                StyledButton={StyledButton}
                            />
                            :
                            ''
                        }
                    </Grid>
                </Grid>
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