import { Button, Container, Group, Table } from '@mantine/core';

export function CustomTable({table_layout, table_data}) {

  const buttons = table_layout.buttons?table_layout.buttons.map((e, index)=>(
    <Button key={index} size='compact-sm' bg={e.color} onClick={e.onclick_function}>{e.label}</Button>
  )):<></>

  

  const rows = table_data.map((row, index) => (
    <Table.Tr key={index}>
      {/* <Table.Td>{element.customerName}</Table.Td>
      <Table.Td>{element.accountNumber}</Table.Td>
      <Table.Td>{element.accountType}</Table.Td>
      <Table.Td>{element.totalBalance}</Table.Td> */}
      {row.map((e, i) => (
        <Table.Td key={i}>{e}</Table.Td>
      ))}
      <Table.Td> 
        <Group> 
          {buttons}
        </Group>
          </Table.Td>
    </Table.Tr>
  ));

  const heads = table_layout.heads.map((e)=>(
    <Table.Th>{e}</Table.Th>
  ))



  return (
    <Container mt={50}>
    <Table>
      <Table.Thead>
        <Table.Tr>
          {/* <Table.Th>Customer Name</Table.Th>
          <Table.Th>Account Number</Table.Th>
          <Table.Th>Account Type</Table.Th>
          <Table.Th>Total Balance ($)</Table.Th> */}
          {heads}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows}
      </Table.Tbody>
    </Table>
    </Container>
  );
}