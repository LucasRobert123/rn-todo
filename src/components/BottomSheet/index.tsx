import React, {
  Fragment,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import Bottom from "@gorhom/bottom-sheet";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimerPicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";

import { theme } from "@/theme";

import { Calendar } from "../Calendar";
import { TaskProps } from "@/components/Task";

import { formatDate } from "@/utils/date";

import { styles } from "./styles";

export type OnConfirmProps = {
  date: Date | undefined;
  hour: Date | undefined;
  inputValue: string;
};

type Props = {
  onCancel: () => void;
  onConfirm: (props: OnConfirmProps) => void;
  task: TaskProps | undefined;
};

export const BottomSheet = forwardRef<Bottom, Props>(
  ({ onCancel, onConfirm, task }, ref) => {
    const [markedDates, setMarkedDates] = useState<MarkedDates>();
    const [hour, setHour] = useState<Date | undefined>();
    const [date, setDate] = useState<Date>(new Date());
    const [inputValue, setInputValue] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { top } = useSafeAreaInsets();

    useEffect(() => {
      setMarkedDates({
        [formatDate(task?.date ?? new Date())]: {
          selected: true,
          selectedColor: theme.colors.purple[600],
        },
      });

      setHour(task?.hour ?? new Date());
    }, [task]);

    useEffect(() => {
      if (task?.value) {
        setInputValue(task.value);
      }
    }, [task?.value]);

    function handleOnDayPress(date: DateData) {
      setMarkedDates({
        [date.dateString]: {
          selected: true,
          selectedColor: theme.colors.purple[600],
        },
      });
      setDate(dayjs(new Date(date.timestamp)).add(1, "day").toDate());
    }

    function handleOpenDateTimerPicker() {
      setShowDatePicker(true);
    }

    function handleOnChangeDateTimer(event: DateTimePickerEvent) {
      setShowDatePicker(false);
      if (event.type === "set") setHour(new Date(event.nativeEvent.timestamp));
    }

    const hourFormatted = useMemo(() => {
      if (!hour) return "";
      return dayjs(hour).format("HH:mm");
    }, [hour]);

    return (
      <Fragment>
        <Bottom
          ref={ref}
          topInset={top}
          handleComponent={null}
          backgroundStyle={{
            backgroundColor: theme.colors.white,
          }}
          snapPoints={[0.01, 580]}
        >
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              placeholder="Tarefa"
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
          <Calendar
            renderArrow={(direction) => (
              <MaterialIcons
                name={`keyboard-arrow-${direction}`}
                size={24}
                color={theme.colors.gray[900]}
              />
            )}
            theme={{
              calendarBackground: "transparent",
              monthTextColor: theme.colors.gray[800],
              textDayStyle: { color: theme.colors.gray[800] },
              todayTextColor: theme.colors.gray[800],
              textDayFontFamily: theme.fonts.regular,
              textDayHeaderFontFamily: theme.fonts.medium,
              textMonthFontFamily: theme.fonts.semibold,
              textDayFontSize: 14,
              textDayHeaderFontSize: 12,
            }}
            minDate={formatDate(new Date())}
            markedDates={markedDates}
            onDayPress={handleOnDayPress}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.containerHour}
            onPress={handleOpenDateTimerPicker}
          >
            <MaterialIcons
              name="access-time"
              size={24}
              color={theme.colors.gray[800]}
            />
            <Text style={styles.textHour}>Defina um horário: </Text>
            {hourFormatted && (
              <Text style={styles.hourSelected}>{hourFormatted}</Text>
            )}
          </TouchableOpacity>

          <View style={styles.actions}>
            <RectButton style={[styles.button]} onPress={onCancel}>
              <Text style={[styles.buttonText]}>Cancelar</Text>
            </RectButton>
            <RectButton
              enabled={!!inputValue}
              style={[styles.button, !inputValue ? styles.buttonDisabled : {}]}
              onPress={() => onConfirm({ date, hour, inputValue })}
            >
              <Text style={[styles.buttonText]}>Confirmar</Text>
            </RectButton>
          </View>
        </Bottom>

        {showDatePicker && (
          <DateTimerPicker
            mode="time"
            value={new Date()}
            onChange={handleOnChangeDateTimer}
          />
        )}
      </Fragment>
    );
  }
);
