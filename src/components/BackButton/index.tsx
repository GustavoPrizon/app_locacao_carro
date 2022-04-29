import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { BorderlessButtonProps } from "react-native-gesture-handler";

import { Container } from "./styles";

interface Props {
  color?: string;
  onPress: () => {};
}

export function BackButton({ color, onPress, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container onPress={onPress} {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={30}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
