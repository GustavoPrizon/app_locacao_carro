import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {Container, Header, CarImages} from './styles';

export function CarDetails(){
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={['https://img1.gratispng.com/20180928/pka/kisspng-2-18-audi-s5-3-t-premium-plus-coupe-car-dealershi-audi-s5-2-18-view-specs-prices-photos-more-5bae7df7d53507.4261876315381621678733.jpg',]}/>
      </CarImages>
    </Container>
  );
}