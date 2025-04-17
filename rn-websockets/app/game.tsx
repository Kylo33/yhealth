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
import { UserContext, User } from "@/context/UserContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";

const SERVER_IP = "ws://192.168.36.32:8000/";
const MAX_DISTANCE = 100;
type DataPoint = {
  depth: number;
  date: Date;
};

export default function CPRPracticeGame() {
  const { users, setUsers } = useContext(UserContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedOpponent, setSelectedOpponent] = useState<string>("");
  const [players, setPlayers] = useState<{name: string, score: number}[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");

  const [dataPoints, setDataPoints] = useState<DataPoint[]>(() =>
    Array.from({ length: 100 }, () => ({
      date: new Date(),
      depth: 0,
    }))
  );
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [time, setTime] = useState<number>(60);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const bird = useRef<BirdHandle>(null);
  const [frequencyData, setFrequencyData] = useState<number[]>([0]);
  const [points, setPoints] = useState<number>(0);
  const OPTIMAL_DEPTH_MM = 50.8; // 2 inches in mm
  const OPTIMAL_FREQUENCY_MIN = 100;
  const OPTIMAL_FREQUENCY_MAX = 120;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

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
      const depth = MAX_DISTANCE - Math.min(100, Number(event.data));
      setDataPoints((prev) => {
        // Keep only last 100 points to prevent memory issues
        const newPoints = [...prev, { depth, date: new Date() }];
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
          content: `The following are the user's 30 most recent compression depths. Each data point is spaced 200ms apart: [${[
            ...dataPoints,
          ]
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
    const threshold = 15;
    let inCompression = false;
    let count = 0;

    for (let i = 0; i < dataPoints.length; i++) {
      const depth = dataPoints[i].depth;

      if (depth < threshold && !inCompression) {
        inCompression = true;
      } else if (depth >= threshold && inCompression) {
        // End of compression
        count++;
        inCompression = false;
      }
    }

    return count;
  }

  function calculatePoints(depth: number, frequency: number): number {
    // Depth scoring (0-50 points)
    const depthDiff = Math.abs(depth - OPTIMAL_DEPTH_MM);
    const depthPoints = Math.max(0, 50 - (depthDiff * 2)); // Lose 2 points per mm deviation

    // Frequency scoring (0-50 points)
    let frequencyPoints = 0;
    if (frequency >= OPTIMAL_FREQUENCY_MIN && frequency <= OPTIMAL_FREQUENCY_MAX) {
      frequencyPoints = 50; // Perfect frequency
    } else if (frequency < OPTIMAL_FREQUENCY_MIN) {
      frequencyPoints = Math.max(0, 50 - (OPTIMAL_FREQUENCY_MIN - frequency) * 5); // Lose 5 points per compression below min
    } else {
      frequencyPoints = Math.max(0, 50 - (frequency - OPTIMAL_FREQUENCY_MAX) * 5); // Lose 5 points per compression above max
    }

    return Math.round(depthPoints + frequencyPoints);
  }

  useEffect(() => {
    if (time > 0) {
      if (time == 40 || time == 20) {
        giveAdvice();
      }
      if (!modalVisible && !showResults) {
        const timeout = setTimeout(() => {
          setTime(time - 1);
          const currentFrequency = (countCompressions() * 60) / (dataPoints.length * 0.2);
          setFrequencyData([...frequencyData, currentFrequency]);
          
          // Calculate points based on current performance
          const currentDepth = dataPoints[dataPoints.length - 1]?.depth || 0;
          const newPoints = calculatePoints(currentDepth, currentFrequency);
          setPoints(prevPoints => prevPoints + newPoints);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      handleRoundEnd();
    }
  }, [time, modalVisible]);

  const handleRoundEnd = () => {
    if (players.length === 2) {
      // Update the current player's score
      const updatedPlayers = players.map(player => 
        player.name === currentPlayer ? { ...player, score: points } : player
      );
      setPlayers(updatedPlayers);
      
      // Update the leaderboard scores
      const updatedUsers = users.map((user: User) => {
        if (user.name === currentPlayer) {
          return { ...user, score: user.score + points };
        }
        return user;
      });
      setUsers(updatedUsers);
      
      if (currentPlayerIndex === 0) {
        // First player finished, prepare for second player
        setCurrentPlayerIndex(1);
        setCurrentPlayer(selectedOpponent);
        setModalVisible(true); // Show phone swap modal
      } else {
        // Second player finished, show results
        setShowResults(true);
        setModalVisible(false);
      }
      
      // Reset game state
      setTime(60);
      setDataPoints(Array.from({ length: 100 }, () => ({
        date: new Date(),
        depth: 0,
      })));
      setPoints(0);
      setFrequencyData([0]);
    }
  };

  const dismissModal = () => {
    if (currentPlayerIndex === 0) {
      if (!selectedOpponent || !currentUser) {
        return;
      }
      // Initialize players array for first player
      setPlayers([
        { name: currentUser, score: 0 },
        { name: selectedOpponent, score: 0 }
      ]);
      setCurrentPlayer(currentUser);
    }
    
    setModalVisible(false);
  };

  const startNextRound = () => {
    setShowResults(false);
    setTime(60);
    setDataPoints(Array.from({ length: 100 }, () => ({
      date: new Date(),
      depth: 0,
    })));
    setPoints(0);
    setFrequencyData([0]);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setModalVisible(true);
  };

  const getWinner = () => {
    if (players.length !== 2) return null;
    return players[0].score > players[1].score ? players[0] : players[1];
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
              <Text style={styles.number}>{points}</Text>
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
                {frequencyData[frequencyData.length - 1]}
              </Text>
              <Text style={styles.statLabel}>Frequency</Text>
            </View>
          </View>
          <ChartCard
            data={dataPoints.map((point) => ({
              value: point.depth,
            }))}
            title="Compression Depth"
          />
          <ChartCard
            data={frequencyData.map((value) => ({ value }))}
            title="Compression Frequency (per minute)"
          />
        </ScrollView>
        <Modal
          visible={modalVisible}
          title={currentPlayerIndex === 0 ? "CPR Practice Game" : "Swap Phones"}
          onSubmit={dismissModal}
          buttonText={currentPlayerIndex === 0 ? "Begin" : "Continue"}
        >
          <View style={styles.modalTextContainer}>
            {currentPlayerIndex === 0 ? (
              <>
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
                  onValueChange={(value) => setSelectedOpponent(value)}
                />
              </>
            ) : (
              <>
                <ModalText>Please hand your device to your opponent.</ModalText>
                <ModalText>
                  When you are ready, press continue to begin the next round.
                </ModalText>
              </>
            )}
          </View>
        </Modal>
        <Modal
            visible={showResults}
            title="Game Results"
            onSubmit={startNextRound}
            buttonText="Play Again"
          >
            <View style={styles.resultsContainer}>
              {players.map((player, index) => {
                const isWinner = getWinner()?.name === player.name;
                return (
                  <View key={index} style={[styles.resultRow, isWinner && styles.winnerRow]}>
                    <View style={styles.resultContent}>
                      {isWinner && (
                        <Feather name="award" size={24} color="#ef8228" style={styles.crown} />
                      )}
                      <Text style={[styles.resultName, isWinner && styles.winnerName]}>
                        {player.name}
                      </Text>
                    </View>
                    <Text style={styles.resultScore}>{player.score} points</Text>
                  </View>
                );
              })}
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
    gap: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  resultsContainer: {
    gap: 16,
    padding: 16,
    width: '100%',
  },
  resultRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#313435',
    padding: 24,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  winnerRow: {
    backgroundColor: '#2e2f30',
    borderWidth: 2,
    borderColor: '#ef8228',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  resultName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
  winnerName: {
    color: '#ef8228',
    fontWeight: 'bold',
  },
  resultScore: {
    color: '#85858588',
    fontSize: 18,
    fontWeight: '500',
  },
  crown: {
    marginRight: 16,
  },
});
