import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDialog-paper": {
      width: 317,
      maxHeight: 450,
      borderRadius: 8,
      boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
      padding: 25,
    },
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  loginBySms: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    color: baseColors.primaryBlue,
    margin: "0 auto",
    "&:hover": {
      cursor: "pointer",
    },
  },
  requestErrors: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    marginBottom: 12,
    color: baseColors.error,
  },
  inputStartAddornment: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    color: baseColors.primaryGrey,
    paddingRight: 6,
  },
  passwordInputImg: {
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
  },
  clearButton: {
    padding: 2,
  },
}));
