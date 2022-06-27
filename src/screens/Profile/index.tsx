import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  ContentHeader,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import { PasswordInput } from "../../components/PasswordInput";

export function Profile() {
  const { user, SignOut } = useAuth();
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.drive_license);
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    SignOut();
  }

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected);
  }

  async function handlePhotoChange() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Não foi possível acessar sua galeria");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (pickerResult.cancelled) {
      return;
    }
    setAvatar(pickerResult.uri);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar style="light" translucent />
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handlePhotoChange}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <ContentHeader>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar Senha
                </OptionTitle>
              </Option>
            </ContentHeader>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={name}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  defaultValue={driverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCapitalize="none"
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Nova Senha"
                  autoCapitalize="none"
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir senha"
                  autoCapitalize="none"
                />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
