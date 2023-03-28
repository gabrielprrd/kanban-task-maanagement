import { get } from "@/config/index"

export const boardsEndpoint = '/boards'

export async function getBoards() {
  const response = await get(boardsEndpoint)
  return response.data
}

export async function getBoard(slug: string) {
  const response = await get(boardsEndpoint + "/" + slug)
  return response.data
}
