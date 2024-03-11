import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  listItem: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#3c3a3f",
    elevation: 2,
    paddingHorizontal: 16,
  },
  listItemContent: {
    flex: 1,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.white,
    fontFamily: theme.fonts.semibold,
    paddingRight: 8,
  },
  listItemDate: {
    fontSize: 12,
    color: theme.colors.white,
    fontFamily: theme.fonts.regular,
  },
  listItemHour: {
    fontSize: 12,
    color: theme.colors.white,
    fontFamily: theme.fonts.medium,
  },
  swipeableContainer: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: theme.colors.red[700],
  },
  swipeableRemove: {
    width: 50,
    backgroundColor: theme.colors.red[700],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
});
