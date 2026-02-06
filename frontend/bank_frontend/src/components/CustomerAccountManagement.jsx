import React from 'react'
import { CustomTable } from './CustomTable'
import { Container, Title, Center } from '@mantine/core'

function CustomerAccountManagement() {
   const close_account = () => {
      console.log("close_account")
   }

   const issue_debit_card = () => {
      console.log("issue_debit_card")
   }
   const account_mgmt_table = {
        heads : ["Account Holder", "Account Number", "Account Type", "Balance"],
        buttons : [
          {
            label: "Issue Debit Card",
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
    <Container my={50}>
    <Center>
    <Title>Manage Customer Accounts</Title>
    </Center>
    <CustomTable table_layout={account_mgmt_table} table_data={accounts_data}/>
    </Container>
  )
}

export default CustomerAccountManagement
