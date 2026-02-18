import { useState } from "react";
import { NumberInput, Button, Group } from "@mantine/core";
import axios from "axios";

export default function LoanForm() {
  const [loanAmt, setLoanAmt] = useState();
  const [loanTerm, setLoanTerm] = useState();

const handleSubmit = async (e) => {
  e.preventDefault();
  const userId = localStorage.getItem("cid")
  try {
    const res = await axios.post(
      `http://localhost:5000/apply_loan/${userId}`,
      {
        loan_amt: loanAmt,
        loan_term: loanTerm,
      }
    );
    alert(`Loan applied successfully!`);
  } catch (err) {
    if (err.response) {
      console.error("Error applying loan:", err.response.data);
    } else {
      console.error("Network or server error:", err);
    }
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <NumberInput
        label="Loan Amount"
        placeholder="Enter loan amount (min $1000)"
        value={loanAmt}
        onChange={(val) => setLoanAmt(val)}
        required
        min={1000}
        mb="md"
      />

      <NumberInput
        label="Loan Term (years)"
        placeholder="Enter loan term (min 1 year)"
        value={loanTerm}
        onChange={(val) => setLoanTerm(val)}
        required
        min={1}
        mb="md"
      />

      <Group position="right" my={40}>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
