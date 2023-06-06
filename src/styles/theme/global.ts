import { StyleFunctionProps } from '@chakra-ui/react'

const global = (props: StyleFunctionProps) => ({
  body: {
    bg: props.colorMode === 'light' ? '#FFFFFF' : '#3e3F4E',
  },
})

export default global
