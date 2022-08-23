import { baseColors } from "constants/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDialogContent-root": {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      padding: "0 40px 0 40px",
      "& > img": {
        width: "100%",
        height: 90,
      },
      "@media (max-width: 400px)": {
        width: "100%",
        padding: 0,
        marginTop: 0,
      },
    },
    "& .MuiDialogActions-root": {
      width: "auto",
      padding: "20px 40px 40px 40px",
      justifyContent: "center",
      flexWrap: "wrap",
      "@media (max-width: 400px)": {
        padding: "20px 10px 20px 10px",
        flexDirection: "column",
        "& > :first-child": {
          marginBottom: "8px",
        },
        "& > :not(:first-child)": {
          marginLeft: 0,
        },
      },
    },
    "& .MuiDialog-paper": {
      maxHeight: 700,
      minWidth: 300,
      maxWidth: 300,
      //width: "min-content",
      borderRadius: 8,
    },
  },
  closeBtn: {
    margin: 10,
  },
  paper: {
    margin: 0,
  },
  title: {
    fontFamily: "PTSans-Bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    whiteSpace: "pre-wrap",
  },
  description: {
    fontFamily: "PTSans-Regular",
    textAlign: "center",
    color: "#000",
  },
  btn: {
    fontFamily: "PTSans-Bold",
    width: 180,
    height: 35,
    textTransform: "none",
    "&.Mui-disabled": {
      backgroundColor: "#fbbb99",
      color: "#fcfcfc",
    },
  },
  downBtn: {
    fontFamily: "PTSans-Regular",
    backgroundColor: baseColors.lightOrange,
    color: baseColors.mainOrange,
    "&:hover": {
      backgroundColor: baseColors.lightOrange,
    },
  },
  upBtn: {
    fontFamily: "PTSans-Regular",
    backgroundColor: baseColors.mainOrange,
    color: "#fff",
    "&:hover": {
      backgroundColor: baseColors.mainOrange,
    },
  },
}));
