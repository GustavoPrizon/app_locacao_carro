import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from 'styled-components';
import {Button} from '../../components/Button';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Footer
} from './styles';

export function Signin(){
  const theme = useTheme();

  return (
    <Container>
      <StatusBar style='dark' translucent/>
      <Header>
        <Title>
          Estamos {`\n`}
          quase lá.
        </Title>
        <SubTitle>
          Faça seu login para começar {`\n`}
          uma experiência incrível.
        </SubTitle>
      </Header>
      <Footer>
        <Button 
          title='Login'
          onPress={() => {}} 
          enabled={false} 
          load={false}
        />
        <Button 
          title='Criar conta gratuita'
          onPress={() => {}} 
          enabled={true} 
          load={false}
          color={theme.colors.background_secondary}
          light
        />
      </Footer>
    </Container>
  );
}