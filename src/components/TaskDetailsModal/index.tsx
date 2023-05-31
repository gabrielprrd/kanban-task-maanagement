import {
  useConfirmActionModalStore,
  useCurrentBoardStore,
  useCurrentTaskStore,
  useErrorToast,
  useTaskFormStore,
} from '@/hooks/index'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Flex,
  IconButton,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  FormLabel,
  Stack,
  Checkbox,
} from '@chakra-ui/react'
import { FaEllipsisV } from 'react-icons/fa'
import { Form, Formik, Field, FieldArray } from 'formik'
import { api } from '@/utils/index'
import AutoSave from '@/components/Form/AutoSave'

interface Props {
  isOpen: boolean
  closeModal: () => void
}

export default function TaskDetailsModal({ isOpen, closeModal }: Props) {
  const utils = api.useContext()
  const { errorToast } = useErrorToast()
  const {
    setConfirmBtnLabel,
    openConfirmActionModal,
    setTitle,
    setDescription,
    setConfirmCallback,
  } = useConfirmActionModalStore()
  const board = useCurrentBoardStore(({ board }) => board)
  const { openEditTaskForm } = useTaskFormStore()
  const { task, setTask } = useCurrentTaskStore()
  const { mutateAsync: deleteTask } = api.task.deleteById.useMutation({
    onSuccess: () => {
      closeModal()
      utils.board.getById.invalidate()
    },
    onError: () => errorToast(),
  })
  const { mutateAsync: createOrUpdateTask } =
    api.task.createOrUpdate.useMutation({
      onSuccess: async () => {
        utils.board.getById.invalidate()
      },
      onError: () => errorToast(),
    })

  const checkboxBgColor = useColorModeValue('#F4F7FD', '#20212C')
  const checkboxTextColor = useColorModeValue('#000112', '#FFFFFF')
  const checkboxHoverColor = useColorModeValue('#E4EBFA', '#635FC7')

  const subtasksLength = task?.subtasks?.length
  const completedSubtasksLength = task?.subtasks?.filter(
    (sub) => sub.isComplete
  ).length

  function handleDeleteTask() {
    setConfirmBtnLabel('Delete')
    setTitle('Delete this task?')
    setDescription(
      `Are you sure you want to delete the '${task?.title}' task? This action will remove all columns and tasks and cannot be reversed.`
    )
    setConfirmCallback(() => {
      if (task?.id) deleteTask(task?.id)
    })
    openConfirmActionModal()
  }

  function handleOpenEditTaskForm() {
    setTask(task)
    openEditTaskForm()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      isCentered
      size={{ base: 'sm', sm: 'lg' }}
    >
      {' '}
      <ModalOverlay />
      <ModalContent bgColor={useColorModeValue('#FFFFFF', '#2B2C37')}>
        <Flex direction="column" gap={5} p={6}>
          <Flex justify="space-between">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={useColorModeValue('#000112', '#FFFFFF')}
            >
              {task?.title}
            </Text>
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
                <MenuItem color="#828FA3" onClick={handleOpenEditTaskForm}>
                  Edit Task
                </MenuItem>
                <MenuItem color="#EA5555" onClick={handleDeleteTask}>
                  Delete Task
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          {!!task?.description && (
            <Text color="#828FA3" fontSize="sm">
              {task?.description}
            </Text>
          )}
          <Formik
            initialValues={{
              subtasks: task?.subtasks,
              column: task?.column.id,
            }}
            enableReinitialize
            onSubmit={async (values) => {
              const subtasksWithUpdatedOrder = values.subtasks?.map(
                (sub, index) => ({
                  ...sub,
                  order: index,
                })
              )

              await createOrUpdateTask({
                ...task,
                ...values,
                id: task?.id ?? undefined,
                order: task?.order ?? task?.column.tasks?.length ?? 0,
                subtasks: subtasksWithUpdatedOrder,
              })
            }}
          >
            {({ values }) => (
              <Form>
                <AutoSave debounceMs={300} />
                <Flex direction="column" gap={5}>
                  {!!task?.subtasks && (
                    <Flex direction="column" gap={1}>
                      <FormLabel
                        htmlFor="subtasks"
                        color="#828FA3"
                        fontSize="small"
                      >
                        Subtasks {completedSubtasksLength} of {subtasksLength}
                      </FormLabel>
                      <FieldArray name="subtasks">
                        {({ replace }) => (
                          <Stack>
                            {values.subtasks?.map((sub, index) => (
                              <Field
                                as={Checkbox}
                                type="checkbox"
                                id={sub.id}
                                key={
                                  'taskDetailsModalSubtasksOptions' +
                                  sub.id +
                                  index
                                }
                                bgColor={checkboxBgColor}
                                p={2}
                                borderRadius="md"
                                colorScheme="purple"
                                isChecked={sub.isComplete}
                                _hover={{
                                  bgColor: sub.isComplete
                                    ? checkboxBgColor
                                    : checkboxHoverColor,
                                }}
                                onChange={() => {
                                  replace(index, {
                                    ...sub,
                                    isComplete: !sub.isComplete,
                                  })
                                }}
                              >
                                <Text
                                  fontSize="sm"
                                  fontWeight="bold"
                                  textDecor={
                                    sub.isComplete ? 'line-through' : 'none'
                                  }
                                  color={
                                    sub.isComplete
                                      ? '#828FA3'
                                      : checkboxTextColor
                                  }
                                >
                                  {sub.title}
                                </Text>
                              </Field>
                            ))}
                          </Stack>
                        )}
                      </FieldArray>
                    </Flex>
                  )}
                  <Flex direction="column" gap={1}>
                    <FormLabel
                      htmlFor="column"
                      color="#828FA3"
                      fontSize="small"
                    >
                      Current column
                    </FormLabel>
                    <Field
                      as={Select}
                      name="column"
                      id="column"
                      focusBorderColor="#635FC7"
                    >
                      {board?.columns?.map((col, index) => (
                        <option
                          value={col.id}
                          key={'taskDetailsModalColumnsKey' + col.id + index}
                        >
                          {col.name}
                        </option>
                      ))}
                    </Field>
                  </Flex>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
