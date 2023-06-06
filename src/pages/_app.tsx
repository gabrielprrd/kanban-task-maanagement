import type { AppProps } from 'next/app'
import theme from '@/styles/theme'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { Plus_Jakarta_Sans } from '@next/font/google'
import { api } from '@/utils/index'
import { SessionProvider } from 'next-auth/react'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <SessionProvider session={session}>
        <ChakraProvider resetCSS theme={theme}>
          <main className={plusJakartaSans.className}>
            {getLayout(<Component {...pageProps} />)}
          </main>
        </ChakraProvider>
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(App)
