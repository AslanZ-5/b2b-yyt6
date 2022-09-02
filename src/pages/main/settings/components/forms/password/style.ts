import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  row: {
    marginBottom: 24,
  },
  error: {
    fontFamily: "PTSans-Regular",
    color: baseColors.error,
    marginBottom: 10,
    fontSize: "0.75rem",
  },
}));
