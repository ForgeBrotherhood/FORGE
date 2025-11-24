// mobile/src/features/profile/components/EditProfileForm.tsx

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export interface ProfileFormValues {
  name: string;
  bio: string;
  location: string;
  primaryPillar: string;
}

interface EditProfileFormProps {
  initialValues: ProfileFormValues;
  email?: string;
  isSubmitting?: boolean;
  onSubmit: (values: ProfileFormValues) => void | Promise<void>;
}

const PILLARS = ["Business", "Fitness", "Faith", "Discipline", "Recovery"];

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  initialValues,
  email,
  isSubmitting,
  onSubmit
}) => {
  const [name, setName] = useState(initialValues.name);
  const [bio, setBio] = useState(initialValues.bio);
  const [location, setLocation] = useState(initialValues.location);
  const [primaryPillar, setPrimaryPillar] = useState(
    initialValues.primaryPillar
  );

  const handleSubmit = async () => {
    await onSubmit({
      name: name.trim(),
      bio: bio.trim(),
      location: location.trim(),
      primaryPillar
    });
  };

  return (
    <View style={styles.container}>
      {email ? (
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      ) : null}

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="How should the Brotherhood see you?"
          placeholderTextColor="#6b7280"
          style={styles.input}
        />
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Location (optional)</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="City, Country"
          placeholderTextColor="#6b7280"
          style={styles.input}
        />
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Primary pillar right now</Text>
        <View style={styles.pillarsRow}>
          {PILLARS.map((pillar) => {
            const selected = primaryPillar === pillar;
            return (
              <TouchableOpacity
                key={pillar}
                style={[
                  styles.pillarChip,
                  selected && styles.pillarChipSelected
                ]}
                onPress={() => setPrimaryPillar(pillar)}
              >
                <Text
                  style={[
                    styles.pillarText,
                    selected && styles.pillarTextSelected
                  ]}
                >
                  {pillar}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Short bio (optional)</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          placeholder="One or two sentences about who you are and what you're building."
          placeholderTextColor="#6b7280"
          style={[styles.input, styles.textArea]}
          multiline
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.saveButtonText}>
          {isSubmitting ? "Saving..." : "Save changes"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  fieldBlock: {
    marginBottom: 16
  },
  label: {
    color: "#e5e7eb",
    fontSize: 14,
    marginBottom: 6
  },
  email: {
    color: "#9ca3af",
    fontSize: 14
  },
  input: {
    backgroundColor: "#020617",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f9fafb",
    fontSize: 14
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top"
  },
  pillarsRow: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  pillarChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#374151",
    marginRight: 8,
    marginBottom: 8
  },
  pillarChipSelected: {
    borderColor: "#f97316",
    backgroundColor: "#111827"
  },
  pillarText: {
    color: "#9ca3af",
    fontSize: 12
  },
  pillarTextSelected: {
    color: "#f9fafb",
    fontWeight: "600"
  },
  saveButton: {
    marginTop: 4,
    backgroundColor: "#f97316",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center"
  },
  saveButtonDisabled: {
    opacity: 0.7
  },
  saveButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  }
});

export default EditProfileForm;
