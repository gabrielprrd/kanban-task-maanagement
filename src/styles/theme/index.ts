import { extendTheme } from "@chakra-ui/react"
import components from "./components"
import global from "./global"
import config from "./config"

const theme = extendTheme({
  config,
  global,
  components
})

export default theme
