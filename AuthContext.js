import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth  } from "./src/config/firebase"
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const userData = await AsyncStorage.setItem(
            'userData',
            JSON.stringify(user),
          );r
          setUser(user);
        } else {
          await AsyncStorage.removeItem('userData');
          setUser(null);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribeAuth;
  }, []);

  const login = async (email, password) => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const userData = JSON.stringify(response.user);
      await AsyncStorage.setItem('userData', userData);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
