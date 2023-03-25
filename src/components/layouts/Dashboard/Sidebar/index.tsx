import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import { FaEyeSlash } from 'react-icons/fa'
import Navbar from '../Navbar'
import ThemeSwitcher from '../ThemeSwitcher'

interface Props {
  toggleSidebarVisibility: () => void
}

export default function Sidebar({ toggleSidebarVisibility }: Props) {
  return (
    <Flex
      display={{ base: 'none', sm: 'flex' }}
      w="200px"
      h="100%"
      bgColor={useColorModeValue('#FFFFFF', '#2B2C37')}
      borderRight=".5px solid"
      borderColor="#828FA3"
      position={{ base: 'absolute', sm: 'relative' }}
      direction="column"
      justify="space-between"
    >
      <Navbar />
      <Flex direction="column" m={4} gap={1}>
        <ThemeSwitcher />
        <Button
          onClick={toggleSidebarVisibility}
          size="sm"
          borderLeftRadius={0}
          ml={-14}
          bgColor="transparent"
          color="#828FA3"
          _hover={{
            color: '#635FC7',
            bgColor: '#E4EBFA',
          }}
          leftIcon={<FaEyeSlash />}
        >
          Hide Sidebar
        </Button>
      </Flex>
    </Flex>
  )
}
