import {
  Box,
  Flex,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Navbar from '../Navbar'
import ThemeSwitcher from '../ThemeSwitcher'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function MobileTopbarModal({ isOpen, onClose }: Props) {
  const router = useRouter()

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalBody
          bgColor={useColorModeValue('#FFFFFF', '#2B2C37')}
          borderRadius="md"
          p={0}
        >
          <Flex direction="column">
            <Box mr={8}>
              <Navbar />
            </Box>
            <Box m={4}>
              <ThemeSwitcher />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
