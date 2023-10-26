import { Redirect } from "expo-router";
import { auth } from "../firebase-config";

export default function AppRoot() {
    return <Redirect href="/posts" />;
}
