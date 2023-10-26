import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Stack, useRouter } from "expo-router";

export default function SignIn() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const auth = getAuth();

    function handleSignIn() {
        signInWithEmailAndPassword(auth, mail, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                router.replace("/posts");
            })
            .catch(error => {
                let errorMessage = error.code.split("/")[1];
                errorMessage = errorMessage.replaceAll("-", " ");
                setMessage(errorMessage);
            });
    }

    function goToSignUp() {
        router.push("/sign-up");
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Sign In",
                    headerTintColor: "#fff",
                    headerStyle: {
                        backgroundColor: "#264c59"
                    }
                }}
            />
            <Text style={styles.label}>Mail</Text>
            <TextInput
                style={styles.input}
                onChangeText={setMail}
                value={mail}
                placeholder="Type your mail"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="Type your password"
            />
            <Button title="Sign In" color="#264c59" onPress={handleSignIn} />
            <Button
                title="Create new account"
                color="#264c59"
                onPress={goToSignUp}
            />
            <Text style={styles.errorMessage}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#acc6c9"
    },
    main: {
        flex: 1
    },
    image: {
        aspectRatio: 1
    },
    label: {
        fontSize: 25,
        color: "#264c59",
        marginTop: 30,
        marginBottom: 5
    },
    input: {
        height: 50,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginVertical: 20
    },
    errorMessage: {
        color: "red",
        textAlign: "center",
        marginTop: 10
    }
});
