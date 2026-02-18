import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Alert
} from '@mantine/core';
import classes from '../assets/css/LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";


export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [errorMsg, setError] = useState()
  const navigate = useNavigate()
  
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
    if(res.status==200){
      setError(null)
      const data = res.data
      if(data.role){
        localStorage.clear()
        localStorage.setItem("role", data.role)
        if(data.role=='Bank Manager'){
          navigate('/bank_management')
        }else if(data.role=='Loan Manager'){
          navigate('/loan_management')
        }else if(data.role=='Customer Service'){
          navigate('/customer_service')
        }
        else{
          setError("Role not assigned. Contact HR Manager")
        }
      }else{
      localStorage.clear()
      localStorage.setItem("cid", data.ssn)
      navigate('/account_management')
      }
    }
    else{
      console.log("Some error")
    }
  } catch (err) {
    if (err.response) {
      setError(err.response.data.error);
    } else {
      setError(err.response.data.error);
    }
  }
};


  return (
    <Container size={420} my={40}>
      {errorMsg ? (
        <Alert 
          variant="light" 
          color="red" 
          title="Trouble logging in" 
          icon={null}
          mb={20}
        >
          {errorMsg}
        </Alert>
      ) : null}
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