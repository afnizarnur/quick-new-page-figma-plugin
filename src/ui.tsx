import {
  render,
  Container,
  Button,
  Textbox,
  useInitialFocus,
} from "@create-figma-plugin/ui"
import { emit } from "@create-figma-plugin/utilities"
import { Fragment, h } from "preact"
import { useState } from "preact/hooks"
import styles from "./styles.css"

export default render(Plugin)

function placeholderRandom() {
  const content = [
    "Enter list of pages, separated by comma",
    "Example: Final-v1, Final-v2, Final-Final-v2",
  ]
  return content[Math.floor(Math.random() * content.length)]
}

function Plugin() {
  const [pageList, setPageList] = useState("")

  const handleSubmit = () => {
    if (pageList.trim() !== "") {
      emit("SUBMIT", { pagelist: pageList })
    }
  }

  const handleChange = (event: h.JSX.TargetedEvent<HTMLInputElement>) => {
    setPageList(event.currentTarget.value)
  }

  const handleKeyDown = (
    event: h.JSX.TargetedKeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Fragment>
      <Container space="medium">
        <div class={styles.container}>
          <div class={styles.inputwrap}>
            <input
              name="pagelist"
              value={pageList}
              onChange={handleChange}
              onKeyUp={handleKeyDown}
              {...useInitialFocus()}
              placeholder={placeholderRandom()}
              spellCheck
            />
          </div>
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </Container>
    </Fragment>
  )
}
