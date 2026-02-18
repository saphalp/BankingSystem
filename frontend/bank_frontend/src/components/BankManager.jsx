import { Container, Center, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { CustomTable } from './CustomTable'
import { data } from 'react-router-dom'
import Analytics from './Analytics'
import axios from 'axios'


function BankManager() {
    const role = localStorage.getItem("role")
    const [employees, setEmployees] = useState()
    const update_role = async (row) => {
      try{
          const res = await axios.patch(`http://127.0.0.1:5000/update_role`, {'eid':row.row[0], 'new_role':row.selectedValue})
          if(res.status==200){
            alert("Role updated succesfully")
            fetchEmployees()
          }
        } catch(err){
          console.log(err)
        }
    }

    const fetchEmployees = async () => {
      try{
        const res = await axios.get(`http://127.0.0.1:5000/get_employees`)
        console.log(res.data)
        setEmployees(res.data)
      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchEmployees()
    },[])

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
        {employees?<CustomTable table_layout={user_table} table_data={employees}/>:null}
    </Container>: null}
    </>
  )
}

export default BankManager
