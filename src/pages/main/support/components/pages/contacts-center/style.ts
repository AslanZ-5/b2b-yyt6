import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontFamily: "PTSans-Bold",
    fontSize: 18,
    textDecoration: "none",
    color: baseColors.mainOrange,
    marginBottom: 3,
  },
  text: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    marginBottom: 24,
  },
}));
