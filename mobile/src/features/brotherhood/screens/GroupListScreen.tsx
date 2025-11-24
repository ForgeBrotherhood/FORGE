// mobile/src/features/brotherhood/screens/GroupListScreen.tsx

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { BrotherhoodStackParamList } from "../../../navigation/types";
import { fetchDefaultGroups } from "../api/brotherhoodApi";
import type { Group } from "../types";

type Props = NativeStackScreenProps<
  BrotherhoodStackParamList,
  "GroupList"
>;

const GroupListScreen: React.FC<Props> = ({ navigation }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDefaultGroups();
        setGroups(data);
      } catch (err) {
        console.log("[FORGE] Failed to load group list.", err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>All Brotherhood Rooms</Text>
        <Text style={styles.subtitle}>
          Choose a room that matches what you&apos;re working on right now.
        </Text>

        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate("GroupChat", { groupId: item.id })
              }
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>{item.name}</Text>
                {item.description ? (
                  <Text style={styles.rowSubtitle}>{item.description}</Text>
                ) : null}
              </View>
              <Text style={styles.rowAction}>Enter</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            isLoading ? (
              <Text style={styles.emptyText}>Loading rooms...</Text>
            ) : (
              <Text style={styles.emptyText}>
                No rooms found yet. We&apos;ll add them soon.
              </Text>
            )
          }
          contentContainerStyle={
            groups.length === 0 ? styles.emptyContainer : undefined
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050608"
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24
  },
  title: {
    color: "#f9fafb",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 16
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12
  },
  rowContent: {
    flex: 1
  },
  rowTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600"
  },
  rowSubtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 2
  },
  rowAction: {
    color: "#f97316",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 8
  },
  separator: {
    height: 1,
    backgroundColor: "#111827"
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14
  }
});

export default GroupListScreen;
