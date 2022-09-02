import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: baseColors.primaryWhite,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  costContainer: {
    display: "flex",
    alignItems: "center",

    "& > img": {
      paddingRight: 10,
    },
  },
  cost: {
    fontFamily: "PTSans-Bold",
    fontSize: 21,
    lineHeight: 2.19,
    color: baseColors.primaryBlack,
  },
  btn: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.primaryBlue,
    color: baseColors.primaryWhite,
    width: 134,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    textAlign: "center",
    //lineHeight: "35px",
    "&:hover": {
      backgroundColor: baseColors.primaryBlue,
    },
  },
}));
