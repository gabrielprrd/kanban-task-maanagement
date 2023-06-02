import { Button, Text, VStack } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'
import LogoDark from '@/public/logo/logo-dark.svg'
import Head from 'next/head'

export default function LoginPage() {
  function handleGoogleSignIn() {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <>
      <Head>
        <title>{'Login | Kanban Web App'}</title>
        <meta name="description" content="Achieve your goals" />
      </Head>
      <VStack height="100vh" width="100vw" justifyContent="center" gap={3}>
        <LogoDark />

        <Button onClick={handleGoogleSignIn} variant="primary" gap={2}>
          <FaGoogle />
          <Text>Sign in with Google</Text>
        </Button>
      </VStack>
    </>
  )
}
