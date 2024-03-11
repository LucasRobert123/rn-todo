import React, { useRef, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

import * as Crypto from "expo-crypto";
import Bottom from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomSheet, OnConfirmProps } from "@/components/BottomSheet";
import { theme } from "@/theme";

import { styles } from "./styles";
import { produce } from "immer";
import { Task, TaskProps } from "@/components/Task";

export const Home = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskSelected, setTaskSelected] = useState<TaskProps>();

  const [inputText, setInputText] = useState("");

  const bottomSheetRef = useRef<Bottom>(null);

  const handleAddTask = () => {
    setTasks((state) => [
      ...state,
      { id: Crypto.randomUUID(), value: inputText },
    ]);
    setInputText("");
  };

  const handleRemoveTask = (id: string) => {
    setTasks((state) => state.filter((s) => s.id !== id));
  };

  const handleExpandedBottomSheet = (task: TaskProps) => {
    bottomSheetRef.current?.expand();
    setTaskSelected(task);
  };

  function handleOnCancel() {
    bottomSheetRef.current?.snapToIndex(0);
  }

  function handleOnConfirm({ date, hour, inputValue }: OnConfirmProps) {
    bottomSheetRef.current?.snapToIndex(0);
    setTasks(
      produce((task) => {
        const currentTask = task.find((t) => t.id === taskSelected?.id);

        if (currentTask) {
          currentTask.date = date;
          currentTask.hour = hour;
          currentTask.value = inputValue;
        }
      })
    );
    setTaskSelected(undefined);
  }

  function handleOnConclude(taskId: string) {
    setTasks((state) => state.filter((s) => s.id !== taskId));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Nova task"
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddTask}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <MaterialIcons name="add" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ gap: 12, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            index={index}
            task={task}
            onRemoveTask={handleRemoveTask}
            onExpandedBottomSheet={handleExpandedBottomSheet}
            onConclude={handleOnConclude}
          />
        ))}
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        onCancel={handleOnCancel}
        onConfirm={handleOnConfirm}
        task={taskSelected}
      />
    </SafeAreaView>
  );
};
