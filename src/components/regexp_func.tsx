import * as React from "react"
import { FormField, Select } from 'grommet';

export const funcOptions = [
  'exec',
  'test',
  'match',
  'matchAll',
  'search',
  'replace',
  'replaceAll',
  'split'
];

export function RegExpFunc(props) {

  return (
    <FormField
      label="REGEXP OR STRING METHOD"
      htmlFor="reg-exp-func"
      info="RegExp or String method to be runned"
    >
      <Select
        id="reg-exp-func"
        options={funcOptions}
        value={props.func}
        onChange={props.onChange}
      />
    </FormField>
  )
}