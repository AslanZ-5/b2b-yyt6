import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiRadio-colorSecondary": {
      color: "#949fa2",
      "&.Mui-checked": {
        color: baseColors.mainOrange,
      },
    },
    "& .MuiFormControlLabel-label": {
      fontFamily: "PTSans-Bold",
      fontSize: 16,
    },
  },
}));
