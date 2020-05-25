import { showUI, once, pluralize } from "@create-figma-plugin/utilities"

export default function () {
  function emojiRandom() {
    var emoji = ["✨", "🚀", "😘", "🥰", "😆", "😎", "⚡️"]
    return emoji[Math.floor(Math.random() * emoji.length)]
  }

  function handleSubmit(data) {
    if (data.pagelist != undefined) {
      const pageListData = data.pagelist.split(new RegExp("[,]{1}[\\s]?", "g"))

      if (pageListData != "") {
        const word = pluralize(pageListData.length, "Page")

        pageListData.map((item) => {
          figma.createPage().name = item
        })

        figma.notify(emojiRandom() + word + " added!", { timeout: 2000 })
        figma.closePlugin()
      }
    } else {
      figma.closePlugin()
    }
  }

  once("SUBMIT", handleSubmit)

  showUI({ width: 381, height: 56 })
}
