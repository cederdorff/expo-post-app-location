import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

export default function Map() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const API_URL =
        "https://expo-post-app-default-rtdb.firebaseio.com";

    useEffect(() => {
        getPosts();
    }, []);

    // Sometimes we want to run side-effects when a screen is focused.
    // https://reactnavigation.org/docs/use-focus-effect/
    useFocusEffect(
        // If you don't wrap your effect in React.useCallback, the effect will run every render if the screen is focused.
        useCallback(() => {
            getPosts();
        }, [])
    );

    async function getPosts() {
        const response = await fetch(`${API_URL}/posts.json`);
        const dataObj = await response.json();
        const postsArray = Object.keys(dataObj).map(key => ({
            id: key,
            ...dataObj[key]
        })); // from object to array
        postsArray.sort(
            (postA, postB) => postB.createdAt - postA.createdAt
        ); // sort by timestamp/ createdBy
        setPosts(postsArray);
    }

    function handleCalloutPress(id) {
        router.push(`map/${id}`);
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {posts.map(post => (
                    <Marker key={post.id} coordinate={post.location}>
                        <Callout
                            onPress={() =>
                                handleCalloutPress(post.id)
                            }>
                            <View style={styles.calloutView}>
                                <Text>{post.caption}</Text>
                                <Image
                                    source={{ uri: post.image }}
                                    style={styles.image}
                                />
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

// styling

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: "100%",
        height: "100%"
    },
    calloutView: {
        flex: 1
    },
    image: { height: 100, marginTop: 8 }
});
