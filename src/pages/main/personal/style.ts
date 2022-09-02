import { makeStyles, Theme } from "@material-ui/core/styles";

import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  personalPageContainer: {
    overflow: "hidden"
  },
  subTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    lineHeight: 1.25,
    letterSpacing: "0.24px",
    color: baseColors.primaryBlack,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "& > img": {
      paddingLeft: 5,
    },
  },
  textButton: {
    color: baseColors.primaryBlue,
    fontFamily: "PTSans-Bold",
    maxHeight: 25,
    textTransform: "none",
  },
  containerPadding: {
    padding: 10,
  },
  rightContainer: {
    height: "100%",
    "@media (max-width:767px)": {
      height: "auto",
    },
  },
  tooltip: {
    backgroundColor: baseColors.lightGrey,
    padding: 16,

    fontFamily: "PTSans-Bold",
    fontSize: 14,
    color: baseColors.primaryBlue,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
  },
  pageTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
  },
}));
