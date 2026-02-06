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
import { useState } from 'react';
import axios from "axios";


export function SignUpForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dob, setDOB] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [ssn, setSsn] = useState("")
  const [phoneNumber, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] = useState("Savings")

  const registerUser = async (e) => {
    e.preventDefault();
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/register",
          { firstName, lastName, dob, streetAddress, city, state, zipCode, ssn, phoneNumber, accountType, email, password },
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
  }
  

  return (
    <Container size={620} my={40}>
      <Title ta="center" className={classes.title}>
        Create An Account
      </Title>
      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={registerUser}>
        <TextInput label="First Name" placeholder="John" required radius="md" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <TextInput label="Last Name" placeholder="Doe" required radius="md" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <TextInput label="Date of Birth" placeholder="mm/dd/yyy" required radius="md" value={dob} onChange={(e) => setDOB(e.target.value)}/>
        <TextInput label="Street Address" placeholder="" required radius="md" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
        <TextInput label="City" placeholder="" required radius="md" value={city} onChange={(e) => setCity(e.target.value)}/>
        <TextInput label="State" placeholder="" required radius="md" value={state} onChange={(e) => setState(e.target.value)}/>
        <TextInput label="Zip Code" placeholder="" required radius="md" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
        <TextInput label="Social Security (SSN)" placeholder="" required radius="md" value={ssn} onChange={(e) => setSsn(e.target.value)}/>
        <TextInput label="Phone Number" placeholder="" required radius="md" value={phoneNumber} onChange={(e) => setPhone(e.target.value)}/>
        <TextInput label="Email" placeholder="you@gmail.com" required radius="md" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <AccountSelection accountType={accountType} setAccountType={setAccountType}/>
        <Button type='submit' fullWidth mt="xl" radius="md">
          Create Account
        </Button>
        </form>
      </Paper>
    </Container>
  );
}