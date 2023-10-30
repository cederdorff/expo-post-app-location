import { Stack, useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UserProfile() {
    const auth = getAuth();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [mail, setMail] = useState("");
    const [image, setImage] = useState("");
    const router = useRouter();

    useEffect(() => {
        console.log(auth.currentUser.email);
        setMail(auth.currentUser.email);
    }, []);

    async function handleSignOut() {
        await signOut(auth);
        router.replace("/sign-in");
    }

    async function chooseImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            quality: 0.3
        });

        if (!result.canceled) {
            const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
            setImage(base64);
        }
    }

    return (
        <ScrollView style={styles.container}>
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
                <TouchableOpacity onPress={chooseImage}>
                    <Image
                        style={styles.image}
                        source={{
                            uri:
                                image ||
                                "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Type your mail"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Mail</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setMail}
                    value={mail}
                    placeholder="Type your mail"
                    autoCapitalize="none"
                    editable={false}
                />
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Type your mail"
                    autoCapitalize="none"
                />

                <Button title="Save" color="#264c59" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#acc6c9"
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
    image: {
        aspectRatio: 1
    }
});
