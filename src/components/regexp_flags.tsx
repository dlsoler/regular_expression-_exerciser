import * as React from "react"
import { CheckBoxGroup, FormField } from 'grommet';

export const flagOptions = [
  { label: "d: Generate indices for substring matches.", value: "d" },
  { label: "g: Global search.", value: "g" },
  { label: "i: Case-insensitive search.", value: "i" },
  { label: "m: Multi-line search.", value: "m" },
  { label: "s: Allows . to match newline characters.", value: "s" },
  { label: "u: \"unicode\"; treat a pattern as a sequence of unicode code points.", value: "u" },
  { label: "y: Perform a \"sticky\" search that matches starting at the current position in the target string.", value: "y" }
]

export function RegExpFlags (props) {

  return (
    <FormField
      label="FLAGS"
      htmlFor="reg-exp-flags"
      info="The flags uses as argument in RegExp constructor"
    >
      <CheckBoxGroup
        id="reg-exp-flags"
        labelKey="label"
        valueKey="value"
        options={flagOptions}
        value={props.flags}
        onChange={({option, value }) => props.setFlags(value)}
      />
    </FormField>
  )
}