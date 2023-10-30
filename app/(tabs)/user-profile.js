import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, View, Text } from "react-native";
import { getAuth, signOut } from "firebase/auth";

export default function UserProfile() {
    const router = useRouter();
    const [mail, setMail] = useState([]);
    const auth = getAuth();

    useEffect(() => {
        console.log(auth.currentUser.email);
        setMail(auth.currentUser.email);
    }, []);

    async function handleSignOut() {
        await signOut(auth);
        router.replace("/sign-in");
    }

    return (
        <View style={styles.list}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Button
                            title="Sign Out"
                            color={Platform.OS === "ios" ? "#fff" : "#264c59"}
                            onPress={handleSignOut}
                        />
                    )
                }}
            />
            <View>
                <Text>{mail}</Text>
                <Button title="Sign Out" color="#264c59" onPress={handleSignOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});
