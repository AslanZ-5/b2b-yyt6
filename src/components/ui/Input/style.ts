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
      fontSize: 16,
      color: "black",
      opacity: 1,
      padding: "16px 14px",
      paddingLeft: 0,

      "&[readonly]": {
        color: baseColors.primaryGrey,
      },
    },
    "& .MuiInputAdornment-positionStart": {
      marginRight: 0,

      "& div": {
        fontFamily: "PTSans-Regular",
        fontSize: 16,
        color: "black !important",
        opacity: 1,
      },
    },
    "& .Mui-error": {
      fontFamily: "PTSans-Regular",
      whiteSpace: "pre-wrap",
    },
    "& .MuiOutlinedInput-inputMultiline": {
      padding: "0 14px 14px 0",
    },
  },
}));
