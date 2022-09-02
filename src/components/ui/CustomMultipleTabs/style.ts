import { baseColors } from "constants/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    flexGrow: 1,
    width: "100%",
  },
  appBar: {
    boxShadow: "none",
    background: "transparent",
    "& .Mui-disabled": {
      //display: "none"
      display: "inline-flex",
      opacity: 0.8,
    },
  },
  tabs: {
    maxWidth: "100%",
    overflow: "visible",
    minHeight: 25,
    boxShadow: `0px -2px 0px ${baseColors.secondaryGrey} inset`,
    "@media (max-width: 600px)": {
      "&  > .MuiTabs-scroller": {
        overflowX: "auto !important",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
      paddingBottom: 1,
    },
    "& .MuiButtonBase-root.MuiTab-root": {
      minWidth: "auto",
      fontSize: 14,
      marginRight: 30,
      fontFamily: "PTSans-Bold",

      "&:last-of-type": {
        marginRight: 0,
      },
      minHeight: 20,
      padding: 0,
      textTransform: "none",
      color: baseColors.primaryGrey,

      "& .MuiTab-wrapper": {
        alignItems: "flex-start",
      },

      "&.Mui-selected": {
        color: baseColors.primaryBlack,
      },
    },
  },
  indicator: {
    backgroundColor: baseColors.primaryBlue,
    top: 23,
  },
}));
