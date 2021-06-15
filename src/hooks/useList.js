import {useState} from 'react';
import {useLocalStorage} from './useLocalStorage';
import { useEditHeaders } from './useEditHeaders';
export const useList=(initialValue)=>{
    const [localStorage, setLocalStorage] = useLocalStorage('team-builder-app',[])
    const [members, setMembers] = useState(localStorage);
    const [editIndex, setEditIndex] = useState(null);
    const [template, setTemplate] = useState(initialValue);
    const [
        isEditing,
        editedHeaders,
        startEditing,
        cancelEditing,
        insertHeader,
        deleteHeader,
        editHeader,
        saveHeaders
    ] = useEditHeaders();
    const headers = ()=>{
        return Object.keys(template);
    }
    const rekeyObject=(oldObj,newHeaders)=>{
        return Object.keys(oldObj).reduce((newObj,oldKey,i)=>{
            const newKey = newHeaders[i];
            newObj[newKey] = oldObj[oldKey];
            return newObj;
        },{});
    };
    const updateColumns=(newHeaders)=>{
        const newMembers = members.map((member)=>rekeyObject(member,newHeaders));
        const newTemplate = rekeyObject(template,newHeaders);
        setMembers(newMembers);
        setTemplate(newTemplate);
    };
    const insertColumn=(index,fieldName,defaultValue)=>{
        const newHeaders = headers().splice(index,0,fieldName);
        const newTemplate = rekeyObject(template,newHeaders);
        newTemplate[fieldName] = defaultValue;
        const newMembers = members.map((member)=>{
            const newMember = rekeyObject(member,newHeaders);
            newMember[fieldName] = defaultValue;
            return newMember;
        });
        setTemplate(newTemplate);
        setMembers(newMembers);
    };
    const deleteColumn=(index)=>{
        const deletedField = headers()[index];
        const newTemplate = {...template};
        delete newTemplate[deletedField];
        const newMembers = members.map((member)=>{
            const newMember = {...member};
            delete newMember[deletedField];
            return newMembers;
        });
        setTemplate(newTemplate);
        setMembers(newMembers);
    };
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
    const editHeadersUtils = {
        // headers
        isEditing,
        editedHeaders,
        startEditing,
        cancelEditing,
        insertHeader,
        deleteHeader,
        editHeader,
        saveHeaders
    };
    return[
        members,
        editIndex,
        setEditIndex,
        headers,
        addNewRow,
        deleteRow,
        updateRow,
        editHeadersUtils
    ];
} 