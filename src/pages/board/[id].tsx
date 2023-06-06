import { TaskWithRelations } from '@/models/generated'
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
import {
  useBoardFormStore,
  useCurrentBoardStore,
  useCurrentTaskStore,
} from '@/hooks/index'
import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TaskDetailsModal from '@/components/TaskDetailsModal'
import { api, requireAuth } from '@/utils/index'
import Head from 'next/head'
import Spinner from '@/components/Spinner'
import DashboardLayout from '@/components/layouts/Dashboard'
import { useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

export default function BoardPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false)
  const setBoard = useCurrentBoardStore(({ setBoard }) => setBoard)
  const openEditBoardForm = useBoardFormStore(
    ({ openEditBoardForm }) => openEditBoardForm
  )
  const { task, setTask } = useCurrentTaskStore()
  const { data: board, isLoading } = api.board.getById.useQuery(
    {
      where: {
        id: router.query.id as string,
      },
    },
    {
      enabled: !!session?.user?.email,
    }
  )
  const taskNameColor = useColorModeValue('#000112', '#FFFFFF')
  const taskCardBgColor = useColorModeValue('#FFFFFF', '#2B2C37')
  const newColumnButtonBgColor = useColorModeValue('#E4EBFA', '#2B2C37')

  function handleOpenTaskDetails(task: TaskWithRelations) {
    setTask(task)
    setIsTaskDetailsOpen(true)
  }

  function handleOpenEditBoardForm() {
    // @ts-ignore
    setBoard(board ?? null)
    openEditBoardForm()
  }

  function getColumnBallColor(i: number) {
    const colors = ['#49C4E5', '#8471F2', '#67E2AE']
    return colors[i % colors.length]
  }

  function getSubtasksText(task: TaskWithRelations) {
    if (!task?.subtasks?.length) {
      return ''
    }
    const completedLength = task.subtasks.filter((sub) => sub.isComplete).length
    const totalLength = task.subtasks.length

    return `${completedLength} of ${totalLength}`
  }

  useEffect(() => {
    // @ts-ignore
    setBoard(board ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, isLoading])

  if (isLoading)
    return (
      <>
        <Head>
          <title>{'Loading | Kanban Web App'}</title>
          <meta name="description" content="Achieve your goals" />
        </Head>
        <Center h="100%" w="100%">
          <Spinner />
        </Center>
      </>
    )

  return (
    <>
      <Head>
        <title>{board?.name ?? 'Kanban Web App'}</title>
        <meta name="description" content="Achieve your goals" />
      </Head>
      {!board?.columns?.length ? (
        <Center h="100%" w="100%">
          <VStack gap={2}>
            <Text color="#828FA3" fontWeight="bold" textAlign="center">
              This board is empty. Create a new column to get started.
            </Text>
            <Button variant="primary" gap={1} onClick={handleOpenEditBoardForm}>
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
            {board?.columns.map((column, index) => (
              <Flex
                color="#828FA3"
                direction="column"
                gap={5}
                key={column.id + index + 'boardPageColumnId'}
                w="280px"
              >
                <HStack gap={1}>
                  <Box
                    h="10px"
                    w="10px"
                    bgColor={getColumnBallColor(index)}
                    borderRadius="100%"
                  />
                  <Text size="md" color="#828FA3" letterSpacing={2}>
                    {column.name.toUpperCase()} ({column.tasks?.length ?? 0})
                  </Text>
                </HStack>
                {column.tasks &&
                  column.tasks.length > 0 &&
                  column.tasks.map((task) => (
                    <Card
                      key={task.id}
                      px={3}
                      py={4}
                      bgColor={taskCardBgColor}
                      cursor="pointer"
                      role="group"
                      boxShadow="md"
                      // @ts-ignore
                      onClick={() => handleOpenTaskDetails(task)}
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
                          {/* @ts-ignore */}
                          {getSubtasksText(task)}
                        </Text>
                      </Flex>
                    </Card>
                  ))}
              </Flex>
            ))}
            <Button
              gap={1}
              w="280px"
              h="100%"
              bgColor={newColumnButtonBgColor}
              color="#828FA3"
              borderRadius="md"
              onClick={handleOpenEditBoardForm}
              _hover={{
                bgColor: newColumnButtonBgColor,
                color: '#635FC7',
              }}
            >
              <AddIcon boxSize={2} />
              <Text>New Column</Text>
            </Button>
          </Flex>
          {!!task && (
            <TaskDetailsModal
              isOpen={isTaskDetailsOpen}
              closeModal={() => setIsTaskDetailsOpen(false)}
            />
          )}
        </Flex>
      )}
    </>
  )
}

BoardPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return requireAuth(ctx, (session) => ({ props: { session } }))
}
