import { baseColors } from "constants/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    width: "100%",
    alignItems: "flex-start",
    textAlign: "start",
    paddingTop: 30,
    "& .MuiTabs-scroller.MuiTabs-scrollable": {
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      minHeight: 48,
      minWidth: "100%",
      "&.MuiTab-textColorInherit": {
        opacity: 1,
      },
      "& .MuiTab-wrapper": {
        fontSize: 14,
        textTransform: "capitalize",
        fontFamily: "PTSans-Regular",
        display: "flex",
        color: baseColors.primaryBlack,
        flexDirection: "row",
        justifyContent: "flex-start",
        "& img": {
          margin: "0 20px 0 0",
          width: 22,
          height: 22,
          /*filter:
            "invert(0%) sepia(30%) saturate(40%) hue-rotate(340deg) brightness(102%) contrast(85%)",*/
        },
        "@media (max-width:960px)": {
          fontSize: 13,
          "& img": {
            margin: "0 5px 0 0",
          },
        },
        "@media (max-width:767px)": {
          fontSize: 16,
          "& img": {
            margin: "0 20px 0 0",
          },
        },
      },
    },
    "& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorInherit.Mui-selected": {
      color: baseColors.secondaryGrey,
      backgroundColor: baseColors.secondaryGrey,
      fontWeight: "bold",
      "& img": {
        filter:
          "invert(56%) sepia(25%) saturate(1726%) hue-rotate(335deg) brightness(101%) contrast(91%)",
      },
    },
  },
  tabContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  subTabs: {
    display: "flex",
    flexDirection: "column",
    "& .MuiButtonBase-root": {
      paddingLeft: 42,
    },
  },
  tabPointer: {
    position: "absolute",
    right: 10,
    top: 15,
    "&:hover": {
      cursor: "pointer",
    },
  },
  activeTab: {
    borderRight: `2px solid ${baseColors.primaryAqua}`,
    backgroundColor: baseColors.lightAqua,

    "& .MuiTab-wrapper": {
      fontFamily: "PTSans-Bold !important",
    },
  },
  rotateImg: {
    transform: "rotate(180deg)",
  },
  indicator: {
    backgroundColor: "transparent",
  },
  exitBtn: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 35,
    color: baseColors.primaryBlue,
    height: 52,
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    "& img": {
      width: 16,
      height: 16,
      filter:
        "invert(92%) sepia(3%) saturate(7113%) hue-rotate(91deg) brightness(96%) contrast(81%)",
      marginRight: 20,
    },
    textTransform: "none",
    "@media (min-width:767px)": {
      display: "none",
    },
  },
}));
