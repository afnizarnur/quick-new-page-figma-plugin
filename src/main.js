import { showUI, once } from "@create-figma-plugin/utilities"

export default function () {
  function emojiRandom() {
    var emoji = ["✨", "🚀", "😘", "🥰", "😆", "😎", "⚡️"]
    return emoji[Math.floor(Math.random() * emoji.length)]
  }

  function handleSubmit(data) {
    if (data.pagelist != undefined) {
      const pageListData = data.pagelist.split(", ")

      if (pageListData != "") {
        pageListData.map((item) => {
          figma.createPage().name = item
        })
        figma.notify(emojiRandom() + "Page added!", { timeout: 2000 })
        figma.closePlugin()
      }
    } else {
      figma.closePlugin()
    }
  }

  once("SUBMIT", handleSubmit)

  showUI({ width: 381, height: 56 })
}
