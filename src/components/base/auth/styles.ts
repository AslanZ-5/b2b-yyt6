import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const additionalClassNameButton = {
  borderRadius: "30px",
  width: "217px",
  background: "linear-gradient(93.01deg, #54A9E2 0%, #70DBA3 100%)",
};

export const additionalClassNameSmsButton = {
  fontFamily: "SF Pro Display Regular",
  fontSize: "12px",
  fontWeight: 600,
  lineHeight: "100%",
  textTransform: "uppercase",
  color: baseColors.brandBlue,
  margin: "0 auto",
  cursor: "pointer",
};

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
    fontWeight: 400,
    fontSize: 20,
    lineHeight: "22.4px",
    marginBottom: 20,
    textAlign: "left",
  },
  inputDescription: {
    textAlign: "center",
    fontSize: "12px",
    color: baseColors.primaryGrey,
    margin: "5px 0 10px 0",
  },
  loginBySms: {
    fontFamily: "SF Pro Display Regular",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "100%",
    textTransform: "uppercase",
    color: baseColors.brandBlue,
    margin: "0 auto",
    "&:hover": {
      cursor: "pointer",
    },
  },
  progressBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    minWidth: "343px",
    maxWidth: "408px",
    minHeight: "300px",
    maxHeight: "350px",
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

export const phoneMask = [
  "(",
  /\d/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  "-",
  " ",
  /\d/,
  /\d/,
  " ",
  "-",
  " ",
  /\d/,
  /\d/,
];
