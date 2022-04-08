import React, { useEffect, useState } from 'react';
import {useTheme} from 'styled-components';
import {Feather} from '@expo/vector-icons';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {getAccessoryIcons} from '../../utils/getAccessoryIcons';

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
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO,
  dates: string[],
}

interface RentalPeriod {
  start: string,
  end: string,
}

export function SchedullingDetails(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {car, dates} = route.params as Params;
  const rentTotal = Number(dates.length * car.rent.price);

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy')
    })
  },[])

  async function handleConfirm() {
    const schedelesConfirm = await api.get(`/schedules_bycars/${car.id}`);
    let date_unavialable = '';
    dates.some(date => {
      if(schedelesConfirm.data.unavailable_dates.includes(date)){
        date_unavialable = date
        return date
      }
    });

    if(date_unavialable){
      Alert.alert(`Date ${date_unavialable} is unavialable for schedule`)
    }else {
      const unavailable_dates = [
        ...schedelesConfirm.data.unavailable_dates,
        ...dates,
      ];
  
      api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailable_dates,
      })
        .then(() => navigation.navigate('SchedullingComplete'))
        .catch(() => Alert.alert('Unable to confirm schedule'))
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}/>
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcons(accessory.type)}/>
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape}/>
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text}/>
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RenatlPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RenatlPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button color={theme.colors.success} title='Alugar agora' onPress={() => handleConfirm()}/>
      </Footer>
    </Container>
  );
}