import React from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  load?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  load = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      onPress={onPress}
      color={color}
      enabled={enabled}
      style={{ opacity: enabled === false || load === true ? 0.5 : 1 }}
    >
      {load ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
