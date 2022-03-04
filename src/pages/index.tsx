import * as React from "react"
import { Box, Button, Form, FormField, TextArea } from 'grommet';
// import { Home } from 'grommet-icons';
import styled from "styled-components";
import { objToString } from "../utils/objToString";

import Layout from "../components/layout";
import { RegExpFlags, flagOptions } from "../components/regexp_flags";
import { RegExpFunc, funcOptions } from "../components/regexp_func";
import { RegExpPattern } from "../components/regexp_pattern";



const AppForm = styled(Form)`
width: 100%; 
max-width: 640px;
`

const IndexPage = ({ location }: any) => {
  const [pattern, setPattern] = React.useState('');
  const [patternError, setPatternError] = React.useState(null);
  const [flags, setFlags] = React.useState([flagOptions[1].value]);
  const text = useFormInput('');
  const [func, setFunc] = React.useState(funcOptions[0]);
  const newSubstr = useFormInput('');
  const [disableNewSubstr, setDisableNewSubstr ] = React.useState(true);
  const warnings = useFormInput('');
  
  const result = useFormInput('');
  

  React.useEffect(() => {
    if (location && location.state && location.state.pattern) {
      setPattern(location.state.pattern);
    }
    if(location && location.state && location.state.flags) {
      const flagsArr = location.state.flags.split('');
      setFlags(flagsArr);
    }
  }, [location])
  

  async function onClickRun() {
    if ((func === 'matchAll' || func === 'replaceAll') && flags.indexOf('g') < 0) {
      warnings.setValue('The methods matchAll and replaceAll require the flag "g" is activated');
      setFlags(flags.concat([flagOptions[1].value]));
    } else {
      warnings.setValue('');
    }
    const flagsStr = flags.join('');
    let regex;
    try {
      regex = new RegExp(pattern, flagsStr);
      setPatternError(null);
    } catch( syntaxError: any) {
      setPatternError(syntaxError.toString());
      return;
    }

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

  function onChangeFunc({ option }: any) {
    setFunc(option);
    if (option === 'replace' || option === 'replaceAll') {
      setDisableNewSubstr(false);
    } else {
      setDisableNewSubstr(true);
    }
  }

  return (
    <Layout>
      <AppForm id="reg-exp-form">
        
        <RegExpPattern pattern={pattern} setPattern={setPattern} patternError={patternError} flags={flags} />

        <RegExpFlags flags={flags} setFlags={setFlags} />

        <RegExpFunc func={func} onChange={onChangeFunc} />

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
    </Layout>
  )
}

function useFormInput(initialValue: any) {
  const [value, setValue] = React.useState(initialValue);

  function handleChange(e: any): void {
    setValue(e.target.value);
  }

  return {
    value,
    setValue,
    onChange: handleChange
  };
}

export default IndexPage
