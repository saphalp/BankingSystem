import { Button, Container, Group, Table, NativeSelect } from '@mantine/core';
import { useState } from 'react';

export function CustomTable({ table_layout, table_data }) {
  const [rowUpdates, setRowUpdates] = useState({})

  const rows = table_data.map((row, index) => (
    <Table.Tr key={index}>
      {row.map((cell, i) => (
        <Table.Td key={i}>{cell}</Table.Td>
      ))}

      <Table.Td>
        {table_layout.other_inputs?.map((e, i) => (
          <NativeSelect
            key={i}
            defaultValue={""}
            data={e.options}
            onChange={(event) =>
              setRowUpdates((prev) => ({
                ...prev,
                [index]: event.target.value, 
              }))
            }
          />
        ))}
      </Table.Td>

      <Table.Td>
        <Group>
          {table_layout.buttons?.map((btn, i) => (
            <Button
              key={i}
              size="compact-sm"
              bg={btn.color}
              onClick={() =>
                btn.onclick_function({
                  row,
                  selectedValue: rowUpdates[index],
                })
              }
              >
              {btn.label}
            </Button>
          ))}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const heads = table_layout.heads.map((e, i) => (
    <Table.Th key={i}>{e}</Table.Th>
  ));

  return (
    <Container mt={50}>
      <Table>
        <Table.Thead>
          <Table.Tr>{heads}</Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
}
