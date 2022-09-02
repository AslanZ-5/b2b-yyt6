import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  bestOffersContainer: {
    margin: -10,
    "@media (max-width:600px)": {
      maxWidth: "100%",
      flexWrap: "nowrap",
      overflowX: "auto",
    },
  },
  storiesWrapper: {
    width: "inherit",
    height: "inherit",
    "&:hover div": {
      opacity: 0.2,
    },
  },
  storiesHighlight: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: 10,
    pointerEvents: "none",
    backgroundColor: baseColors.primaryBlack,
  },
  storiesImg: {
    width: "inherit",
    minHeight: 124,
    minWidth: 180,
    maxHeight: 400,
    height: "auto",
    borderRadius: 10,
    cursor: "pointer",
  },
  storiesBtn: {
    zIndex: 99999,
    position: "absolute",
    left: "15%",
    bottom: 20,
    background: baseColors.primaryBlue,
    color: baseColors.primaryWhite,
    width: "70%",
    textTransform: "none",
    "&:hover": {
      background: baseColors.primaryBlue,
    },
  },
  storiesText: {
    zIndex: 99999,
    position: "absolute",
    fontFamily: "PTSans-Bold",
    fontSize: 32,
    lineHeight: 1.25,
    color: baseColors.primaryWhite,
    left: 20,
    top: 0,
    maxWidth: 210,
  },
}));
