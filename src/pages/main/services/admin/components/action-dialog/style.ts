import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "& .MuiDialog-paper": {
      width: 385,
      padding: 25,
      borderRadius: 12,
    },
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
  },
  dialogButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  regularText: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  boldText: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    color: "#010101",
  },
  row: {
    marginBottom: 16,
  },
  textRight: {
    textAlign: "right",
  },
  btnExecute: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.mainOrange,
    color: "#fff",
    width: 210,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    textAlign: "center",
    //lineHeight: "35px",
    "&:hover": {
      backgroundColor: baseColors.mainOrange,
    },
  },
  btnCancel: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.lightOrange,
    color: baseColors.mainOrange,
    width: 210,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    textAlign: "center",
    //lineHeight: "35px",
    "&:hover": {
      backgroundColor: baseColors.lightOrange,
    },
  },
}));
