import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";
import { api } from "../../../services/api";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    cnh: string;
  };
}

export function SignUpSecondStep() {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const theme = useTheme();
  const route = useRoute();
  const [load, setLoad] = useState(false);

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    setLoad(true);
    if (!password || !confirmPassword) {
      return Alert.alert("Opss!", "Preencha a senha ou confirme a senha");
    }
    if (password != confirmPassword) {
      return Alert.alert("Opss!", "As senhas não são iguais");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.cnh,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreen: "SignIn",
          title: "Conta criada!",
          message: `Agora é só fazer login \ne aproveitar`,
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Opss!", "Ocorreu um erro ao criar sua conta");
      })
      .finally(() => setLoad(false));
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>Crie sua {`\n`} conta</Title>
          <SubTitle>
            Faça seu cadastro de {`\n`} de forma rápida e fácil
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
            load={load}
            enabled={!load}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
