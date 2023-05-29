import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalContent,
  ModalOverlay,
  Button,
  Text,
  Input,
  Flex,
  Textarea,
  IconButton,
  Select,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  useCurrentTaskStore,
  useCurrentBoardStore,
  useTaskFormStore,
  useErrorToast,
} from '@/hooks/index'
import {
  Formik,
  Form,
  FieldArray,
  Field,
  FieldProps,
  FormikProps,
} from 'formik'
import { AddIcon } from '@chakra-ui/icons'
import IconCross from '@/public/icons/icon-cross.svg'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import FieldArrayErrorMessage from '@/components/Form/FieldArrayErrorMessage'
import { SubtaskType, TaskFormValidation } from '@/models/index'
import { api } from '@/utils/index'
import { useEffect, useRef } from 'react'

interface FormValues {
  title: string
  description: string
  subtasks:
    | SubtaskType[]
    | {
        title: string
        isComplete: boolean
      }[]
  column: string | null | undefined
}

export default function TaskFormModal() {
  const formRef = useRef<FormikProps<FormValues>>(null)
  const utils = api.useContext()
  const { errorToast } = useErrorToast()
  const { isTaskFormOpen, closeTaskForm, formMode } = useTaskFormStore()
  const { task: currentTask, setTask: setCurrentTask } = useCurrentTaskStore()
  const board = useCurrentBoardStore(({ board }) => board)
  const { mutateAsync: createOrUpdateTask, isLoading } =
    api.task.createOrUpdate.useMutation({
      onSuccess: (data) => {
        console.log(data)
        utils.board.getById.invalidate()
        utils.board.invalidate()
        setCurrentTask(data)
        formRef.current?.resetForm()
        closeTaskForm()
      },
      onError: () => errorToast(),
    })

  const task = formMode === 'create' ? null : currentTask
  const formTitle = formMode === 'create' ? 'Add New Task' : 'Edit Task'
  const submitButtonText =
    formMode === 'create' ? 'Create Task' : 'Save Changes'

  function getSubtaskInputPlaceholder(i: number) {
    const placeholders = ['e.g. Make coffee', 'e.g Drink coffee & smile']
    return placeholders[i % placeholders.length]
  }

  const initialSubtaskValue = { title: '', isComplete: false }

  const initialValues = {
    title: task?.title ?? '',
    description: task?.description ?? '',
    subtasks: task?.subtasks ?? [
      { ...initialSubtaskValue },
      { ...initialSubtaskValue },
    ],
    column:
      task?.column.id ?? board?.columns?.length > 0
        ? board?.columns[0].id
        : null,
  }

  useEffect(() => {
    console.log('TASK: ', currentTask)
  }, [currentTask])

  return (
    <Modal
      isOpen={isTaskFormOpen}
      onClose={closeTaskForm}
      size={{ base: 'sm', sm: 'lg' }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <Flex direction="column" gap={5} p={6}>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue('#000112', '#FFFFFF')}
          >
            {formTitle}
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(TaskFormValidation)}
            onSubmit={async (values) => {
              const subtasksWithUpdatedOrder = values.subtasks.map(
                (sub, index) => ({
                  ...sub,
                  order: index,
                })
              )

              await createOrUpdateTask({
                ...values,
                id: task?.id ?? undefined,
                order: task?.order ?? task?.column.tasks?.length ?? 0,
                subtasks: subtasksWithUpdatedOrder,
              })
            }}
          >
            {({ values, errors, handleChange, handleBlur }) => (
              <Form autoComplete="off">
                <Flex direction="column" gap={5}>
                  <Field name="title" id="title">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={!!form.errors.title && !!form.touched.title}
                      >
                        <FormLabel
                          htmlFor="title"
                          color="#828FA3"
                          fontSize="small"
                        >
                          Title
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="e.g Take coffee break"
                          focusBorderColor="#635FC7"
                        />
                        <FormErrorMessage>
                          {form.errors.title as string}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description" id="description">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.description &&
                          !!form.touched.description
                        }
                      >
                        <FormLabel
                          htmlFor="description"
                          color="#828FA3"
                          fontSize="small"
                        >
                          Description
                        </FormLabel>
                        <Textarea
                          {...field}
                          focusBorderColor="#635FC7"
                          placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little"
                        />
                        <FormErrorMessage>
                          {form.errors.description as string}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Flex direction="column" gap={1}>
                    <FormLabel
                      htmlFor="subtasks"
                      color="#828FA3"
                      fontSize="small"
                    >
                      Subtasks
                    </FormLabel>
                    <FieldArray name="subtasks">
                      {({ push, remove }) => (
                        <Flex flexDirection="column" gap={2}>
                          {values.subtasks &&
                            values.subtasks.map((sub, index) => (
                              <FormControl
                                key={
                                  'boardFormModalFieldArrayKey' + sub + index
                                }
                                isInvalid={
                                  !!errors.subtasks && !!errors.subtasks[index]
                                }
                              >
                                <Flex gap={2} w="100%">
                                  <Flex direction="column" w="100%">
                                    <Field
                                      as={Input}
                                      name={`subtasks[${index}].title`}
                                      id={sub.title + index}
                                      focusBorderColor="#635FC7"
                                      value={sub.title}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder={getSubtaskInputPlaceholder(
                                        index
                                      )}
                                    />
                                    <FieldArrayErrorMessage
                                      name={`subtasks[${index}].title`}
                                    />
                                  </Flex>

                                  <IconButton
                                    bgColor="transparent"
                                    _hover={{ bgColor: 'transparent' }}
                                    aria-label="Delete subtask"
                                    icon={<IconCross color="#828FA3" />}
                                    onClick={() => remove(index)}
                                  />
                                </Flex>
                              </FormControl>
                            ))}
                          <Button
                            variant="secondary"
                            gap={1}
                            isDisabled={isLoading}
                            onClick={() => push({ ...initialSubtaskValue })}
                          >
                            <AddIcon boxSize={2} />
                            <Text>Add New Subtask</Text>
                          </Button>
                        </Flex>
                      )}
                    </FieldArray>
                  </Flex>

                  {board?.columns && (
                    <>
                      <Flex direction="column" gap={1}>
                        <FormLabel
                          htmlFor="column"
                          color="#828FA3"
                          fontSize="small"
                        >
                          Status
                        </FormLabel>
                        <Field
                          as={Select}
                          name="column"
                          focusBorderColor="#635FC7"
                        >
                          {board?.columns.map((col, index) => (
                            <option
                              value={col.id}
                              key={'taskFormModalColumnsKey' + col.id + index}
                            >
                              {col.name}
                            </option>
                          ))}
                        </Field>
                      </Flex>
                      <Button
                        variant="primary"
                        width="100%"
                        type="submit"
                        isDisabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : submitButtonText}
                      </Button>
                    </>
                  )}
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
