import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerInput: {
    padding: 16,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: theme.fonts.regular,
  },
  containerHour: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[300],
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  textHour: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[800],
    paddingLeft: 8,
  },
  hourSelected: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray[800],
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
    marginRight: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.gray[800],
    textTransform: "uppercase",
  },
});
