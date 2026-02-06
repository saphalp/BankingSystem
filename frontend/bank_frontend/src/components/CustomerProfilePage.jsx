import React from 'react'
import LoanForm from './LoanForm'
import { Center, Container, Badge, Title, Text, SimpleGrid, Image, Space } from '@mantine/core'
import { CustomTable } from './CustomTable'
import MakeTransaction from './MakeTransaction'

function CustomerProfilePage() {
 const transactions_table = {
        heads : ["ID", "Date", "Account", "Amount"],
        buttons : null
    }

 const transaction_data = [
    [11, "09/24/2003", "192192190347", "$394235"],
    [12, "09/24/2023", "124342342545", "$142534"],
    [13, "09/24/2012", "252354252525", "$456477"],
    [14, "09/24/2024", "252532524566", "$6356"],
 ]
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
        <CustomTable table_layout={transactions_table} table_data={transaction_data}/>
    </Container>
        <Container mt={100}>
            <MakeTransaction/>
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
