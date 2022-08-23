import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  checkBoxLabel: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  checkBoxLink: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    color: baseColors.mainOrange,
  },
}));
