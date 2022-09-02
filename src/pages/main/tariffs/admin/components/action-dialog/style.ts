import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "& .MuiDialog-paper": {
      width: 385,
      padding: 25,
      borderRadius: 12,
      maxHeight: 500,
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
    color: baseColors.primaryBlack,
  },
  row: {
    marginBottom: 16,
  },
  textRight: {
    textAlign: "right",
  },
  btnExecute: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.primaryBlue,
    color: baseColors.primaryWhite,
    width: 210,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    textAlign: "center",
    //lineHeight: "35px",
    "&:hover": {
      backgroundColor: baseColors.primaryBlue,
    },
  },
  btnCancel: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.lightBlue,
    color: baseColors.primaryBlue,
    width: 210,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    textAlign: "center",
    //lineHeight: "35px",
    "&:hover": {
      backgroundColor: baseColors.lightBlue,
    },
  },
}));
