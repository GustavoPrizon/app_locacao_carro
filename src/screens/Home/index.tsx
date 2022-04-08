import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {RFValue} from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import {api} from "../../services/api";
import {CarDTO} from '../../dtos/CarDTO';
import {Load} from '../../components/Load';

import {Container, Header, HeaderContent, TotalCars, CarList} from './styles';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';

export function Home(){
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCard() {
      try{
        const response = await api.get("/cars")
        setCars(response.data)
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false);
      }
    }
    getCard();
  },[])

  return (
    <Container>
      <StatusBar style='light' translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)}/>
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      {loading ? <Load /> : 
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <Car data={item} onPress={() => navigation.navigate('CarDetails', {car: item})}/>
          }
        />
      }
    </Container>
  );
}