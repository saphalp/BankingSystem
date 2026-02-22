import React, { useEffect, useState } from 'react'
import { CustomTable } from './CustomTable'
import { Container, Title, Center, Alert } from '@mantine/core'
import axios from "axios";



function CustomerAccountManagement() {
  const [accounts, setAccounts] = useState()
  const [error, setError] = useState()
  const role = localStorage.getItem("role")
   const close_account = async (row) => {
      try{
        const res = await axios.delete(`http://127.0.0.1:5000/update_account/${row.row[2]}`);
        fetchAllUsers();
      } catch(err){
        setError(err.response.data.error);
      }
   }

   const issue_debit_card = async (row) => {
      try{
        const res = await axios.patch(`http://127.0.0.1:5000/update_account/${row.row[2]}`);
        fetchAllUsers();
      } catch(err){
        console.error(err.response?.data || err.message);
      }
   }

   const fetchAllUsers = async () => {
      try {
      const res = await axios.get(
        `http://127.0.0.1:5000/get_accounts`
      );
      setAccounts(res.data)
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
    }

   useEffect(() => {
    fetchAllUsers();
   }, [])

   
   const account_mgmt_table = {
        heads : ["Account Holder", "Debit Card Number", "Account Number", "Account Type", "Balance"],
        buttons : [
          {
            label: "Issue Debit",
            color: "blue",
            onclick_function: issue_debit_card
          },
          {
            label: "Close Account",
            color: "red",
            onclick_function: close_account
          }
        ]
    }

    const accounts_data = [
      ["John Doe", "1234567890", "Savings", "10000"],
      ["Hari Prasad", "0929893284", "Savings", "4234"],
      ["Saphal Pant", "5412452665", "Checking", "234234"],
      ["Banye West", "3467456468", "Checking", "43564576"]
    ]

    return (
      <>
      {role=="Customer Service"?
  <Container my={30}>
    {error ? (
            <Alert 
              variant="light" 
              color="red" 
              title="Error deleting account" 
              icon={null}
              mb={20}
            >
              {error}
            </Alert>
          ) : null}
    <Center>
      <Title>Manage Customer Accounts</Title>
    </Center>
    {accounts?
    <CustomTable
      table_layout={account_mgmt_table}
      table_data={accounts}
    />: <></>}
  </Container>:null}
  </>
) 

}

export default CustomerAccountManagement
