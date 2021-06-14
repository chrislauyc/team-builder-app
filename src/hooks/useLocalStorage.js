import {useState} from 'react';
export const useLocalStorage=(key,initialValue)=>{
    const [storedValue,setStoredValue] = useState(()=>{
        const item = window.localStorage.getItem(key)
        if(item){
            let parsedItem;
            try{
                parsedItem = JSON.parse(item);
            }
            catch(err){
                console.log(err);
            }
            if(parsedItem){
                return parsedItem;
            }
            else{
                console.log('Unable to parse string: ',item);
                window.localStorage.removeItem(key);
                return initialValue;
            }
        }    
        else{
            return initialValue;
        }
    });
    const setValue=(value)=>{
        setStoredValue(value);
        window.localStorage.setItem(key,JSON.stringify(value));
    }
    return [storedValue,setValue];
};