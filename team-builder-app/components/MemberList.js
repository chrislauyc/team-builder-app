import React, {useEffect, useState} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
const MemberList=()=>{
    const [storedValue,setStoredValue] = useLocalStorage("hello2",["1"]);
    return (
        <>
            {
                storedValue.map((item,i)=><div key={i}>{item}</div>)
            }
        </>
    );
};

export default MemberList;