import { showUI } from "@create-figma-plugin/utilities"

export default function () {
  const options = { width: 381, height: 56 }
  const data = { greeting: "Hello, World!" }
  showUI(options, data)
}
