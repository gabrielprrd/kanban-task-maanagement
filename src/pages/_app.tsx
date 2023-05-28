import type { AppProps } from 'next/app'
import theme from '@/styles/theme'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { Plus_Jakarta_Sans } from '@next/font/google'
import DashboardLayout from '@/components/layouts/Dashboard'
import { api } from '@/utils/index'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <main className={plusJakartaSans.className}>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </main>
      </ChakraProvider>
    </>
  )
}

export default api.withTRPC(App)
