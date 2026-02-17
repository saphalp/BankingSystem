import React, { useEffect, useState } from 'react'
import LoanForm from './LoanForm'
import { Center, Container, Badge, Title, Text, SimpleGrid, Image, Space } from '@mantine/core'
import { CustomTable } from './CustomTable'
import MakeTransaction from './MakeTransaction'
import axios from "axios";


function CustomerProfilePage() {

const [userData, setUserData] = useState(null);
const [transactionData, setTransactionData] = useState(null);


useEffect(() => {
  const fetchUser = async () => {
    try {
      const cid = localStorage.getItem("cid");

      const res = await axios.get(
        `http://127.0.0.1:5000/get_user/${cid}`
      );

      setUserData(res.data);

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const cid = localStorage.getItem("cid");
      const res = await axios.get(
        `http://127.0.0.1:5000/get_transactions/${cid}`
      );
    //   console.log(res.data.transactions)
      setTransactionData(res.data.transactions)
    } catch(err){
        console.error(err.response?.data || err.message);
    }
  }

  fetchUser();
  fetchTransactions();
}, []);


 const transactions_table = {
        heads : ["ID", "Date","Type", "Account", "Amount"],
        buttons : null
    }


  return userData?
    <>
    <Container my={50}>
    
    <Title>Welcome Back, {userData.name}!</Title>
    <Text>Access your accounts and manage your finances securely.</Text>
    <Text size="md" c="dimmed" mt={30}>Total Balance</Text>
        <Title order={1} size={64}>
        ${userData.balance}
        </Title>
    <Container mt={50}>
            <Title order={3}>Recent Transactions</Title>
        {transactionData?<CustomTable table_layout={transactions_table} table_data={transactionData}/>:<></>}
    </Container>
        <Container mt={100}>
            <MakeTransaction user_acc = {userData.accounts[0]}/>
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
  :<></>
}

export default CustomerProfilePage
