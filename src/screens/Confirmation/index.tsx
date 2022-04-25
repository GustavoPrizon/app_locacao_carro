import React from "react";
import { useWindowDimensions } from "react-native";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params {
  title: string;
  message: string;
  nextScreen: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const routes = useRoute();

  const { title, message, nextScreen } = routes.params as Params;

  function handleConfirm() {
    navigation.navigate(nextScreen);
  }

  return (
    <Container>
      <StatusBar style="light" translucent />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
