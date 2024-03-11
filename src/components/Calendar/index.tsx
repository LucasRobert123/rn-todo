import {
  Calendar as CalendarRNC,
  CalendarProps,
  LocaleConfig,
} from "react-native-calendars";
import { ptBR } from "./localeConfig";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export function Calendar(props: CalendarProps) {
  return <CalendarRNC {...props} />;
}
