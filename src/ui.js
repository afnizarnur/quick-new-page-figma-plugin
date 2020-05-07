import {
  render,
  Container,
  Text,
  Button,
  Textbox,
} from "@create-figma-plugin/ui"
import styles from "./styles.scss"
import { h } from "preact"
import { useState } from "preact/hooks"

export default render(Plugin)

function Plugin(props) {
  const [state, setState] = useState({ foo: "" })

  return (
    <Container space="medium">
      <div class={styles.container}>
        <div class={styles.inputwrap}>
          <Textbox
            placeholder="Enter list of pages, separated by comma"
            noBorder
            name="foo"
            value={state.foo}
            onChange={setState}
            style={styles.biginput}
            autoFocus
          />
        </div>
        <Button>Add</Button>
      </div>
    </Container>
  )
}
