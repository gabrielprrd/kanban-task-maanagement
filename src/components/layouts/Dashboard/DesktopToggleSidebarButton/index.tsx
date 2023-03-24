import { IconButton } from '@chakra-ui/react'
import { FaEye } from 'react-icons/fa'

interface Props {
  toggleSidebarVisibility: () => void
  isSidebarHidden: boolean
}

export default function DesktopToggleSidebarButton({
  toggleSidebarVisibility,
  isSidebarHidden,
}: Props) {
  return (
    <IconButton
      onClick={toggleSidebarVisibility}
      aria-label="Open sidebar"
      borderLeftRadius={0}
      borderRightRadius={100}
      bgColor="#635FC7"
      transform={isSidebarHidden ? 'translate(-15px)' : 'translate(-100%)'}
      _hover={{
        bgColor: '#635FC7',
        transform: 'translate(0px)',
      }}
      zIndex={999}
      icon={<FaEye size={20} />}
      pos="absolute"
      left={0}
      w={75}
      h={12}
      bottom={10}
      cursor="pointer"
    />
  )
}
