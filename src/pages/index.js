import * as React from "react"
import { Box, Button, CheckBoxGroup, Form, FormField, Grommet, Header, Heading, Select, Text, TextArea, TextInput } from 'grommet';
// import { Home } from 'grommet-icons';
import styled from "styled-components";

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
    colors: {
      brand: '#002f8e'
    }
  },
};


const AppForm = styled(Form)`
width: 100%;
max-width: 640px;
`

const flagOptions = [
  "d: Generate indices for substring matches.",
  "g: Global search.",
  "i: Case-insensitive search.",
  "m: Multi-line search.",
  "s: Allows . to match newline characters.",
  "u: \"unicode\"; treat a pattern as a sequence of unicode code points.",
  "y: Perform a \"sticky\" search that matches starting at the current position in the target string."
]

const funcOptions = [
  'exec',
  'test',
  'match',
  'matchAll',
  'search',
  'replace',
  'replaceAll',
  'split'
];

function objToString(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  const keys = Object.keys(obj);
  let res = '{';
  keys.forEach((key) => {
    if (typeof obj[key] !== obj) {
      res += `\n    ${key}: ${JSON.stringify(obj[key])}`;
    } else {
      res += `\n${objToString(obj[key])}`;
    }
  });
  res += '\n}\n';
  return res;
}

const IndexPage = () => {
  const pattern = useFormInput('');
  const [flags, setFlags] = React.useState([flagOptions[1]]);
  const text = useFormInput('');
  const [func, setFunc] = React.useState('exec');
  const newSubstr = useFormInput('');
  const [disableNewSubstr, setDisableNewSubstr ] = React.useState(true);
  const warnings = useFormInput('');
  
  const result = useFormInput('');
  

  function onClickRun() {
    const chars = flags.map((item) => item.charAt(0));

    if ((func === 'matchAll' || func === 'replaceAll') && chars.indexOf('g') < 0) {
      warnings.setValue('The methods matchAll and replaceAll require the flag "g" is activated');
      setFlags(flags.concat([flagOptions[1]]));
      chars.push('g');
    } else {
      warnings.setValue('');
    }
    const flagsStr = chars.join('');
    const regex = new RegExp(pattern.value, flagsStr);

    let res;
    switch(func) {
      case 'exec':
      case 'test':
        res = regex[func](text.value);
        break;
      case 'match':
      case 'search':
      case 'split':
        res = text.value[func](regex);
        break;
      case 'matchAll':
        res = Array.from(text.value[func](regex));
        break;
      case 'replace':
      case 'replaceAll':
        res = text.value[func](regex, newSubstr.value);
        break;
      default:
        throw new Error('Something was absolutely wrong!');
    }
    const resStr = objToString(res);
    result.setValue(resStr);
  }

  function onChangeFunc(option) {
    setFunc(option);
    if (option === 'replace' || option === 'replaceAll') {
      setDisableNewSubstr(false);
    } else {
      setDisableNewSubstr(true);
    }
  }

  return (
    <Grommet theme={theme}>
      <main >
        <Header background="brand">
          <Heading alignSelf="start" level="2" margin="small">Javascript Regular Expression Exerciser</Heading>
        </Header>
        <Box
          tag="div"
          direction="column"
          align="center"
          justify="between"
          background="light-2" 
          pad={{ vertical: 'small', horizontal: 'medium' }}
          elevation="medium"
        >
          <AppForm id="reg-exp-form">
            
            <FormField
              label="Regular expression:"
              htmlFor="reg-exp-id"
            >
              <TextInput
                id="reg-exp-pattern"
                name="pattern"
                {...pattern}
                placeholder="Regular expression pattern"
              />
            </FormField>

            <FormField label="Flags" htmlFor="reg-exp-flags">
              <CheckBoxGroup
                id="reg-exp-flags"
                options={flagOptions}
                value={flags}
                onChange={event => setFlags(event.value)}
              />
            </FormField>

            <FormField label="RegEx Method" htmlFor="reg-exp-func">
              <Select
                options={funcOptions}
                value={func}
                onChange={({ option }) => onChangeFunc(option)}
              />
            </FormField>

            <FormField label="Text" htmlFor="text">
              <TextArea
                id="text"
                {...text}
                placeholder="Text to search into"
              />
            </FormField>

            <FormField label="New substring for replacement" htmlFor="newSubstr">
              <TextArea
                id="newSubstr"
                {...newSubstr}
                placeholder="New Substring"
                disabled={disableNewSubstr}
              />
            </FormField>

            <FormField label="Warnings" htmlFor="warnings">
              <TextArea
                id="warnings"
                {...warnings}
                disabled
              />
            </FormField>

            <FormField label="Result" htmlFor="text">
              <TextArea
                id="result"
                {...result}
                placeholder="Result"
              />
            </FormField>
            <Box
              direction="row"
              gap="medium"
              justify="center"
              pad={{ vertical: 'large', horizontal: 'small'}}
            >
              <Button primary label="Run" onClick={() => onClickRun()}/>
            </Box>
          </AppForm>
        </Box>
        <Box
          tag="footer"
          direction="row"
          align="center"
          alignSelf="center"
          pad={{ vertical: 'large', horizontal: 'medium' }}
          elevation="medium"
        >
          <Text>Powered by <a href="https://reactjs.org/" title="React">React</a>, <a href="https://www.gatsbyjs.com/" title="Gatsby">Gatsby</a> and <a href="https://grommet.io" title="Grommet">Grommet</a></Text>
        </Box>
      </main>
    </Grommet>
  )
}

function useFormInput(initialValue) {
  const [value, setValue] = React.useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    setValue,
    onChange: handleChange
  };
}

export default IndexPage
