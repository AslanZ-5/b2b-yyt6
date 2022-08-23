import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    width: "100%",
    border: "none",
    borderRadius: 8,
    "&:hover": {
      borderColor: "none",
    },

    "& .MuiInputBase-input": {
      fontFamily: "PTSans-Bold",
      padding: "16px 14px",
      paddingRight: 0,
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
  dialogTest: {
    "& .MuiPickersToolbarText-toolbarTxt": {
      fontFamily: "PTSans-Regular",
      color: "white",
    },
    "& .MuiPickersToolbar-toolbar": {
      backgroundColor: baseColors.mainOrange,
    },
    "& .MuiPickersDay-daySelected": {
      backgroundColor: baseColors.mainOrange,
    },
    "& .MuiDialogActions-root": {
      display: "none",
    },
    "& .MuiPickersMonth-monthSelected": {
      color: baseColors.mainOrange,
    },
    "& .MuiPickersMonth-root": {
      fontFamily: "PTSans-Regular",
    },
  },
}));
