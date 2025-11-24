// mobile/src/features/brotherhood/screens/BrotherhoodHomeScreen.tsx

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { BrotherhoodStackParamList } from "../../../navigation/types";
import { fetchDefaultGroups } from "../api/brotherhoodApi";
import type { Group } from "../types";

type Props = NativeStackScreenProps<
  BrotherhoodStackParamList,
  "BrotherhoodHome"
>;

const FALLBACK_GROUPS: Group[] = [
  { id: "business", name: "Business", description: "Builders, founders, and grinders.", isDefault: true, sortOrder: 1 },
  { id: "fitness", name: "Fitness", description: "Strength, health, and discipline.", isDefault: true, sortOrder: 2 },
  { id: "faith", name: "Faith", description: "Spirit, meaning, and grounding.", isDefault: true, sortOrder: 3 },
  { id: "discipline", name: "Discipline", description: "Habits, focus, and attention.", isDefault: true, sortOrder: 4 },
  { id: "recovery", name: "Recovery", description: "Healing, sobriety, and rebuilding.", isDefault: true, sortOrder: 5 }
];

const BrotherhoodHomeScreen: React.FC<Props> = ({ navigation }) => {
  const [groups, setGroups] = useState<Group[]>(FALLBACK_GROUPS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDefaultGroups();
        if (Array.isArray(data) && data.length > 0) {
          setGroups(data);
        }
      } catch (err) {
        console.log("[FORGE] Failed to load groups, using fallback.", err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollInner}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.kicker}>THE BROTHERHOOD</Text>
        <Text style={styles.title}>Rooms for men in the grind</Text>
        <Text style={styles.subtitle}>
          Drop into a room that matches your current season – talk business, body, faith,
          discipline, or recovery with men walking the same path.
        </Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rooms</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("GroupList")}
          >
            <Text style={styles.sectionLink}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.roomsRow}
        >
          {groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.roomCard}
              onPress={() =>
                navigation.navigate("GroupChat", { groupId: group.id })
              }
            >
              <Text style={styles.roomName}>{group.name}</Text>
              {group.description ? (
                <Text style={styles.roomDescription}>{group.description}</Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {isLoading && (
          <Text style={styles.loadingText}>Refreshing rooms...</Text>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>How to use the Brotherhood</Text>
          <Text style={styles.infoText}>
            • Share wins and losses honestly.{"\n"}
            • Ask for advice or feedback without ego.{"\n"}
            • Remember the Forge code: respect, effort, and truth.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050608"
  },
  scrollInner: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32
  },
  kicker: {
    color: "#9ca3af",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4
  },
  title: {
    color: "#f9fafb",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600"
  },
  sectionLink: {
    color: "#f97316",
    fontSize: 13
  },
  roomsRow: {
    paddingVertical: 4
  },
  roomCard: {
    width: 180,
    marginRight: 12,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#0b1120",
    borderWidth: 1,
    borderColor: "#111827"
  },
  roomName: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4
  },
  roomDescription: {
    color: "#9ca3af",
    fontSize: 12,
    lineHeight: 18
  },
  loadingText: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 8
  },
  infoBox: {
    marginTop: 24,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827"
  },
  infoTitle: {
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4
  },
  infoText: {
    color: "#9ca3af",
    fontSize: 13,
    lineHeight: 18
  }
});

export default BrotherhoodHomeScreen;
