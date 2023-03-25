import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    bg: 'transparent',
  },
  track: {
    bg: '#635FC7',
    _checked: {
      bg: '#635FC7',
    },
  },
})

const Switch = defineMultiStyleConfig({ baseStyle })
export default Switch
