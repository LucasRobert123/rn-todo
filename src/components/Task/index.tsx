import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Animated, {
  LinearTransition,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import Checkbox from "expo-checkbox";

import { theme } from "@/theme";
import { styles } from "./styles";
import { colors } from "@/theme/colors";

export type TaskProps = {
  id: string;
  value: string;
  date?: Date;
  hour?: Date;
};

type Props = {
  task: TaskProps;
  index: number;
  onRemoveTask: (taskId: string) => void;
  onExpandedBottomSheet: (task: TaskProps) => void;
  onConclude: (taskId: string) => void;
};

export function Task({
  task,
  index,
  onRemoveTask,
  onExpandedBottomSheet,
  onConclude,
}: Props) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      onConclude(task.id);
    }
  }, [isChecked]);

  return (
    <Animated.View
      layout={LinearTransition.springify()}
      entering={SlideInLeft.delay(index * 50)}
      exiting={SlideOutRight.duration(500)}
    >
      <Swipeable
        overshootRight={false}
        containerStyle={[styles.swipeableContainer]}
        renderRightActions={() => {
          return (
            <RectButton
              style={styles.swipeableRemove}
              onPress={() => onRemoveTask(task.id)}
            >
              <MaterialIcons
                name="delete"
                size={24}
                color={theme.colors.white}
              />
            </RectButton>
          );
        }}
      >
        <View style={styles.listItem}>
          <View style={styles.containerCheckbox}>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              color={colors.purple[600]}
            />
          </View>
          <View style={styles.listItemContent}>
            <Text style={styles.listItemText}>{task.value}</Text>
            {task?.date && (
              <Text style={styles.listItemDate}>
                {dayjs(task.date).format("DD/MM/YYYY")}
                <Text style={styles.listItemHour}>
                  {task.hour ? " - " + dayjs(task.hour).format("HH:mm") : ""}
                </Text>
              </Text>
            )}
          </View>
          <MaterialIcons
            name="calendar-month"
            color={theme.colors.white}
            size={24}
            onPress={() => onExpandedBottomSheet(task)}
          />
        </View>
      </Swipeable>
    </Animated.View>
  );
}
