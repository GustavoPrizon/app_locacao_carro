import React from 'react';
import {useTheme} from 'styled-components';
import {Feather} from '@expo/vector-icons';
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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RenatlPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';

export function SchedullingDetails(){
  const theme = useTheme();
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape}/>
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text}/>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RenatlPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RenatlPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button color={theme.colors.success} title='Alugar agora'/>
      </Footer>
    </Container>
  );
}