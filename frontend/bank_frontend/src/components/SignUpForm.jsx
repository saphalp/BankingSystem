import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from '../assets/css/LoginPage.module.css';
import { AccountSelection } from './AccountSelection';

export function SignUpForm() {
  return (
    <Container size={620} my={40}>
      <Title ta="center" className={classes.title}>
        Create An Account
      </Title>
      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput label="First Name" placeholder="John" required radius="md" />
        <TextInput label="Last Name" placeholder="Doe" required radius="md" />
        <TextInput label="Date of Birth" placeholder="mm/dd/yyy" required radius="md" />
        <TextInput label="Street Address" placeholder="" required radius="md" />
        <TextInput label="City" placeholder="" required radius="md" />
        <TextInput label="State" placeholder="" required radius="md" />
        <TextInput label="Zip Code" placeholder="" required radius="md"/>
        <TextInput label="Social Security (SSN)" placeholder="" required radius="md"/>
        <TextInput label="Phone Number" placeholder="" required radius="md"/>
        <TextInput label="Email" placeholder="you@gmail.com" required radius="md" />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" />
        <AccountSelection/>
        <Button fullWidth mt="xl" radius="md">
          Create Account
        </Button>
      </Paper>
    </Container>
  );
}