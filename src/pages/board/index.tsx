import Welcome from '@/components/Welcome'
import DashboardLayout from '@/components/layouts/Dashboard'
import { ReactElement } from 'react'
import { requireAuth } from '@/utils/requireAuth'
import { GetServerSidePropsContext } from 'next'

export default function BoardPage() {
  return <Welcome />
}

BoardPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return requireAuth(ctx, (session) => ({ props: { session } }))
}
