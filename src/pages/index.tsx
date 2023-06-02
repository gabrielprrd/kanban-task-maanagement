import Welcome from '@/components/Welcome'
import DashboardLayout from '@/components/layouts/Dashboard'
import { ReactElement } from 'react'
import { GetServerSidePropsContext } from 'next'
import { requireAuth } from '../utils'

export default function Home() {
  return <Welcome />
}

Home.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return requireAuth(ctx, (session) => ({ props: { session } }))
}
