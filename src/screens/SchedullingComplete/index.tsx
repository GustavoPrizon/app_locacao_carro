import React from 'react';
import {useWindowDimensions} from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from  '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export function SchedullingComplete(){
  const {width} = useWindowDimensions();
  const navigation = useNavigation<any>();
  return (
    <Container>
      <StatusBar style="light" translucent/>
      <LogoSvg width={width}/>
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {`\n`}
          até a concessionária da RENTX {`\n`}
          pegar seu automóvel.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={() => navigation.navigate({name: 'Home'})}/>
      </Footer>
    </Container>
  );
}