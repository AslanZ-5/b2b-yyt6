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
    color: "#adb2b6",
    paddingLeft: 4,
  },
  checkbox: {
    "& .MuiCheckbox-root.Mui-checked": {
      color: baseColors.mainOrange,
    },
    "& .MuiCheckbox-root": {
      color: "#a1a1a1",
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
    color: baseColors.mainOrange,
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
