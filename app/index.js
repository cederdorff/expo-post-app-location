import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase-config";

export default function AppRoot() {
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            console.log(user);
            if (user) {
                // User is signed in
                router.replace("/posts");
            } else {
                // User is signed out
                router.replace("/sign-in");
            }
        });
    }, []);
}
