// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    getReactNativePersistence,
    initializeAuth
} from "firebase/auth/react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKWdwc3CdNuRaYgDpygI2Jj-0FQbzV9WI",
    authDomain: "expo-post-app.firebaseapp.com",
    databaseURL: "https://expo-post-app-default-rtdb.firebaseio.com",
    projectId: "expo-post-app",
    storageBucket: "expo-post-app.appspot.com",
    messagingSenderId: "585666076188",
    appId: "1:585666076188:web:2d11018cf35a20aaa3c9d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
