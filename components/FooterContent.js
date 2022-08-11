import { Text } from '@mantine/core';


function FooterContent({}) {
  return (<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <a href="https://github.com/TrinidadVargas">
      <Text align="center" component="span">
        By Trinidad Vargas
      </Text>
    </a>
  </div>);
}

export default FooterContent;