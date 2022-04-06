import React from 'react';
import GasolineSvg from '../../assets/gasoline.svg';

import {Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Periodo,
  Price,
  Type,
  CarImage,} from './styles';

interface CarData {
  brand: string,
  name: string,
  rent: {
    period: string,
    price: number,
  },
  thumbnail: string;
}

interface Props {
  data: CarData,
  onPress: () => {},
}

export function Car({ data, onPress, ...rest }: Props){
  return (
    <Container onPress={onPress} {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Periodo>{data.rent.period}</Periodo>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage source={{uri: data.thumbnail}} resizeMode="contain"/>
    </Container>
  );
}