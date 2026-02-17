import { Button, NativeSelect, NumberInput, SegmentedControl, TextInput, Title } from '@mantine/core'
import React, { useState } from 'react'
import axios from "axios";


function MakeTransaction({user_acc}) {
    const [type, setType] = useState('transfer');
    const [amount, setAmount] = useState();
    const [accNumber, setAccNumber] = useState();
    const [routNumber, setRoutNumber] = useState();

    const [loanID, setLoanID] = useState('');

    const handleMakeTransactions = async (e) => {
      e.preventDefault();
      if(type=='transfer'){
        try {
        const res = await axios.post("http://127.0.0.1:5000/make_transaction", {
        acc_no: user_acc,
        amount: amount,
        t_type: type.toUpperCase(),
        dest_acc_no: accNumber,
        dest_rout_no: routNumber
      });
      setAmount(null);
      setAccNumber("");
      setRoutNumber("");
    } catch (err) {
      console.log(err.response?.data?.error || err.message);
    }
      }
    }
  return (
    <>
    <Title order={3}>Make Transactions</Title>
    <form>
    <SegmentedControl
      value={type}
      onChange={setType}
      data={[
          { label: 'Transfer', value: 'transfer' },
        { label: 'Loan Repayment', value: 'loan' },
        { label: 'Utilities', value: 'utility' },
      ]}
    />
    <NumberInput
      required
      label="Amount"
      value={amount}
      onChange={(val) => setAmount(val)}
    />
    {type=='loan'?<NativeSelect
      mt={20}
      value={loanID}
      onChange={(event) => setLoanID(event.currentTarget.value)}
      data={['Loan ID : 100', 'Loan ID : 101', 'Loan ID : 102', 'Loan ID : 103']}
    />:<><TextInput
      required
      label="Account Number"
      mt={20}
      value={accNumber}
      onChange={(e)=> setAccNumber(e.target.value)}
    />
    <TextInput
      required
      label="Routing Number"
      mt={20}
      value={routNumber}
      onChange={(e)=> setRoutNumber(e.target.value)}
    /></>}
    <Button mt={25} type='submit' onClick={handleMakeTransactions}> Send </Button>
    </form>
    </>
  )
}

export default MakeTransaction
