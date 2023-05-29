import { Icon, keyframes } from '@chakra-ui/react'
import { FaSpinner } from 'react-icons/fa'

const spin = keyframes`
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg)}
}`
const spinAnimation = `${spin} infinite 1s linear`

export default function Spinner() {
  return (
    <Icon
      as={FaSpinner}
      color="#635FC7"
      width={10}
      height={10}
      animation={spinAnimation}
    />
  )
}
