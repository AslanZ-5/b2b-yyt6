import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  error: {
    display: "flex",
    alignItems: "center",
    marginTop: 8,
    paddingLeft: 9,
  },
  errorText: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    color: baseColors.primaryGrey,
    paddingLeft: 4,
  },
  checkbox: {
    "& .MuiCheckbox-root.Mui-checked": {
      color: baseColors.primaryBlue,
    },
    "& .MuiCheckbox-root": {
      color: baseColors.primaryGrey,
      marginTop: -9,
    },
    "& .MuiFormControlLabel-label": {
      lineHeight: 1,
    },
  },
  checkBoxLabel: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  checkBoxLink: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    color: baseColors.primaryBlue,
  },
  confirmDialogLabel: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  confirmDialogText: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
  }
}));
