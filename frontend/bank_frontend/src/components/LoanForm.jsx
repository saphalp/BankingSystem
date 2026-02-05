import { Button, Container, NativeSelect, NumberInput, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { useForm } from '@mantine/form';

function LoanForm() {    
    const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      loanType: '',
      income: '',
      term: ''
    }
  });
  return (
    <Container>
        <form>
            <NativeSelect
                required
                label="Loan Type"
                data={[
                    { value: '', label: 'Select Loan Type' },
                    { value: 'auto', label: 'Auto Loan' },
                    { value: 'personal', label: 'Personal Loan' },
                    { value: 'home', label: 'Home Loan' },
                    { value: 'student', label: 'Student Loan' },
                    ]}
                {...form.getInputProps('loanType')}
            />
            <TextInput
                label="Gross Income"
                required
                placeholder="$70000"
                {...form.getInputProps('income')}
            />
            <NumberInput
            label="Term (In Years)"
            placeholder="10 years"
            {...form.getInputProps('term')}
            />
            <Button my={20}> Apply </Button>
        </form>
    </Container>
  )
}

export default LoanForm
