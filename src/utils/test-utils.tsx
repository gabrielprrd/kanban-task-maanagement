import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import theme from '@/styles/theme'
import { ThemeProvider } from '@chakra-ui/react'

interface WrapperProps {
  children: JSX.Element
}

const renderWithProviders = (ui: ReactElement) => {
  const Wrapper = ({ children }: WrapperProps) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )

  return render(ui, { wrapper: Wrapper })
}

export default renderWithProviders
