import type { AppProps } from 'next/app'
import theme from '@/styles/theme'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <style jsx global>{`
          html {
            font-family: ${plusJakartaSans.style.fontFamily};
          }
        `}</style>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}
