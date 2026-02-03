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
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
 const navigate = useNavigate()
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet? <Anchor onClick={()=>navigate('/signup')}>Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@gmail.com" required radius="md" />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" />
        <Button fullWidth mt="xl" radius="md">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}