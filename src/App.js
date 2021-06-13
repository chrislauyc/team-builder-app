import './App.css';
import React from 'react';
import Header from './components/Header';
import MemberList from './components/MemberList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <MemberList></MemberList>
      </main>
    </div>
  );
}

export default App;
