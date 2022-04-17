import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
  }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuário criado com sucesso"))
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            Alert.alert(
              "Este e-mail já está em uso. Escolhe outro e-mail para cadastrar"
            );
            break;
          case "auth/invalid-email":
            Alert.alert(
              "Este e-mail está inválido. Por favor escolha outro e-mail para cadastrar"
            );
            break;
          case "auth/weak-password":
            Alert.alert(
              "A senha deve ter no mínimo 6 digítos"
            );
            break;

          default:
            break;
        }
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button style={{ marginBottom: 8 }} title="Entrar" onPress={handleCreateUserAccount} />
      <Button
        style={{ backgroundColor: "orange" }}
        title="Entrar como anônimo"
        onPress={handleSignInAnonymously}
      />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
