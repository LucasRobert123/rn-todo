import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[900],
    padding: 24,
  },
  containerInput: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.white,
    height: 48,
    borderRadius: 8,
    paddingLeft: 8,
    fontFamily: theme.fonts.regular,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    backgroundColor: theme.colors.purple[600],
    borderRadius: 8,
  },
  list: {
    marginTop: 16,
  },
});
