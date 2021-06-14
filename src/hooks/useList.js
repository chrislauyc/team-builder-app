import {useState} from 'react';
import {useLocalStorage} from './useLocalStorage';
export const useList=(initialValue)=>{
    const [localStorage, setLocalStorage] = useLocalStorage('team-builder-app',[])
    const [members, setMembers] = useState(localStorage);
    const [editIndex, setEditIndex] = useState(null);
    const [template, setTemplate] = useState(initialValue);
    const headers = ()=>{
        return Object.keys(template);
    }
    const addNewRow = () => {
        setEditIndex(members.length);
        setMembers([...members,template]);
    };
    const deleteRow = (index) => {
        setEditIndex(null);
        const newMembers = members.filter((member,i)=>i!==index);
        setLocalStorage(newMembers)
        setMembers(newMembers);
    };
    const updateRow = (newMember,index) => {
        setEditIndex(null);
        const newMembers = members.map((member,i)=>{
            if(index===i){
                return newMember;
            }
            else{
                return member;
            }
        });
        setLocalStorage(newMembers);
        return setMembers(newMembers);
    };
    return[members,editIndex,setEditIndex,headers,addNewRow,deleteRow,updateRow];
} 