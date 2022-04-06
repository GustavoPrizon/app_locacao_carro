import React from 'react';

import {Container, Title} from './styles';

interface Props{
  title: string,
  onPress: () => {},
}

export function ConfirmButton({title, onPress, ...rest}: Props){
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}