import { useSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Post() {
    const { id } = useSearchParams();
    console.log(id);

    return <View style={styles.container}></View>;
}

// styling

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: "100%",
        height: "100%"
    }
});
