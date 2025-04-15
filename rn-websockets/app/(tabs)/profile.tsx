import LessonCard from "@/components/LessonCard";
import Modal from "@/components/Modal";
import ModalText from "@/components/ModalText";
import ProfileHeader from "@/components/ProfileHeader";
import TextInput from "@/components/TextInput";
import UnitCard from "@/components/UnitCard";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { ReactElement, useContext, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SadCat from "@/components/SadCat";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { UserContext } from "@/context/UserContext";
import ChartCard from "@/components/ChartCard";

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { users, setUsers } = useContext(UserContext);

  const [nameInput, setNameInput] = useState<string>(currentUser || "");

  const showModal = () => {
    setNameInput(currentUser || "");
    setModalVisible(true);
  };

  const logOut = () => {
    setCurrentUser(undefined);
  };

  const login = () => {
    setCurrentUser(nameInput);
    if (!users.find((user) => user.name === nameInput)) {
      setUsers([...users, { name: nameInput, score: 0 }]);
    }
    setModalVisible(false);
  };

  return (
    <>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => (currentUser ? logOut() : showModal())}
              style={{ padding: 16 }}
            >
              <Feather
                name={currentUser ? "log-out" : "log-in"}
                color="#fff"
                size={24}
              />
            </Pressable>
          ),
        }}
      />
      <View style={styles.page}>
        {!currentUser ? (
          <View style={styles.catContainer}>
            <SadCat>You are not logged in.</SadCat>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <ProfileHeader
              level={15}
              name={currentUser}
              score={users.find((user) => user.name == currentUser)?.score || 0}
            />
            <ChartCard
              title="Activities Per Day"
              data={[
                { value: 10 },
                { value: 11 },
                { value: 15 },
                { value: 30 },
              ]}
            />
            
          </ScrollView>
        )}
      </View>
      <Modal
        visible={modalVisible}
        title="Add User"
        buttonText="Log In"
        onDismiss={() => setModalVisible(false)}
        onSubmit={login}
      >
        <View style={styles.modalContent}>
          <ModalText>
            Enter your name below to log in to the app. Your data will not be
            collected.
          </ModalText>
          <TextInput
            placeholder="Renn Gilbert"
            value={nameInput}
            onChangeText={setNameInput}
          />
        </View>
      </Modal>
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
  modalContent: {
    gap: 8,
  },
  catContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
