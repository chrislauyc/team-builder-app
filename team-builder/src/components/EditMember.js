import React, {useState} from 'react';
import {TextField,Button,Container} from '@material-ui/core';

// import uuid from 'react-uuid';
function EditMember(props){
    const {addMember, getDefaultMember} = props;
    const [member, setMember] = useState(getDefaultMember());
    const handleSubmit =(e)=>{
        e.preventDefault();
        addMember(member);
        setMember(getDefaultMember);
    };
    const attrs = Object.keys(member); 
    return(
    <Container>
        <form onSubmit={handleSubmit}>
            {
                // for each attr of member, make a new input
                attrs.map((attr,i)=>(
                    <TextField key={i} id='standard-basic' label={attr} value={member[attr]} onChange={(e)=>setMember({...member,[attr]:e.target.value})}></TextField>
                ))
            }
            <Button type='submit'>Submit</Button>
        </form>
    </Container>
    );
}
export default EditMember;
