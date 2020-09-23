// import Head from 'next/head'
import { useState, FormEvent } from 'react';
import { Flex, Button, Text, Image } from '@chakra-ui/core';
import Input from '../components/Input';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');

  function handleSignUpToNewsletter(e: FormEvent) {
    e.preventDefault();
    axios.post('/api/subscribe', { email });
  }

  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        as="form"
        onSubmit={handleSignUpToNewsletter}
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={8}
        marginTop={4}
        width="100%"
        maxW="400px"
      >
        <Image marginBottom={8} src="/vercel.svg" alt="Vercel" />

        <Text textAlign="center" fontSize="sm" color="gray.400" marginBottom={2}>
          Subscribe to the Vercel newsletter and receive the best computer programming content!
        </Text>

        <Input
          placeholder="Your best e-mail"
          marginTop={2}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          backgroundColor="gray.500"
          height="50px"
          borderRadius="sm"
          marginTop={6}
          _hover={{ backgroundColor: 'gray.400' }}
        >
          SUBSCRIBE
        </Button>
      </Flex>
    </Flex>
  )
}
