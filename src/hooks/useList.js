import {useState} from 'react';
import {useLocalStorage} from './useLocalStorage';
export const useList=(initialValue)=>{
    const [localStorage, setLocalStorage] = useLocalStorage('team-builder-app',[])
    const [members, setMembers] = useState(()=>{
            // only take attributes present in initialValue 
            return localStorage.map((item)=>Object.keys(initialValue).reduce((acc,key,i)=>{
                acc[key] = item[key];
                return acc;
            },{}));
        }
    );
    const [table,setTable] = useState(()=>{
        return localStorage.map((item)=>Object.keys(initialValue).map((key)=>item[key]));
    });
    const [editIndex, setEditIndex] = useState(null);
    const [template, setTemplate] = useState(initialValue);
    const [isEditing,setIsEditing] = useState(false);
    const startEditing=()=>{
        setIsEditing(true);
    };
    const cancelEditing=()=>{
        setIsEditing(false);
    };
    const headers = ()=>{
        return Object.keys(template);
    }
    const emptyColumn=({keys,list},key)=>{
        return{
            key,
            col:list.map(row=>'')
        }
    }
    const getColumn=({keys,list},index)=>{
        const key = keys[index];
        return {
            key,
            col:list.map(row=>row[key])
        };
    };
    const appendColumn=({keys,list},{key,col})=>{
        if(list.length===0){
            
            return{
                keys:[...keys,key],
                list: col.map(value=>({[key]:value}))
            };
        }
        return{
            keys:[...keys,key],
            list: list.map((rowObj,i)=>{
                return {...rowObj,[key]:col[i]};
            })
        };  
    };
    const saveHeaders=(insertArr,deleteArr,fieldNames)=>{
        let table = {
            keys:[],
            list:[] //list of objects like members
        }
        const oldTable ={
            keys:headers(),
            list:[...members]
        }
        fieldNames.forEach((name,i)=>{
            if(insertArr[i]){
                // if inserting, use fieldName as the new column name
                table = appendColumn(table,emptyColumn(oldTable,name));
                table = appendColumn(table,getColumn(oldTable,i));
            }
            else if(deleteArr[i]){
                // do nothing
            }
            else{
                const updatedColumn = getColumn(oldTable,i);
                updatedColumn.key = name;
                console.log(name,{updatedColumn});
                table = appendColumn(table,updatedColumn);
                console.log({table});
            }
        });
        setTemplate(table.keys.reduce((acc,key)=>{
            acc[key] = '';
            return acc;
        },{}));
        setMembers(table.list);
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