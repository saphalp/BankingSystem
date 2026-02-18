import { Container, Title, Center } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { CustomTable } from './CustomTable'
import axios from 'axios'

function LoanManager() {
    const [loans, setLoans] = useState()
    const role = localStorage.getItem("role")
    const approve_loan = async (row) => {
      try{
        const res = await axios.patch(`http://127.0.0.1:5000/update_loan/${row.row[0]}`);
        fetchAllLoans();
      } catch(err){
        console.error(err.response?.data || err.message);
      }
    }
    const decline_loan = async (row) => {
      try{
        const res = await axios.delete(`http://127.0.0.1:5000/update_loan/${row.row[0]}`);
        fetchAllLoans();
      } catch(err){
        console.error(err.response?.data || err.message);
      }
    }
        const fetchAllLoans = async () => {
          try {
          const res = await axios.get(
            `http://127.0.0.1:5000/get_loans`
          );
          console.log(res.data)
          setLoans(res.data)
        } catch (err) {
          console.error(err.response?.data || err.message);
        }
        }

    useEffect(() => {
        fetchAllLoans();
       }, [])

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
  <>
    {role === "Loan Manager" && (
      <Container my={50}>
        <Center>
          <Title>Review Loan Requests</Title>
        </Center>

        {loans && (
          <CustomTable
            table_layout={table_layout}
            table_data={loans.map(inner => inner.slice(0, 5))}
          />
        )}
      </Container>
    )}
  </>
);
}

export default LoanManager
