import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react'
import { ReactElement, useState } from 'react'
import DesktopToggleSidebarButton from './DesktopToggleSidebarButton'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

interface Props {
  children: ReactElement
}

export default function DashboardLayout({ children }: Props) {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)

  function toggleSidebarVisibility() {
    setIsSidebarHidden(!isSidebarHidden)
  }

  return (
    <>
      <Grid
        h="100vh"
        maxH="100vh"
        w="100vw"
        overflow="hidden"
        templateRows="10vh 1fr"
        templateColumns={{
          base: '1fr',
          sm: isSidebarHidden ? '0px 1fr' : '200px 1fr',
        }}
        transition=".2s ease"
      >
        <GridItem rowSpan={1} colSpan={2}>
          <Topbar />
        </GridItem>
        <GridItem colSpan={{ sm: 1 }}>
          <Sidebar toggleSidebarVisibility={toggleSidebarVisibility} />
        </GridItem>
        <GridItem colSpan={{ base: 3, sm: 1 }} zIndex={0}>
          <Box
            h="100%"
            w="100%"
            bgColor={useColorModeValue('#F4F7FD', '#20212C')}
            overflow="auto"
          >
            {children}
          </Box>
        </GridItem>
      </Grid>
      <DesktopToggleSidebarButton
        isSidebarHidden={isSidebarHidden}
        toggleSidebarVisibility={toggleSidebarVisibility}
      />
    </>
  )
}
