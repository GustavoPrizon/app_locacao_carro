import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import {CarDTO} from '../../dtos/CarDTO'
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFotterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles';
import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

interface CarProps {
  id: string,
  user_id: string,
  car: CarDTO,
  startDate: string,
  endDate: string,
}

export function Mycars(){
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function getMyCars() {
      try{
        const response = await api.get('/schedules_byuser?user_id=2');
        setCars(response.data);
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    getMyCars();
  },[])

  return (
    <Container>
       <StatusBar style='light' translucent />
      <Header>
      <BackButton color={theme.colors.shape} onPress={() => navigation.goBack()}/>
        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>
        <SubTitle>
          Conforte, segurança e praticidade.
        </SubTitle>
      </Header>

      {loading ? <Load/> : (
          <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFotterTitle>Período</CarFotterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name="arrowright" 
                      size={20} 
                      color={theme.colors.title}
                      style={{marginHorizontal: 10}}  
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}