import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import AppLogo from '../AppLogo'
import { FaEllipsisV, FaChevronDown } from 'react-icons/fa'
import { AddIcon } from '@chakra-ui/icons'
import MobileTopbarModal from '../MobileTopbarModal'

export default function Topbar() {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <HStack
        h="100%"
        borderBottom=".5px solid"
        borderColor="#828FA3"
        bgColor={useColorModeValue('#FFFFFF', '#2B2C37')}
        p={3}
        justify="space-between"
      >
        <Flex gap={{ base: 2, sm: 10 }} align="center">
          <AppLogo />
          <Heading>Platform Launch</Heading>
          <IconButton
            aria-label="Show navbar"
            display={{ sm: 'none' }}
            bgColor="transparent"
            _hover={{ bgColor: 'transparent' }}
            icon={<FaChevronDown color="#828FA3" />}
            onClick={onOpen}
          />
        </Flex>
        <Flex gap={1} align="center">
          <Button variant="primary" gap={1}>
            <AddIcon boxSize={2} />
            <Text display={{ base: 'none', sm: 'inline' }}>Add New Task</Text>
          </Button>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisV />}
              bgColor="transparent"
              aria-label="Board options"
              color="#828FA3"
              _hover={{ bgColor: 'transparent' }}
              _expanded={{ bgColor: 'transparent' }}
            >
              Actions
            </MenuButton>
            <MenuList boxShadow="none" border="none">
              <MenuItem color="#828FA3">Edit Board</MenuItem>
              <MenuItem color="#EA5555">Delete Board</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
      <MobileTopbarModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
