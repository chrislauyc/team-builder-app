import './App.css';
import React,{useState} from 'react';
import Header from './components/Header';
import EditMember from './components/EditMember';
import MemberList from './components/MemberList';
const getDefaultMember = () =>{
  return{
      ['first name']:'',
      ['last name']:'',
      email:'',
      role:'',
      hobby:'',
      gender:''
  };
};
function App() {
  const [members, setMembers] = useState([]);
  const addMember = (newMember)=>{
    setMembers([...members,newMember]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <MemberList members={members} getDefaultMember={getDefaultMember}></MemberList>
        {/* <EditMember addMember={addMember} getDefaultMember={getDefaultMember}></EditMember> */}
      </main>
    </div>
  );
}

export default App;
