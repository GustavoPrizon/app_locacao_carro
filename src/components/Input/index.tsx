import React from "react";
import {Feather} from '@expo/vector-icons';
import { useTheme } from "styled-components/native";

import { Container,IconContainer, InputText } from "./styles";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'],
}

export function Input({iconName, ...rest}: InputProps) {
  const theme = useTheme();
  return (
    <Container>
      <IconContainer style={{borderTopLeftRadius: 8, borderBottomLeftRadius: 8}}>
        <Feather name={iconName} size={24} color={theme.colors.text_detail}/>
      </IconContainer>
      <InputText style={{borderTopRightRadius: 8, borderBottomRightRadius: 8}} {...rest}/>
    </Container>
  );
}
