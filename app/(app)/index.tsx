import Button from "@/components/Button";
import { auth } from "@/firebase";
import { Link, router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { CircularProgress } from "react-native-circular-progress";

export default function Index() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Unit Card */}
                <View style={styles.unitCard}>
                    <Text style={styles.unitTitle}>Unit 1</Text>
                    <Text style={styles.unitSubtitle}>Use basic phrases, greet people</Text>
                    
                    {/* Learning Path Items */}
                    {[
                        { icon: "book", title: "Basics 1", progress: 0 },
                        { icon: "github", title: "Animals", progress: 0 },
                        { icon: "coffee", title: "Food", progress: 0 },
                        { icon: "users", title: "Family", progress: 0 },
                    ].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.pathItem}>
                            <Feather name={item.icon as any} size={24} color="#4CAF50" />
                            <View style={styles.pathTextContainer}>
                                <Text style={styles.pathTitle}>{item.title}</Text>
                                <Text style={styles.pathSubtitle}>0/5 Completed</Text>
                            </View>
                            <CircularProgress
                                size={40}
                                width={3}
                                fill={item.progress}
                                tintColor="#4CAF50"
                                backgroundColor="#e0e0e0"
                            />
                        </TouchableOpacity>
                    ))}
                    
                    {/* Start Button */}
                    <TouchableOpacity 
                        style={styles.startButton}
                        onPress={() => router.push("/lesson")}
                    >
                        <Text style={styles.startButtonText}>START</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 16,
    },
    unitCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
    },
    unitTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a237e',
    },
    unitSubtitle: {
        fontSize: 16,
        color: '#616161',
        marginBottom: 20,
    },
    pathItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    pathTextContainer: {
        flex: 1,
        marginLeft: 16,
    },
    pathTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#212121',
    },
    pathSubtitle: {
        fontSize: 14,
        color: '#9e9e9e',
    },
    startButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    startButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
    },
    loginLink: {
        color: '#2196F3',
        textAlign: 'center',
        marginBottom: 16,
    },
});
