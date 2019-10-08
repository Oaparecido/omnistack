import React, { useState, useEffect } from "react";

import socketio from 'socket.io-client';
import {
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

import SpotList from "../components/SpotList";

import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.222.227:3333', {
        query: { user_id }
    })

    socket.on('booking_response', booking => {
      Alert. alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'} `)
    })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  async function handleCancel() {
    await AsyncStorage.setItem('user', '');

    navigation.navigate('Login');
}

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.cancelButton]}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10,
    height:42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
});
