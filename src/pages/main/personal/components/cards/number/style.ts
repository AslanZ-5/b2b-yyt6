import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    padding: "20px 16px",
    borderRadius: 8,
    backgroundColor: baseColors.lightViolet,
  },
  label: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    lineHeight: 2,
    letterSpacing: "0.19px",
    color: baseColors.mainViolet,
  },
  value: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    lineHeight: 2.06,
    letterSpacing: "0.19px",
    color: baseColors.mainViolet,
  },
  accountBtn: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.mainOrange,
    color: "#fff",
    margin: "0 auto",
    width: "100%",
    height: 35,
    fontSize: 14,
    textTransform: "none",
    "&:hover": {
      backgroundColor: baseColors.mainOrange,
    },
    marginTop: 20,
  },
}));
