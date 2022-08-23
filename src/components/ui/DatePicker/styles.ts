import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  formControl: {
    width: "100%",
    "& .MuiInputBase-root": {
      boxShadow: "2px 2px 23px 0px rgba(253, 125, 59,0.06)",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: 8,
      "&:hover": {
        borderColor: baseColors.mainOrange,
      },
    },
    "& .MuiTextField-root[readonly] .MuiInputBase-input": {
      color: "#a5abaf",
    },
    "& .MuiInputBase-input": {
      fontFamily: "PTSans-Regular",
      padding: "16px 14px",
      fontSize: 16,
      color: "black",
      opacity: 1,
    },
    "& .MuiInput-underline": {
      "&:before": {
        borderBottom: "none",
      },
      "&:after": {
        borderBottom: "none",
      },
      "&:hover:not(.Mui-disabled)::before": {
        borderBottom: "none",
      },
    },
  },
  dialog: {
    "& p": {
      fontFamily: "PTSans-Regular",
    },
    "& .MuiToolbar-root": {
      display: "none",
    },
    "& .MuiPickersDay-daySelected": {
      backgroundColor: baseColors.mainOrange,
    },
    "& .MuiDialogActions-root": {
      display: "none",
    },
  },
}));
