import { Heading, Text, VStack } from '@chakra-ui/react'
import ScrumBoardSvg from '@/public/scrum-board.svg'

export default function Welcome() {
  return (
    <VStack h="100%" w="100%" justifyContent="center" p={2} textAlign="center">
      <ScrumBoardSvg />
      <Heading>Welcome to Kanban Web App!</Heading>
      <Text>Select or create a board to start managing your goals</Text>
    </VStack>
  )
}
