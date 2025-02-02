import { format, parse, startOfWeek, getDay } from "date-fns";
import { ja } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  ja: ja,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
