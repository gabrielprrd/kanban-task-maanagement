import { useConfirmActionModalStore } from '@/hooks/index'
import {
  Flex,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  ModalHeader,
  ModalFooter,
} from '@chakra-ui/react'

export default function ConfirmActionModal() {
  const {
    isConfirmActionModalOpen,
    closeConfirmActionModal,
    title,
    description,
    confirmBtnLabel,
    confirmCallback,
  } = useConfirmActionModalStore()

  function handleConfirm() {
    confirmCallback()
    closeConfirmActionModal()
  }

  return (
    <Modal
      isOpen={isConfirmActionModalOpen}
      onClose={closeConfirmActionModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={useColorModeValue('#FFFFFF', '#2B2C37')}>
        <ModalHeader>
          <Text color="#EA5555">{title}</Text>
        </ModalHeader>
        <ModalBody borderRadius="md">
          <Flex width="100%" direction="column">
            <Text color="#828FA3" fontSize="sm">
              {description}
            </Text>
            <ModalFooter>
              <Flex
                direction={{ base: 'column', sm: 'row' }}
                justify="space-between"
                gap={4}
                width="100%"
              >
                <Button
                  variant="destructive"
                  size="sm"
                  width="100%"
                  onClick={handleConfirm}
                >
                  {confirmBtnLabel || 'Confirm'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  width="100%"
                  onClick={closeConfirmActionModal}
                >
                  Cancel
                </Button>
              </Flex>
            </ModalFooter>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
