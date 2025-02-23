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
        let successCount = 0
        let failedDueToLimit = false

        for (const item of pageListData) {
          try {
            const pageName = item.trim()
            if (pageName) {
              figma.createPage().name = pageName
              successCount++
            }
          } catch (error) {
            if (
              error.message.includes(
                "The Starter plan only comes with 3 pages. Upgrade to Professional for unlimited pages"
              )
            ) {
              failedDueToLimit = true
              break
            }
          }
        }

        if (failedDueToLimit) {
          figma.notify(
            "Figma Starter plan is limited to 3 pages max. Try move it to draft or upgrade to Professional for unlimited pages.",
            {
              timeout: 4500,
            }
          )
        } else if (successCount > 0) {
          figma.notify(
            emojiRandom() + pluralize(successCount, " Page") + " added!",
            { timeout: 2000 }
          )
        }

        figma.closePlugin()
      }
    } else {
      figma.closePlugin()
    }
  }

  once("SUBMIT", handleSubmit)

  showUI({ width: 381, height: 56 })
}
