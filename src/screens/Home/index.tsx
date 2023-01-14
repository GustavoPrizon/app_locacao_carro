import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";

import { database } from "../../database";
import { api } from "../../services/api";

import Logo from "../../assets/logo.svg";
import { CarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";

import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";
import { Car } from "../../components/Car";
import { Car as ModelCar } from "../../database/model/Car";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const netInfo = useNetInfo();
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("/users/sync", user);
      },
    });
  }

  useEffect(() => {
    let isMount = true;
    async function getCard() {
      try {
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch();
        if (isMount) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMount) {
          setLoading(false);
        }
      }
    }
    getCard();
    return () => {
      isMount = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar style="light" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car
              elevation={8}
              data={item}
              onPress={() => navigation.navigate("CarDetails", { car: item })}
            />
          )}
        />
      )}
    </Container>
  );
}
