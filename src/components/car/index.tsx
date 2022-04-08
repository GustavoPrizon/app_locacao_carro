import React from 'react';
import GasolineSvg from '../../assets/gasoline.svg';
import {CarDTO} from '../../dtos/CarDTO';
import { getAccessoryIcons } from '../../utils/getAccessoryIcons';

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

interface Props {
  data: CarDTO,
  onPress: () => {},
}

export function Car({ data, onPress, ...rest }: Props){
  const MotorIcon = getAccessoryIcons(data.fuel_type);

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
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{uri: data.thumbnail}} resizeMode="contain"/>
    </Container>
  );
}