import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons'
import {RFValue} from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import {api} from "../../services/api";
import {CarDTO} from '../../dtos/CarDTO';
import {LoadAnimation} from '../../components/LoadAnimation';

import {Container, Header, HeaderContent, TotalCars, CarList} from './styles';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, BackHandler} from 'react-native';

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export function Home(){
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true);
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const theme = useTheme();

  const myCardButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value},
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });
 

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  },[])

  return (
    <Container>
      <StatusBar style='light' translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)}/>
          {!loading && (
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          )}
        </HeaderContent>
      </Header>
      {loading ? <LoadAnimation /> : 
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <Car elevation={8} data={item} onPress={() => navigation.navigate('CarDetails', {car: item})}/>
          }
        />
      }
      <PanGestureHandler onGestureEvent={() => onGestureEvent}>
        <Animated.View
          style={[
            myCardButtonStyle, {
              position: 'absolute',
              bottom: 20,
              right: 20,
            }
          ]}
        >
          <ButtonAnimated 
            style={[styles.button, {backgroundColor: theme.colors.main}]} 
            onPress={() => navigation.navigate('MyCars')}
          >
            <Ionicons size={32} name="ios-car-sport" color={theme.colors.shape}/>
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  }
})