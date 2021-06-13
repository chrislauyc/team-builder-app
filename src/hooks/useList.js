import {useState} from 'react';

export const useList=(initialValue)=>{
    const [members, setMembers] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [template, setTemplate] = useState(initialValue)
    const headers = ()=>{
        return Object.keys(template);
    }
    const addNewRow = () => {
        setEditIndex(members.length);
        setMembers([...members,template]);
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
    return[members,editIndex,setEditIndex,headers,addNewRow,deleteRow,updateRow];
} 