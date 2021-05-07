import React from 'react';
import uuid from 'react-uuid';
import {
    Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import styled from 'styled-components';
// import {makeStyles} from '@material-ui/core/styles';
function MemberList(props){
    const {members,headers} = props; 
    return(
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        {
                            headers.map((h)=><StyledCell key={uuid()}>{h}</StyledCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        members.map((member)=>{
                            return(
                                <TableRow key={uuid()}>
                                    {
                                        headers.map((h)=>(
                                            <TableCell key={uuid()}>
                                                {member[h]}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default MemberList;

const StyledCell = styled(TableCell)`
    text-transform:capitalize;
    font-weight:bold;
`;