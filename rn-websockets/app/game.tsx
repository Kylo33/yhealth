import Modal from "@/components/Modal";
import { useEffect, useRef, useState, useContext } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import ModalText from "@/components/ModalText";
import ChartCard from "@/components/ChartCard";
import Bird, { BirdHandle } from "@/components/Bird";
import Button from "@/components/Button";
import Groq from "groq-sdk";
import { Stack } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { Audio } from "expo-av";
import ChoiceBox from "@/components/ChoiceBox";
import { UserContext } from "@/context/UserContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";

const SERVER_IP = "ws://192.168.36.32:8000/";
const MAX_DISTANCE = 100;
type DataPoint = {
  depth: number;
  date: Date;
};

export default function CPRPracticeGame() {
  const { users } = useContext(UserContext);
  const { currentUser } = useContext(CurrentUserContext);

  const [dataPoints, setDataPoints] = useState<DataPoint[]>(() =>
    Array.from({ length: 100 }, () => ({
      date: new Date(),
      depth: 0,
    }))
  );
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [endModalVisible, setEndModalVisible] = useState<boolean>(false);
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [time, setTime] = useState<number>(60);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const bird = useRef<BirdHandle>(null);
  const [frequencyData, setFrequencyData] = useState<number[]>([]);

  useEffect(() => {
    const ws = new WebSocket(SERVER_IP);
    setWebsocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (!websocket) return;

    const handleMessage = (event: MessageEvent) => {
      const depth = Math.min(100, Number(event.data));
      setDataPoints((prev) => {
        // Keep only last 100 points to prevent memory issues
        const frequency =
          time != 60 ? (isPeak ? peakCount + 1 : peakCount) / (60 - time) : 0;
        const newPoints = [...prev, { depth, date: new Date(), frequency }];
        return newPoints.slice(-100);
      });
    };

    websocket.addEventListener("message", handleMessage);
    return () => websocket.removeEventListener("message", handleMessage);
  }, [websocket]);

  useEffect(() => {
    if (!modalVisible) {
      setTime(60);
    }
  }, [modalVisible]);

  const giveAdvice = async () => {
    const groq = new Groq({ apiKey: process.env.EXPO_PUBLIC_GROQ_API_KEY });
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `The following are the user's 30 most recent compression depths. Each data point is spaced 200ms apart: [${dataPoints
            .reverse()
            .slice(0, 30)
            .map((data) => data.depth)
            .join(
              ", "
            )}] Give one sentence of either thoughtful advice or praise. Be nice, but succinct.`,
        },
      ],
      model: "llama-3.1-8b-instant",
    });
    const message: string | null = response.choices[0].message.content;
    if (message) {
      bird.current?.send(message);
    }
  };

  function countCompressions(): number {
    return 5; // replace this with code to measure the frequency from the depth data.
  }

  useEffect(() => {
    if (time > 0) {
      if (time == 40 || time == 20) {
        giveAdvice();
      }
      if (!modalVisible && !endModalVisible) {
        const timeout = setTimeout(() => {
          setTime(time - 1);
          setFrequencyData([...frequencyData, countCompressions() / (60 - time + 1)])
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      setEndModalVisible(true);
    }
  }, [time, modalVisible]);

  const dismissModal = () => {
    setModalVisible(false);
  };

  const dismissEndModal = () => {
    setEndModalVisible(false);
  };

  useEffect(() => {
    const playMusic = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/music/stayin_alive.mp3")
      );
      setSound(sound);
    };

    playMusic();
  }, [sound]);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    sound?.playAsync();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPressOut={toggleMusic} style={{ padding: 16 }}>
              <Feather
                name={musicPlaying ? "volume-2" : "volume-x"}
                color="#fff"
                size={24}
              />
            </Pressable>
          ),
        }}
      />
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.statsCard}>
            <View style={styles.stat}>
              <Text style={styles.number}>82</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={styles.number}>{time}</Text>
              <Text style={styles.statLabel}>Seconds</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={styles.number}>
                {dataPoints[dataPoints.length - 1].frequency}
              </Text>
              <Text style={styles.statLabel}>Frequency</Text>
            </View>
          </View>
          <ChartCard
            data={dataPoints.map((point) => ({
              value: MAX_DISTANCE - point.depth,
            }))}
            title="Compression Depth"
          />
          <ChartCard
            data={dataPoints.map((point) => ({ value: point.depth }))}
            title="Compression Depth"
          />
        </ScrollView>
        <Modal
          visible={modalVisible}
          title="CPR Practice Game"
          onSubmit={dismissModal}
          buttonText="Begin"
        >
          <View style={styles.modalTextContainer}>
            <ModalText>
              Welcome! Now that you have gone through the training material, you
              are ready to practice CPR with your simulation device.
            </ModalText>
            <ModalText>
              When you are ready, press begin. You will have 60 seconds, and you
              will be scored based on the accuracy of your CPR.
            </ModalText>
            <ModalText>Choose an opponent below:</ModalText>
            <ChoiceBox
              placeholder="Select an Opponent"
              items={users
                .filter((user) => user.name !== currentUser)
                .map((user) => ({
                  label: user.name,
                  value: user.name,
                }))}
            />
          </View>
        </Modal>
        <Modal
          visible={endModalVisible}
          title="Time's Up!"
          onSubmit={dismissEndModal}
          buttonText="Begin"
        >
          <View style={styles.modalTextContainer}>
            <ModalText>Please hand your device to your opponent.</ModalText>
            <ModalText>
              When you are ready, press begin to start your turn.
            </ModalText>
          </View>
        </Modal>
        <Bird ref={bird} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#1e2021",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#313435",
    borderRadius: 16,
    padding: 16,
  },
  stat: {
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: "#ef8228",
    fontSize: 32,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#85858588",
  },
  divider: {
    width: 1,
    backgroundColor: "#85858588",
  },
  modalTextContainer: {
    gap: 2,
  },
});
