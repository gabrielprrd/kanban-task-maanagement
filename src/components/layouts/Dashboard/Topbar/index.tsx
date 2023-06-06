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
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import AppLogo from '@/components/layouts/Dashboard/AppLogo'
import { FaEllipsisV, FaChevronDown } from 'react-icons/fa'
import { AddIcon } from '@chakra-ui/icons'
import MobileTopbarModal from '@/components/layouts/Dashboard/MobileTopbarModal'
import AvatarMenuButton from '@/components/AvatarMenuButton'
import {
  useBoardFormStore,
  useConfirmActionModalStore,
  useCurrentBoardStore,
  useCurrentTaskStore,
  useErrorToast,
  useTaskFormStore,
} from '@/hooks/index'
import { api } from '@/utils/index'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Topbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const utils = api.useContext()
  const { errorToast } = useErrorToast()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const setTask = useCurrentTaskStore(({ setTask }) => setTask)
  const openTaskForm = useTaskFormStore(({ openTaskForm }) => openTaskForm)
  const openEditBoardForm = useBoardFormStore(
    ({ openEditBoardForm }) => openEditBoardForm
  )
  const board = useCurrentBoardStore(({ board }) => board)
  const { refetch: refetchBoards } = api.board.getAll.useQuery(undefined, {
    enabled: !!session?.user?.email,
  })
  const { mutate: deleteBoard } = api.board.deleteById.useMutation({
    onSuccess: async () => {
      utils.board.invalidate()
      const { data: updatedBoardList } = await refetchBoards()
      const routeToRedirect = !!updatedBoardList?.length
        ? '/board/' + updatedBoardList[0].id
        : '/'
      router.push(routeToRedirect)
    },
    onError: () => errorToast(),
  })

  const {
    setConfirmBtnLabel,
    openConfirmActionModal,
    setTitle,
    setDescription,
    setConfirmCallback,
  } = useConfirmActionModalStore()

  function handleDeleteBoard() {
    setConfirmBtnLabel('Delete')
    setTitle('Delete this board?')
    setDescription(
      `Are you sure you want to delete the '${board?.name}' board? This action will remove all columns and tasks and cannot be reversed.`
    )
    setConfirmCallback(() => {
      if (board?.id) deleteBoard({ where: { id: board?.id } })
    })
    openConfirmActionModal()
  }

  function openNewTaskFormModal() {
    setTask(null)
    openTaskForm()
  }

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
          <Heading>{board?.name ?? ''}</Heading>
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
          {board && (
            <>
              <Tooltip
                hasArrow
                label="At least one column is required"
                isOpen={!board?.columns?.length}
                borderRadius="md"
              >
                <Button
                  variant="primary"
                  aria-label="Add new task"
                  gap={1}
                  onClick={openNewTaskFormModal}
                  isDisabled={!board?.columns?.length}
                >
                  <AddIcon boxSize={2} />
                  <Text display={{ base: 'none', sm: 'inline' }}>
                    Add New Task
                  </Text>
                </Button>
              </Tooltip>

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
                  <MenuItem color="#828FA3" onClick={openEditBoardForm}>
                    Edit Board
                  </MenuItem>
                  <MenuItem color="#EA5555" onClick={handleDeleteBoard}>
                    Delete Board
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
          {!!session?.user && <AvatarMenuButton />}
        </Flex>
      </HStack>
      <MobileTopbarModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
