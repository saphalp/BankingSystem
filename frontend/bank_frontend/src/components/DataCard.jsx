import { Center, Paper, Title, Text, Flex } from '@mantine/core'
import React from 'react'

export function DataCard({ value, label, color = "blue" }) {
  return (
    <Paper bg={color} radius={20} w={250} h={120} p="md">
      <Flex justify="center" align="center" direction="column" h="100%">
        <Title c="white" order={1}>{value}</Title>
        <Text c="white">{label}</Text>
      </Flex>
    </Paper>
  );
}

export default DataCard
