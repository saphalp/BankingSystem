import { SegmentedControl } from '@mantine/core';
import classes from '../assets/css/AccountSelection.module.css';

export function AccountSelection() {
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      mt={20}
      data={['Savings', 'Checking']}
      classNames={classes}
    />
  );
}