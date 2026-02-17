import { Container, Title, Center } from '@mantine/core'
import React from 'react'
import { CustomTable } from './CustomTable'

function LoanManager() {

    const approve_loan = (row) => {
      console.log(`Approve loan for ${JSON.stringify(row)}`);
    }
    const decline_loan = (row) => {
      console.log(`Decline loan for ${JSON.stringify(row)}`);
    }

    const table_layout = {
        heads : ["LoanID", "Applicant", "Loan Type", "Term (years)", "Interest"],
        buttons : [
          {
            label: "Approve",
            color: "green",
            onclick_function: approve_loan
          },
          {
            label: "Decline",
            color: "red",
            onclick_function: decline_loan
          }
        ]
    }

    const loan_data = [
      [1, "John Doe", "Auto", "30", 2.3]
    ]
  return (
    <Container my={50}>
      <Center>
          <Title>Review Loan Requests</Title>
      </Center>
        <CustomTable table_layout={table_layout} table_data={loan_data}/>
    </Container>
  )
}

export default LoanManager
