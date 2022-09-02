import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  checkbox: {
    "& .MuiCheckbox-root.Mui-checked": {
      color: baseColors.primaryBlue,
    },
    "& .MuiCheckbox-root": {
      color: baseColors.primaryGrey,
    },
    "& .MuiFormControlLabel-label": {
      lineHeight: 1,
    },
  },
}));
