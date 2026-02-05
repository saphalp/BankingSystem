import React from 'react'
import LoanForm from './LoanForm'
import { Center, Container, Badge, Title, Text, SimpleGrid, Image, Space } from '@mantine/core'
import { CustomTable } from './CustomTable'

function CustomerProfilePage() {
  return (
    <>
    <Container my={50}>
    
    <Title>Welcome Back, Saphal!</Title>
    <Text>Access your accounts and manage your finances securely.</Text>
    <Text size="md" c="dimmed" mt={30}>Total Balance</Text>
        <Title order={1} size={64}>
        $10,000
        </Title>
    <Container mt={50}>
            <Title order={3}>Recent Transactions</Title>
        <CustomTable/>
    </Container>
    <Container mt={100}>
    <SimpleGrid cols={2}>    
    <div>
        <Center>
        <Title order={3}>Apply for a Loan</Title>
        </Center>
        <LoanForm/>
    </div>
    <div>
       <Image
       radius="md"
      src="https://www.debt.org/wp-content/uploads/2012/04/Auto-Loans.gif"
    /> 
    </div>
    </SimpleGrid>
    </Container>
    </Container>
    </>
  )
}

export default CustomerProfilePage
