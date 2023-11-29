import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#264c59"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                },
                tabBarStyle: {
                    backgroundColor: "#264c59"
                }
            }}>
            <Tabs.Screen
                name="posts"
                options={{
                    title: "Posts",
                    tabBarActiveTintColor: "#264c59",
                    tabBarInactiveTintColor: "#fff",
                    tabBarActiveBackgroundColor: "#acc6c9",
                    tabBarIcon: () => (
                        <Ionicons
                            name="home"
                            size={24}
                            color="white"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="users"
                options={{
                    title: "Users",
                    headerShown: false,
                    tabBarActiveTintColor: "#264c59",
                    tabBarInactiveTintColor: "#fff",
                    tabBarActiveBackgroundColor: "#acc6c9",
                    tabBarIcon: () => (
                        <Ionicons
                            name="people"
                            size={24}
                            color="white"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: "Map",
                    tabBarActiveTintColor: "#264c59",
                    tabBarInactiveTintColor: "#fff",
                    tabBarActiveBackgroundColor: "#acc6c9",
                    tabBarIcon: () => (
                        <Ionicons
                            name="map"
                            size={24}
                            color="white"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="user-profile"
                options={{
                    title: "User Profile",
                    tabBarActiveTintColor: "#264c59",
                    tabBarInactiveTintColor: "#fff",
                    tabBarActiveBackgroundColor: "#acc6c9",
                    tabBarIcon: () => (
                        <Ionicons
                            name="person"
                            size={24}
                            color="white"
                        />
                    )
                }}
            />
        </Tabs>
    );
}
