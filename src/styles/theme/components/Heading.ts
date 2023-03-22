import { ComponentStyleConfig } from "@chakra-ui/react"

const Heading: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
  },
  sizes: {
    xl: {
      fontSize: '24px',
      lineHeight: '30px'
    },
    lg: {
      fontSize: '18px',
      lineHeight: '23px'
    },
    md: {
      fontSize: '15px',
      lineHeight: '19px'
    },
    sm: {
      fontSize: '12px',
      lineHeight: '15px',
      fontKerning: '2.4px'
    }
  }
}

export default Heading
