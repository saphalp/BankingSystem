import { SegmentedControl } from '@mantine/core';
import classes from '../assets/css/AccountSelection.module.css';
import { useState } from 'react';


export function AccountSelection({accountType, setAccountType}) {
  
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      mt={20}
      data={['Savings', 'Checking']}
      classNames={classes}
      defaultValue={accountType}
      onChange={(e)=>setAccountType(e)}
    />
  );
}