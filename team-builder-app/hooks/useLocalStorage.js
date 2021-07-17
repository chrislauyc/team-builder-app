import {useState, useEffect} from 'react';
export const useLocalStorage=(key,initialValue)=>{
    const [storedValue,setStoredValue] = useState(null);
    useEffect(()=>{
        const item = window.localStorage.getItem(key)
        if(item){
            let parsedItem;
            try{
                parsedItem = JSON.parse(item);
                setStoredValue(parsedItem);
            }
            catch(err){
                console.log(err);
            }
        }    
        else{
            setStoredValue(initialValue);
        }
    },[]);
    const setValue=(value)=>{
        setStoredValue(value);
        window.localStorage.setItem(key,JSON.stringify(value));
    }
    return [storedValue,setValue];
};