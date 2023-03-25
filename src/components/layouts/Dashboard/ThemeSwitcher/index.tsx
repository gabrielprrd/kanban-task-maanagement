import { COLOR_MODE } from '@/constants/index'
import {
  HStack,
  Icon,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeSwitcher() {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <HStack
      justify="center"
      bgColor={useColorModeValue('#F4F7FD', '#20212C')}
      p={2}
      gap={2}
      borderRadius="md"
    >
      <Icon as={FaSun} color="#828FA3" />
      <Switch
        aria-label="Theme switcher"
        id="theme-switcher"
        size="md"
        onChange={toggleColorMode}
        isChecked={colorMode === COLOR_MODE.DARK}
      />
      <Icon as={FaMoon} color="#828FA3" />
    </HStack>
  )
}
