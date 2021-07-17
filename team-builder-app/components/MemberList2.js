import React, {useState} from 'react';
import {
    Table, TableBody, TableContainer,TableRow, Paper, Button
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Member from './Member';
import ListHeaders from './ListHeaders';
import {useList} from '../hooks/useList';
// const initialValue = {
//     'first name':'',
//     'last name':'',
//     email:'',
//     role:'',
//     hobby:''
//   };
// const initialTeam = [
//     {
//         'first name':'Chris',
//         'last name': 'Lau',
//         email:'chrislyc.lau@gmail.com',
//         role:'Full Stack Developer',
//         hobby:'Biking'
//     }
// ];
// const useStyles = makeStyles({
//     table:{
//         backgroundColor:'rgb(221, 221, 221,0.85)'
//     }
// });
function MemberList2(){
  const [members, setMembers] = useList("")

  useEffect(() => {
    setMembers({
      firstName: "Durrell"
    })
  })

  return(
    <div>
      {members.firstName}
    </div>
  )

  
}
export default MemberList2;