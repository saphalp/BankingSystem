import { Paper, Flex, Center } from '@mantine/core'
import React from 'react'
import DataCard from './DataCard'
import Donut from './Donut'

function Analytics() {
    const account_type_donut=[
        { name: 'Savings', value: 14, color: 'pink' },
        { name: 'Checking', value: 9, color: 'gray.6' },
      ] 
      
    const approved_loan_types=[
        { name: 'Home Loan', value: 14, color: 'red' },
        { name: 'Personal Loan', value: 9, color: 'blue' },
        { name: 'Auto Loan', value: 9, color: 'orange' },
    ]
  return (
    <>
    <Flex justify={'center'} gap={"xl"} wrap="wrap" my={100}>
    <DataCard value={"$1230"} label={"Average Daily Transaction"}/>
    <DataCard value={"30"} label={"Total Accounts"} color='green'/>
    <DataCard value={"3"} label={"Pending Loans"}/>
    </Flex>
    <Flex justify={'center'} gap={100} wrap="wrap" my={30}>
    <Donut data={approved_loan_types} label={"Approved Loan Types"}/>
    <Donut data={account_type_donut} label={"Account Types"}/>
    </Flex>
    </>
  )
}

export default Analytics
