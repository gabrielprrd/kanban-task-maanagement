import { IBoard } from '@/models/board'
import { getBoards, getBoard } from '@/services/index'
import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

interface Props {
  board: IBoard
}

export default function Post({ board }: Props) {
  const taskNameColor = useColorModeValue('#000112', '#FFFFFF')
  const taskCardBgColor = useColorModeValue('#FFFFFF', '#2B2C37')
  const newColumnButtonBgColor = useColorModeValue('#E4EBFA', '#20212C')

  const columnBallsColors = ['#49C4E5', '#8471F2', '#67E2AE']

  function openNewColumnForm() {
    // TODO: create column form
  }

  function openTaskForm() {
    // TODO: create task form
  }

  return (
    <>
      {!board.slug ? (
        <Center h="100%" w="100%">
          <VStack gap={4}>
            <Text color="#828FA3" fontWeight="bold">
              This board is empty. Create a new column to get started.
            </Text>
            <Button variant="primary" gap={1}>
              <AddIcon boxSize={2} />
              <Text display={{ base: 'none', sm: 'inline' }}>
                Add New Column
              </Text>
            </Button>
          </VStack>
        </Center>
      ) : (
        <Flex pos="relative" h="100%">
          <Flex
            p={5}
            gap={5}
            pos="absolute"
            h="90vh"
            w="auto"
            overflow="hidden"
          >
            {board.columns.map((column, index) => (
              <Flex
                color="#828FA3"
                direction="column"
                gap={5}
                key={column.name}
                w="280px"
              >
                <HStack gap={1}>
                  <Box
                    h="10px"
                    w="10px"
                    bgColor={columnBallsColors[index]}
                    borderRadius="100%"
                  />
                  <Text size="md" color="#828FA3" letterSpacing={2}>
                    {column.name.toUpperCase()} ({column.tasks.length})
                  </Text>
                </HStack>
                <Flex direction="column" gap={5} overflowY="auto">
                  {column.tasks.length > 0 &&
                    column.tasks.map((task) => (
                      <Card
                        key={task.title}
                        px={3}
                        py={4}
                        bgColor={taskCardBgColor}
                        cursor="pointer"
                        role="group"
                        boxShadow="md"
                        onClick={openTaskForm}
                      >
                        <Flex direction="column" gap={1}>
                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color={taskNameColor}
                            _groupHover={{
                              color: '#635FC7',
                            }}
                          >
                            {task.title}
                          </Text>
                          <Text fontSize="xs" fontWeight="bold" color="#828FA3">
                            {
                              (task.subtasks?.filter((sub) => sub.isCompleted))
                                .length
                            }{' '}
                            of {task.subtasks?.length} subtasks
                          </Text>
                        </Flex>
                      </Card>
                    ))}
                </Flex>
              </Flex>
            ))}
            <Button
              gap={1}
              w="280px"
              h="100%"
              bgColor={newColumnButtonBgColor}
              color="#828FA3"
              borderRadius="md"
              onClick={openNewColumnForm}
              _hover={{
                bgColor: newColumnButtonBgColor,
                color: '#635FC7',
              }}
            >
              <AddIcon boxSize={2} />
              <Text>New Column</Text>
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const res = await getBoards()

  const paths = res.boards.map((board: IBoard) => ({
    params: { slug: board.slug },
  }))
  return {
    paths,
    fallback: false,
  }
}

interface StaticProps {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: StaticProps) {
  const board = await getBoard(params.slug)

  return {
    props: { board },
  }
}
