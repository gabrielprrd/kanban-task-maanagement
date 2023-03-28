import { IBoard } from '@/models/board'
import { Flex, Text, Link, Button } from '@chakra-ui/react'
import useSWR from 'swr'
import IconBoard from '@/public/icons/icon-board.svg'
import { AddIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { getBoards, boardsEndpoint as cacheKey } from '@/services/api'

export default function Navbar() {
  const { data, error, isLoading } = useSWR(cacheKey, getBoards)
  const router = useRouter()

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  function displayBoardForm() {
    // TODO: create Board Form
  }

  return (
    <Flex direction="column" px={2}>
      <Text p={3} size="md" color="#828FA3" letterSpacing={1}>
        ALL BOARDS ({data.boards.length})
      </Text>
      {data.boards.map((board: IBoard) => (
        <Link
          as={NextLink}
          color={board.slug === router.query.slug ? '#FFFFFF' : '#828FA3'}
          key={board.slug}
          borderRightRadius={100}
          p={2}
          ml={-2}
          href={'/board/' + board.slug}
          bgColor={board.slug === router.query.slug ? '#635FC7' : 'transparent'}
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
          onClick={displayBoardForm}
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
