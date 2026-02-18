import { Paper, Flex, Center } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import DataCard from './DataCard'
import Donut from './Donut'
import axios from 'axios'

function Analytics() {
    const [avgTrans, setAvgTrans] = useState()
    const [savingAcc, setSavingAcc] = useState()
    const [checkingAcc, setCheckingAcc] = useState()
    const [pendingLoans, setPendingLoan] = useState()
    const [totalAcc, setTotalAcc] = useState()


    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/get_analytics`)
        setAvgTrans(res.data[0])
        setSavingAcc(res.data[1])
        setCheckingAcc(res.data[2])
        setPendingLoan(res.data[3])
        setTotalAcc(res.data[4])
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      fetchAnalytics()
    }, [])
    const account_type_donut=[
        { name: 'Savings', value: savingAcc, color: 'pink' },
        { name: 'Checking', value: checkingAcc, color: 'gray.6' },
      ] 
      
    const approved_loan_types=[
        { name: 'Home Loan', value: 14, color: 'red' },
        { name: 'Personal Loan', value: 9, color: 'blue' },
        { name: 'Auto Loan', value: 9, color: 'orange' },
    ]
  return (
    <>
    <Flex justify={'center'} gap={"xl"} wrap="wrap" my={100}>
    <DataCard value={avgTrans} label={"Average Daily Transaction"}/>
    <DataCard value={totalAcc} label={"Total Accounts"} color='green'/>
    <DataCard value={pendingLoans} label={"Pending Loans"}/>
    </Flex>
    <Flex justify={'center'} gap={100} wrap="wrap" my={30}>
    <Donut data={approved_loan_types} label={"Approved Loan Types"}/>
    <Donut data={account_type_donut} label={"Account Types"}/>
    </Flex>
    </>
  )
}

export default Analytics
