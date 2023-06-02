import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/react'
import { FaSignOutAlt } from 'react-icons/fa'

export default function AvatarMenuButton() {
  const { data: session } = useSession()

  function handleSignOut() {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <Menu>
      <MenuButton
        as={Avatar}
        aria-label="Open user settings"
        name={session?.user.name || "User's avatar"}
        src={session?.user.image}
        _hover={{ cursor: 'pointer' }}
      />
      <MenuList boxShadow="none" border="none">
        <MenuItem color="#828FA3" onClick={handleSignOut}>
          <HStack>
            <Text>Sign out</Text>
            <FaSignOutAlt />
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
