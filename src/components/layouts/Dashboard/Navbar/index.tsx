import { Flex, Text, Link, Button } from '@chakra-ui/react'
import IconBoard from '@/public/icons/icon-board.svg'
import { AddIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { api } from '@/utils/index'
import { useBoardFormStore } from '@/hooks/index'

export default function Navbar() {
  const { data, error, isLoading } = api.board.getAll.useQuery()
  const router = useRouter()
  const openCreateBoardForm = useBoardFormStore(
    ({ openCreateBoardForm }) => openCreateBoardForm
  )

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <Flex direction="column" px={2}>
      <Text p={3} size="md" color="#828FA3" letterSpacing={1}>
        {'All boards'.toUpperCase()} ({data.boards && data.boards.length})
      </Text>
      {data.boards &&
        data.boards.map((board) => (
          <Link
            as={NextLink}
            color={board.id === router.query.id ? '#FFFFFF' : '#828FA3'}
            key={board.id}
            borderRightRadius={100}
            p={2}
            ml={-2}
            href={'/board/' + board.id}
            bgColor={board.id === router.query.id ? '#635FC7' : 'transparent'}
            fontWeight="bold"
            fontSize="sm"
            _hover={{
              textDecoration: 'none',
              color: '#635FC7',
              bgColor: '#E4EBFA',
            }}
          >
            <Flex alignItems="center" gap={3} ml={3}>
              <IconBoard />
              {board.name}
            </Flex>
          </Link>
        ))}
      <Flex align="center" gap={3} ml={-1}>
        <Button
          size="md"
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          color="#635FC7"
          onClick={openCreateBoardForm}
        >
          <Flex align="center" gap={2.5}>
            <IconBoard />
            <Flex align="center" gap={0.5}>
              <AddIcon boxSize={2} />{' '}
              <Text size="lg" fontWeight="bold">
                Create New Board
              </Text>
            </Flex>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
