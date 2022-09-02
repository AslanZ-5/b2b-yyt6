import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    letterSpacing: 0.24,

    marginBottom: 16,
    marginTop: 12,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 12,
    paddingBottom: 30,
  },
  iosMargin: {
    height: 30,
  },
  buttonNext: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.primaryBlue,
    color: baseColors.primaryWhite,
    width: 100,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    textAlign: "center",
    //lineHeight: "35px",
    "&:hover": {
      backgroundColor: baseColors.primaryBlue,
    },
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    color: baseColors.primaryBlue,
    marginLeft: -9,
    "&:hover": {
      cursor: "pointer",
    },
  },
  icons: {
    display: "flex",
    alignItems: "center",
  },
  iconsImg: {
    paddingLeft: 20,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
