import { Button, NativeSelect, NumberInput, SegmentedControl, TextInput, Title } from '@mantine/core'
import React, { useState } from 'react'

function MakeTransaction() {
    const [type, setType] = useState('transfer');
    const [loanID, setLoanID] = useState('');
  return (
    <>
    <Title order={3}>Make Transactions</Title>
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
    />
    {type=='loan'?<NativeSelect
      mt={20}
      value={loanID}
      onChange={(event) => setLoanID(event.currentTarget.value)}
      data={['Loan ID : 100', 'Loan ID : 101', 'Loan ID : 102', 'Loan ID : 103']}
    />:<TextInput
      required
      label="Account Number"
      mt={20}
    />}
    <Button mt={25}> Send </Button>
    </>
  )
}

export default MakeTransaction
