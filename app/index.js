import { useRouter } from "expo-router";
import "../firebase-config";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default function AppRoot() {
    const router = useRouter();
    const auth = getAuth();

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
}
