// useLocalStorage solution specific to the nextjs window object problem
import {useState, useEffect} from 'react';
export const useLocalStorage=(key,initialValue)=>{
    const [storedValue,setStoredValue] = useState(initialValue);
    useEffect(()=>{
        console.log("use effect is run");
        const item = window.localStorage.getItem(key)
        if(item){
            let parsedItem;
            try{
                parsedItem = JSON.parse(item);
                setStoredValue(parsedItem);
            }
            catch(err){
                console.log(err);
                console.log(item);
            }
        }    
        else{
            window.localStorage.setItem(key,JSON.stringify(initialValue));
            setStoredValue(initialValue);
        }
    },[]);
    const setValue=(value)=>{
        setStoredValue(value);
        window.localStorage.setItem(key,JSON.stringify(value));
    }
    return [storedValue,setValue];
};