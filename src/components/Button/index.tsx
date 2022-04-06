import React from 'react';

import {Container, Title} from './styles';

interface Props {
  title: string,
  color?: string,
  onPress: () => {},
}

export function Button({title, color, onPress, ...rest}: Props){
  return (
    <Container {...rest} onPress={onPress} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}