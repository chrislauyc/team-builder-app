import React, {useState} from 'react';
import {
    Grid,
    TextField,
} from '@material-ui/core'
const HeaderControls=(props)=>{
    const{
        i,
        toggleButton,
        insertButtons,
        setInsertButtons,
        deleteButtons,
        setDeleteButtons,
        handleInputChange,
        fieldNames,
        StyledButton
    } = props;
    const [isEditingFieldName, setIsEditingFieldName] = useState(false);
    const resetButtons=()=>{
        setIsEditingFieldName(false);
        setInsertButtons(insertButtons.map((isOn,index)=>index===i?false:isOn));
        setDeleteButtons(deleteButtons.map((isOn,index)=>index===i?false:isOn));
    }
    const toggleEditFieldName =()=>{
        resetButtons();
        setIsEditingFieldName(!isEditingFieldName);
    };
    const toggleInsertField=()=>{
        resetButtons();
        toggleButton(i,insertButtons,setInsertButtons);
    };
    const toggleDeleteField=()=>{
        resetButtons();
        toggleButton(i,deleteButtons,setDeleteButtons);
    };
    const makeHeaderControls=(i)=>{
        return(
            <Grid container direction='row'>
            {
                isEditingFieldName?
                <Grid item>
                    <Grid container direction='row'>
                        <Grid item>
                            <TextField size='small' name={`${i}`} label={'Field Name'} value={fieldNames[i]} onChange={handleInputChange}></TextField>
                        </Grid>
                        <Grid item>
                            <StyledButton size='small' variant='contained' color='inherit' onClick={toggleEditFieldName}>cancel</StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
                :
                <Grid item>
                    <StyledButton size='small' variant={insertButtons[i]?'outlined':'contained'} color='primary' onClick={toggleInsertField}>{insertButtons[i]?'Undo':'Insert'}</StyledButton>
                    <StyledButton size='small' variant={deleteButtons[i]?'outlined':'contained'} color='secondary' onClick={toggleDeleteField}>{deleteButtons[i]?'Undo':'Delete'}</StyledButton>
                    <StyledButton size='small' variant='contained' color='inherit' onClick={toggleEditFieldName}>edit</StyledButton>
                </Grid>
            }
            </Grid>
        );
    }
    return(
        <>
            {makeHeaderControls(i)}
        </>
    );
};  
export default HeaderControls;