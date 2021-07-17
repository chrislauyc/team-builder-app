import React, {useEffect, useState} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
const MemberList=()=>{
    const [value, setValue] = useState("");
    const [storedValue,setStoredValue] = useLocalStorage("hello2",["1","2"])
    useEffect(()=>{
        setValue(window.localStorage.getItem("hello"));
    },[])
    return (
        <>
            <div>{value}</div>
            {
                storedValue.map((item,i)=><div key={i}>{item}</div>)
            }
        </>
        );
};

export default MemberList;