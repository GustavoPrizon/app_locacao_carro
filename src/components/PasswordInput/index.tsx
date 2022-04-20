import React, { useState } from "react";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components/native";

import { Container,IconContainer, InputText } from "./styles";
import { TextInputProps, TouchableOpacity } from "react-native";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'],
}

export function PasswordInput({iconName, ...rest}: InputProps) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handleChangePasswordVisible() {
    setIsPasswordVisible(prevState => !prevState)
  }

  return (
    <Container>
      <IconContainer style={{borderTopLeftRadius: 8, borderBottomLeftRadius: 8}}>
        <Feather name={iconName} size={24} color={theme.colors.text_detail}/>
      </IconContainer>
      <InputText secureTextEntry={isPasswordVisible} {...rest} />
      <TouchableOpacity onPress={() => handleChangePasswordVisible()}>
        <IconContainer style={{borderTopRightRadius: 8, borderBottomRightRadius: 8}}>
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'} 
            size={24} 
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </TouchableOpacity>
    </Container>
  );
}
