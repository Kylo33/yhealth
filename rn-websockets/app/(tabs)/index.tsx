import { Image, StyleSheet, Platform, FlatList } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { CameraView } from "expo-camera";

export default function HomeScreen() {
  const [messages, setMessages] = useState<string[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket>();

  useEffect(() => {
    setWebsocket(new WebSocket("ws://192.168.36.32:8000/"));
  }, []);

  useEffect(() => {
    const updateMessages = (event: MessageEvent) =>
      setMessages([...messages, event.data]);

    websocket?.addEventListener("message", updateMessages);
    return () => websocket?.removeEventListener("message", updateMessages);
  }, [websocket, messages]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<CameraView />}
    >
      <ThemedView style={styles.titleContainer}>
        <CameraView style={{ height: 300 }} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Arduino Messages</ThemedText>
        <ThemedView style={{ gap: 4 }}>
          {messages.map((value: string, index: number) => (
            <ThemedText key={index}>{value}</ThemedText>
          ))}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
