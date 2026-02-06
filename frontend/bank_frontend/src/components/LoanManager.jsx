import { Container } from '@mantine/core'
import React from 'react'
import { CustomTable } from './CustomTable'

function LoanManager() {

    const approve_loan = () => {
      console.log("Approve Loan");
    }
    const decline_loan = () => {
      console.log("Decline Loan");
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
        <CustomTable table_layout={table_layout} table_data={loan_data}/>
    </Container>
  )
}

export default LoanManager
