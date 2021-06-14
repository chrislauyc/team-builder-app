import {useState} from 'react';
export const useEditHeaders=()=>{
    const [editedHeaders,setEditedHeaders] = useState(null);
    const [isEditing,setIsEditing] = useState(false);
    const [toInsert, setToInsert] = useState([]);
    const [toDelete, setToDelete] = useState([]);
    const startEditing=(initialHeaders)=>{
        setIsEditing(true);
        setEditedHeaders(initialHeaders);
    };
    const reset=()=>{
        setIsEditing(false);
        setEditedHeaders(null);
        setToInsert([]);
        setToDelete([]);
    };
    const cancelEditing=()=>{
        reset();
    };
    const insertHeader=(index,value)=>{
        setToInsert([...toInsert,{[index]:value}]);
    };
    const deleteHeader=(index)=>{
        setToDelete([...toDelete,index]);
    };
    const editHeader=(index,value)=>{
        setEditedHeaders(editedHeaders.splice(index,1,value));
    };
    const saveHeaders=()=>{
        return{
            editedHeaders,
            toInsert,
            toDelete
        };
        reset();
    };
    return[
        isEditing,
        editedHeaders,
        startEditing,
        cancelEditing,
        insertHeader,
        deleteHeader,
        editHeader,
        saveHeaders
    ];
};