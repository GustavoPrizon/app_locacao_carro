import React from 'react';
import LottieView from 'lottie-react-native';
import CarLoad from '../../assets/car_load.json'
import {Container} from './styles';

export function LoadAnimation(){
  return (
    <Container>
      <LottieView 
        source={CarLoad}
        style={{width: 200}}
        resizeMode='contain'
        autoPlay
        loop
      />
    </Container>
  );
}