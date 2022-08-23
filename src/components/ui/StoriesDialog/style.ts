import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    "& .MuiPaper-root": {
      background: "rgba(255,255,255,0)",
      overflow: "visible",
    },
    "& .MuiDialogContent-root": {
      position: "relative",
      width: "inherit",
      height: "inherit",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 0,
      overflow: "visible",
      background: "rgba(255,255,255,0)",
      "& > div:last-child": {
        width: "100% !important",
        height: "100% !important",
        "& > div:nth-child(2)": {
          display: "block",
          width: "100% !important",
          height: "100% !important",
        },
      },
    },
    "& .MuiPaper-elevation24": {
      boxShadow: "none",
    },
  },
  paper: {
    margin: 0,
    borderRadius: 10,
    height: "100%",
    maxWidth: "100%",
    maxHeight: 800,
    "@media (max-width: 1300px)": {
      maxHeight: "100%",
    },
  },
  closeBtn: {
    position: "absolute",
    zIndex: 1000,
    padding: 5,
    right: 5,
    top: 20,
  },
  stories: {
    width: 10,
  },
  arrowBtn: {
    position: "absolute",
    padding: 0,
    width: 40,
    height: 40,
    "& img": {
      width: 40,
      height: 40,
    },
    zIndex: 1000,
    top: "calc(50% - 40px)",
  },
  leftArrow: {
    left: -50,
    "@media (max-width:800px)": {
      left: 5,
    },
  },
  rightArrow: {
    right: -50,
    "@media (max-width:800px)": {
      right: 5,
    },
  },
  customContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
  },
  leftSection: {
    width: "50%",
    zIndex: 1000,
  },
  rightSection: {
    width: "50%",
    zIndex: 1000,
  },
}));
