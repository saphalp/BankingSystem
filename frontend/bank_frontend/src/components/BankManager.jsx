import { Container, Center, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { CustomTable } from './CustomTable'
import { data } from 'react-router-dom'
import Analytics from './Analytics'
import axios from 'axios'


function BankManager() {
    const role = localStorage.getItem("role")
    const update_role = (row) => {
        console.log(`Role updated to ${JSON.stringify(row)}`);
    }

    const user_table={
        heads : ["UserID", "Name", "Email", "Role"],
        buttons : [
          {
            label: "Update",
            color: "orange",
            onclick_function: update_role,
          }],
        other_inputs : [{
            options : ['', 'Loan Manager', 'Customer Service'],
        }
        ]
        
    }

    const user_data = [
      [1, "John Doe", "johndoe@bank.com", "Loan Manager"]
    ]
  return (
    <>
    {role=="Bank Manager"?
    <Container my={50}>
        <Analytics/>
        <Center my={100}>
            <Title>Manage Users</Title>
        </Center>
        <CustomTable table_layout={user_table} table_data={user_data}/>
    </Container>: null}
    </>
  )
}

export default BankManager
