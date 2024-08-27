import { showUI, once, pluralize } from "@create-figma-plugin/utilities"

export default function () {
  function handleSubmit(data: any) {
    if (data.pagelist != undefined) {
      const pageListData = data.pagelist.split(new RegExp("[,]{1}[\\s]?", "g"))

      if (pageListData != "") {
        const word = pluralize(pageListData.length, "Page")

        pageListData.map((item: any) => {
          figma.createPage().name = item
        })

        figma.notify(word + " added!", { timeout: 2000 })
        figma.closePlugin()
      }
    } else {
      figma.closePlugin()
    }
  }

  once("SUBMIT", handleSubmit)

  showUI({ width: 450, height: 56 })
}
