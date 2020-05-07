import {
  render,
  Container,
  Button,
  Textbox,
  useForm,
} from "@create-figma-plugin/ui"
import styles from "./styles.scss"
import { Fragment, h } from "preact"
import { useState } from "preact/hooks"
import { emit, on } from "@create-figma-plugin/utilities"
import { useEffect } from "preact/hooks"

export default render(Plugin)

function Plugin(initialState) {
  const { state, handleChange, handleSubmit } = useForm(initialState, {
    onSubmit: function () {
      emit("SUBMIT", {
        pagelist: state.pagelist,
      })
    },
    onClose: function () {
      emit("CLOSE_UI")
    },
  })
  useEffect(
    function () {
      return on("SELECTION_CHANGED", function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )

  return (
    <Fragment>
      <Container space="medium">
        <div class={styles.container}>
          <div class={styles.inputwrap}>
            <Textbox
              placeholder="Enter list of pages, separated by comma"
              noBorder
              name="pagelist"
              value={state.pagelist}
              onChange={handleChange}
              style={styles.biginput}
              focused
            />
          </div>
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </Container>
    </Fragment>
  )
}
