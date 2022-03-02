import * as React from "react";
import { Box, Button, FormField, Grid, Heading, Layer, Text, TextInput } from 'grommet';
import { navigate } from "gatsby"
import { addRegExp } from "../utils/storage";

export interface PatternProps {
  pattern: string;
  flags: Array<string>;
  patternError: string | null;
  setPattern: (value: string) => void;
}

export function RegExpPattern (props: PatternProps) {

  const [ showLayer, setShowLayer ] = React.useState(false);

  async function onClickSave() {
    await addRegExp(props.pattern, props.flags);
    setShowLayer(true);
  }

  return (
    <Grid
      columns={["large", "xsmall", "xsmall"]}
      gap="large"
    >
      <FormField
        id="reg-exp-pattern-formfield"
        label="REGULAR EXPRESSION PATTERN:"
        htmlFor="reg-exp-id"
        info="The pattern used as an argument in the RegExp constructor"
        error={props.patternError}
      >
        <TextInput
          id="reg-exp-pattern"
          name="pattern"
          value={props.pattern}
          onChange={(event: any) => props.setPattern(event.target.value)}
          placeholder="Regular expression pattern"
        />
      </FormField>

      <Box
        align="center"
        alignSelf="center"
      >
        <Button
          label="Save"
          onClick={onClickSave}
        />

      </Box>

      <Box
        align="center"
        alignSelf="center"
      >
        <Button
          label="History"
          onClick={() => navigate("/reg_exp_history")}
        />
      </Box>

      {showLayer && (
        <Layer
          onEsc={() => setShowLayer(false)}
          onClickOutside={() => setShowLayer(false)}
        >
          <Box direction="column" pad="large">
            <Heading level="3">Regular expression saved</Heading>
            <Text>Your regular expresion has been saved.</Text>
            <Text>Click History button to get the saved regular expressions</Text>
            <Button label="close" onClick={() => setShowLayer(false)} />
          </Box>
        </Layer>
      )}
    </Grid>
  );
}