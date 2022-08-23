import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    "& .MuiInputBase-input": {
      padding: 12,
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: 4,
    },
  },
  searchBtn: {
    backgroundColor: baseColors.mainOrange,
    margin: "0 auto",
    width: 35,
    minWidth: 35,
    padding: 0,
    height: 35,
    "&:hover": {
      backgroundColor: baseColors.mainOrange,
    },
  },
  numbersInfo: {
    borderRadius: 4,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "ffffff",
    padding: "11px 18px",
  },
  noEmailDialogDescription: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    lineHeight: 1.4,
    color: "black",

    width: "80%",
    marginBottom: 23,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  email: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    lineHeight: 1.4,
    color: "black",
    textAlign: "center",
  },
  emptyText: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    color: "#a5abaf",
    textAlign: "center",
    marginTop: 10,
  },
}));
