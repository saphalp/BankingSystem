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
import { useState } from 'react';
import axios from "axios";


export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://127.0.0.1:5000/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    if (err.response) {
      console.error("Login error:", err.response.data);
    } else {
      console.error("Network error:", err.message);
    }
  }
};


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
        <form onSubmit={submitLogin}>
        <TextInput label="Email" placeholder="you@gmail.com" required radius="md" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button type='submit' fullWidth mt="xl" radius="md">
          Sign in
        </Button>
        </form>
      </Paper>
    </Container>
  );
}