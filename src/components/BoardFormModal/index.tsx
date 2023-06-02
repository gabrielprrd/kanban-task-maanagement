import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  useColorModeValue,
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react'
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
import { BoardFormValidation, ColumnType } from '@/models/index'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import {
  useBoardFormStore,
  useCurrentBoardStore,
  useErrorToast,
} from '@/hooks/index'
import { api } from '@/utils/index'
import { useRouter } from 'next/router'
import FieldArrayErrorMessage from '@/components/Form/FieldArrayErrorMessage'
import { useRef } from 'react'

interface FormValues {
  name: string
  columns: ColumnType[]
}

export default function BoardFormModal() {
  const formRef = useRef<FormikProps<FormValues>>(null)
  const router = useRouter()
  const utils = api.useContext()
  const { errorToast } = useErrorToast()
  const { board: currentBoard, setBoard: setCurrentBoard } =
    useCurrentBoardStore()
  const { isBoardFormOpen, closeBoardForm, formMode } = useBoardFormStore()
  const {
    mutateAsync: createOrUpdateBoard,
    isLoading,
    isSuccess,
  } = api.board.createOrUpdate.useMutation({
    onSuccess: async (data) => {
      utils.board.invalidate()
      setCurrentBoard(data)
      formRef.current?.resetForm()
      closeBoardForm()
      if (isSuccess) router.push('/board/' + data.id)
    },
    onError: () => errorToast(),
  })

  const board = formMode === 'create' ? null : currentBoard
  const formTitle = formMode === 'create' ? 'Add New Board' : 'Edit Board'
  const submitButtonText =
    formMode === 'create' ? 'Create New Board' : 'Save Changes'

  const initialValues = {
    name: board?.name ?? '',
    columns: board?.columns ?? [],
  }

  return (
    <Modal
      isOpen={isBoardFormOpen}
      onClose={closeBoardForm}
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
            validationSchema={toFormikValidationSchema(BoardFormValidation)}
            innerRef={formRef}
            onSubmit={async (values) => {
              const formattedColumns = values.columns.map((col, index) => ({
                ...col,
                order: index,
                tasks: undefined,
              }))

              await createOrUpdateBoard({
                ...values,
                id: board?.id ?? undefined,
                columns: formattedColumns,
              })
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form autoComplete="off">
                <Flex direction="column" gap={2}>
                  <Flex direction="column" gap={5}>
                    <Field name="name" id="name">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isInvalid={!!form.errors.name && !!form.touched.name}
                        >
                          <FormLabel
                            htmlFor="name"
                            color="#828FA3"
                            fontSize="small"
                          >
                            Name
                          </FormLabel>
                          <Input {...field} focusBorderColor="#635FC7" />
                          <FormErrorMessage>
                            {form.errors.description as string}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex direction="column" gap={1}>
                      <FormLabel
                        htmlFor="columns"
                        color="#828FA3"
                        fontSize="small"
                      >
                        Columns
                      </FormLabel>
                      <FieldArray name="columns">
                        {({ push, remove }) => (
                          <Flex flexDirection="column" gap={2}>
                            {values.columns.map((col, index) => (
                              <Flex
                                gap={2}
                                key={
                                  'boardFormModalFieldArrayKey' + col.id + index
                                }
                              >
                                <Field
                                  width="100%"
                                  name={`columns[${index}].name`}
                                  focusBorderColor="#635FC7"
                                  value={col.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {({ field, form }: FieldProps) => (
                                    <FormControl
                                      isInvalid={
                                        !!form.errors.columns?.length &&
                                        !!form.errors.columns?.[index]
                                      }
                                    >
                                      <Flex direction="column">
                                        <Flex>
                                          <Input
                                            {...field}
                                            focusBorderColor="#635FC7"
                                            id={col.id}
                                          />
                                          <IconButton
                                            bgColor="transparent"
                                            _hover={{ bgColor: 'transparent' }}
                                            aria-label="Delete column"
                                            icon={<IconCross color="#828FA3" />}
                                            onClick={() => remove(index)}
                                          />
                                        </Flex>

                                        <FieldArrayErrorMessage
                                          name={`columns[${index}].name`}
                                        />
                                      </Flex>
                                    </FormControl>
                                  )}
                                </Field>
                              </Flex>
                            ))}
                            <Button
                              variant="secondary"
                              gap={1}
                              isDisabled={isLoading}
                              onClick={() => push({ name: '' })}
                            >
                              <AddIcon boxSize={2} />
                              <Text>Add New Column</Text>
                            </Button>
                          </Flex>
                        )}
                      </FieldArray>
                    </Flex>
                  </Flex>
                  <Button
                    variant="primary"
                    width="100%"
                    type="submit"
                    isDisabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : submitButtonText}
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
