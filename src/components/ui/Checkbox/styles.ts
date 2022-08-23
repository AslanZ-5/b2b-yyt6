import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  checkbox: {
    "& .MuiCheckbox-root.Mui-checked": {
      color: baseColors.mainOrange,
    },
    "& .MuiCheckbox-root": {
      color: "#a1a1a1",
    },
    "& .MuiFormControlLabel-label": {
      lineHeight: 1,
    },
  },
}));
