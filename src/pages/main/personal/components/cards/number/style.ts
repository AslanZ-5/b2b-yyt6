import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    padding: "20px 16px",
    borderRadius: 8,
    backgroundColor: baseColors.lightBlue,
  },
  label: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    lineHeight: 2,
    letterSpacing: "0.19px",
    color: baseColors.primaryBlack,
  },
  value: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    lineHeight: 2.06,
    letterSpacing: "0.19px",
    color: baseColors.primaryBlue,
  },
  accountBtn: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.primaryBlue,
    color: baseColors.primaryWhite,
    margin: "0 auto",
    width: "100%",
    height: 35,
    fontSize: 14,
    textTransform: "none",
    "&:hover": {
      backgroundColor: baseColors.primaryBlue,
    },
    marginTop: 20,
  },
}));
