import {useState} from 'react';
import {useLocalStorage} from './useLocalStorage';
export const useList=(initialValue,initialTeam)=>{
    const [localStorage, setLocalStorage] = useLocalStorage('team-builder-app',initialTeam)
    const [localStorageTemplate, setLocalStorageTemplate] = useLocalStorage('team-builder-app-template',initialValue);
    const [members, setMembers] = useState(localStorage);
        // ()=>{
            // only take attributes present in initialValue 
            // return localStorage.map((item)=>Object.keys(initialValue).reduce((acc,key,i)=>{
            //     acc[key] = item[key];
            //     return acc;
            // },{}));

        // }
    
    const [table,setTable] = useState(()=>{
        return localStorage.map((item)=>Object.keys(initialValue).map((key)=>item[key]));
    });
    const [editIndex, setEditIndex] = useState(null);
    const [template, setTemplate] = useState(localStorageTemplate);
    const [isEditing,setIsEditing] = useState(false);
    const startEditing=()=>{
        setIsEditing(true);
        setTable(members.map((member)=>Object.keys(member).map((key)=>member[key])));
    };
    const cancelEditing=()=>{
        setIsEditing(false);
    };
    const headers = ()=>{
        return Object.keys(template);
    }
    const emptyColumn=(table)=>{
        return table.map(row=>'');
    };
    const getColumn=(table,index)=>{
        return table.map(row=>row[index]);
    };
    const appendColumn=(table,col)=>{
        if(table.length===0){
            col.forEach((element)=>{
                table.push([element]);
            });
        }
        else{
            table.forEach((row,i)=>{
                row.push(col[i]);
            });
        }
    };
    const saveHeaders=(insertArr,deleteArr,fieldNames)=>{
        const newHeaders= [];
        const oldTable = table;
        const oldHeaders = headers();
        const newTable = [];
        fieldNames.forEach((name,i)=>{
            if(insertArr[i]){
                // if inserting, use fieldName as the new column name
                appendColumn(newTable,emptyColumn(oldTable)); //need to reimplement empty column
                appendColumn(newTable,getColumn(oldTable,i));
                newHeaders.push(name);
                newHeaders.push(oldHeaders[i]);
            }
            else if(deleteArr[i]){
                // do nothing
            }
            else{
                appendColumn(newTable,getColumn(oldTable,i));
                newHeaders.push(name);
            }
        });
        const newTemplate = newHeaders.reduce((acc,key)=>{
            acc[key] = '';
            return acc;
        },{});
        const newMembers = newTable.map(row=>row.reduce((acc,value,i)=>{
            acc[newHeaders[i]] = value;
            return acc;
        },{})); 
        setMembers(newMembers);
        setTemplate(newTemplate);
        setLocalStorage(newMembers);
        setLocalStorageTemplate(newTemplate);
        setIsEditing(false);
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
    return[
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
    ];
} 
// const updateColumns=(newHeaders)=>{
//     const newMembers = members.map((member)=>rekeyObject(member,newHeaders));
//     const newTemplate = rekeyObject(template,newHeaders);
//     setMembers(newMembers);
//     setTemplate(newTemplate);
// };
// const rekeyObject=(oldObj,newHeaders)=>{
//     return Object.keys(oldObj).reduce((newObj,oldKey,i)=>{
//         const newKey = newHeaders[i];
//         newObj[newKey] = oldObj[oldKey];
//         return newObj;
//     },{});
// };
// const insertColumn=(index,fieldName,defaultValue)=>{
//     const newHeaders = headers().splice(index,0,fieldName);
//     const newTemplate = rekeyObject(template,newHeaders);
//     newTemplate[fieldName] = defaultValue;
//     const newMembers = members.map((member)=>{
//         const newMember = rekeyObject(member,newHeaders);
//         newMember[fieldName] = defaultValue;
//         return newMember;
//     });
//     setTemplate(newTemplate);
//     setMembers(newMembers);
// };
// const deleteColumn=(index)=>{
//     const deletedField = headers()[index];
//     const newTemplate = {...template};
//     delete newTemplate[deletedField];
//     const newMembers = members.map((member)=>{
//         const newMember = {...member};
//         delete newMember[deletedField];
//         return newMembers;
//     });
//     setTemplate(newTemplate);
//     setMembers(newMembers);
// };