import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    Button,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from "react-native";

export default function Posts() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const API_URL = "https://expo-post-app-default-rtdb.firebaseio.com";

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
        postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
        setPosts(postsArray);
    }
    function showCreateModal() {
        router.push("/create");
    }
    function renderPost(item) {
        const post = item.item;
        return (
            <View style={styles.postContainer}>
                <Image style={styles.image} source={{ uri: post.image }} />
                <Text style={styles.caption}>{post.caption}</Text>
            </View>
        );
    }

    return (
        <View style={styles.list}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Button
                            title="Add New"
                            color={Platform.OS === "ios" ? "#fff" : "#264c59"}
                            onPress={() => router.push("/post-modal")}
                        />
                    )
                }}
            />

            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={post => post.id}
            />
        </View>
    );
}

// styling

const styles = StyleSheet.create({
    list: {
        flex: 1
    },
    postContainer: {
        flex: 1,
        minHeight: 320,
        paddingBottom: 30,
        borderBottomColor: "#acc6c9",
        borderBottomWidth: 0.5
    },
    caption: {
        fontSize: 22,
        padding: 15
    },
    image: {
        aspectRatio: 1,
        flex: 1
    }
});
