import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  input: {
    "& .MuiInputBase-input": {
      padding: "16px 0px",
    },
  },
  formControl: {
    width: "100%",
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",

    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      boxShadow: "2px 2px 23px 0px rgba(253, 125, 59,0.06)",
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
      "&:hover fieldset": {
        borderColor: baseColors.primaryBlue,
      },
      "&.Mui-focused fieldset": {
        borderColor: baseColors.primaryBlue,
      },
    },
    "& .MuiInputBase-input": {
      fontFamily: "PTSans-Regular",
      padding: "16px 14px",
      fontSize: 14,
      color: baseColors.primaryGrey,
      opacity: 1,
    },
    "& .MuiInputAdornment-positionStart": {
      marginRight: 0,
    },
  },
  findBtn: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.primaryBlue,
    color: baseColors.primaryWhite,
    margin: "0 auto",
    width: 100,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    "&:hover": {
      backgroundColor: baseColors.primaryBlue,
    },
  },
}));
