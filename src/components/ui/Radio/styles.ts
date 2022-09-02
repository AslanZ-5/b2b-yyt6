import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiRadio-colorSecondary": {
      color: baseColors.primaryGrey,
      "&.Mui-checked": {
        color: baseColors.primaryBlue,
      },
    },
    "& .MuiFormControlLabel-label": {
      fontFamily: "PTSans-Bold",
      fontSize: 16,
    },
  },
}));
