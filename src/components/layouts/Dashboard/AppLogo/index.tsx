import LogoLight from '@/public/logo/logo-light.svg'
import LogoDark from '@/public/logo/logo-dark.svg'
import LogoMobile from '@/public/logo/logo-mobile.svg'
import { useBreakpoint, useColorMode } from '@chakra-ui/react'
import { COLOR_MODE } from '@/constants/index'

export default function AppLogo() {
  const { colorMode } = useColorMode()
  const currentBreakpoint = useBreakpoint()

  const colorModeLogoHandler =
    colorMode === COLOR_MODE.LIGHT ? <LogoDark /> : <LogoLight />

  const logo =
    currentBreakpoint === 'base' ? <LogoMobile /> : colorModeLogoHandler
  return <>{logo}</>
}
