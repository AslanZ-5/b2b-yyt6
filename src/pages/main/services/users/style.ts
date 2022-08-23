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
  topPanel: {
    "@media (max-width: 600px)": {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
      "& > div": {
        width: "100%",
      },
    },
    "& > div:first-child": {
      paddingRight: 20,
    },
  },
  connectedCheckBox: {
    "& .MuiTypography-root": {
      fontFamily: "PTSans-Regular",
      fontSize: 14,
    },
    "& .Mui-checked": {
      color: baseColors.mainOrange,
    },
    "& .MuiCheckbox-root": {
      color: "#a1a1a1",
    },
  },
  costTabs: {
    height: 32,
    minHeight: 32,
    "& .MuiTabs-indicator": {
      background: "none",
    },
    "& .MuiTabs-flexContainer": {
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .MuiButtonBase-root.MuiTab-root": {
      fontFamily: "PTSans-Bold",
      fonstSize: 14,
      color: "#a1a1a1",
      minHeight: 32,
      minWidth: "auto",
      marginRight: 20,
      textTransform: "none",
      justifyContent: "center",
      padding: 0,
      "& .MuiTab-wrapper": {
        zIndex: 10,
        height: "100%",
        maxHeight: 18,
      },
      "&.Mui-selected": {
        color: baseColors.mainOrange,
        "& .MuiTab-wrapper": {
          height: "100%",
          maxHeight: 25,
          border: "none",
          textDecoration: "none",
        },
      },
    },
  },
}));
