import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExChangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import {Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export function CarDetails(){
  const navigation = useNavigation<any>();
  return (
    <Container>
      <StatusBar style='dark' translucent />
      <Header>
        <BackButton onPress={() => navigation.goBack()}/>
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={['https://img1.gratispng.com/20180928/pka/kisspng-2-18-audi-s5-3-t-premium-plus-coupe-car-dealershi-audi-s5-2-18-view-specs-prices-photos-more-5bae7df7d53507.4261876315381621678733.jpg',]}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>RS 5 Coupe</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 120</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="3.2s" icon={AccelerationSvg}/>
          <Accessory name="800 HP" icon={ForceSvg}/>
          <Accessory name="Gasoline" icon={GasolineSvg}/>
          <Accessory name="Auto" icon={ExChangeSvg}/>
          <Accessory name="2 pessoas" icon={PeopleSvg}/>
        </Accessories>

        <About>
          Este é automóvel desportivo. 
          Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>
      <Footer>
        <Button title='Escolher perriodo do aluguel' onPress={() => navigation.navigate({name: 'Schedulling'})}/>
      </Footer>
    </Container>
  );
}