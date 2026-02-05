import { Button, Container, Table } from '@mantine/core';

export function CustomTable() {

    const customers = [
  {
    customerName: 'John Doe',
    accountNumber: '1234567890',
    accountType: 'Savings',
    totalBalance: 15234.75,
  },
  {
    customerName: 'Jane Smith',
    accountNumber: '9876543210',
    accountType: 'Checking',
    totalBalance: 8420.5,
  },
];

  const rows = customers.map((element) => (
    <Table.Tr key={element.customerName}>
      <Table.Td>{element.customerName}</Table.Td>
      <Table.Td>{element.accountNumber}</Table.Td>
      <Table.Td>{element.accountType}</Table.Td>
      <Table.Td>{element.totalBalance}</Table.Td>
      <Table.Td> <Button size='compact-sm'> View Transactions </Button> </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container mt={50}>
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Customer Name</Table.Th>
          <Table.Th>Account Number</Table.Th>
          <Table.Th>Account Type</Table.Th>
          <Table.Th>Total Balance ($)</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows}
      </Table.Tbody>
    </Table>
    </Container>
  );
}