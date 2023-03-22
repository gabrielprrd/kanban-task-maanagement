import { ComponentStyleConfig, StyleFunctionProps } from "@chakra-ui/react"

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
    bg: '#635FC7',
    color: '#FFFFFF',
    borderRadius: '3xl',
    _hover: {
      bg: '#A8A4FF'
    }
  },
  variants: {
    'secondary': (props: StyleFunctionProps) => ({
      color: '#635FC7',
      bg: '#F7F7FD',
      _hover: {
        bg: props.colorMode === 'light' ? '#E4EBFA' : '#F7F7FD'
      }
    }),
    'destructive': {
      bg: '#EA5555',
      _hover: {
        bg: '#FF9898'
      }
    },
  },
}

export default Button
