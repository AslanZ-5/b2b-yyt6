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
    color: "#131313",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "& > img": {
      paddingLeft: 5,
    },
  },
  textButton: {
    color: baseColors.mainOrange,
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
    backgroundColor: "#eff3f8",
    padding: 16,

    fontFamily: "PTSans-Bold",
    fontSize: 14,
    color: "#512893",
  },
  pageTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
  },
}));
