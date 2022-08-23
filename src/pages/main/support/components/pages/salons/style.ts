import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    height: 32,
    minHeight: 32,
    "& .MuiTabs-indicator": {
      background: "none",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "flex-end",
      "@media (max-width: 599px)": {
        justifyContent: "flex-start",
      },
    },
    "& .MuiButtonBase-root.MuiTab-root": {
      fontFamily: "PTSans-Bold",
      minHeight: 32,
      minWidth: "auto",
      marginRight: 20,
      textTransform: "none",
      justifyContent: "center",
      padding: 0,
      color: "#a1a1a1",
      "& .MuiTab-wrapper": {
        zIndex: 10,
        height: "100%",
        flexDirection: "row",
        borderBottom: "1px dashed black",
        "& > img": {
          margin: "0 5px 0 0",
          filter:
            "invert(0%) sepia(30%) saturate(40%) hue-rotate(340deg) brightness(102%) contrast(85%)",
        },
      },
      "&.Mui-selected": {
        color: baseColors.mainOrange,
        "& .MuiTab-wrapper": {
          height: "100%",
          maxHeight: 25,
          border: "none",
          textDecoration: "none",
          "& > img": {
            filter:
              "invert(56%) sepia(25%) saturate(1726%) hue-rotate(335deg) brightness(101%) contrast(91%)",
          },
        },
      },
    },
  },
}));
