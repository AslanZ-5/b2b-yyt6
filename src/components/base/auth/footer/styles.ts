import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: "0 92px",
    columnGap: "40px",
    justifyContent: "space-between",
    "@media (max-width:768px)": {
      justifyContent: "center",
      flexWrap: "wrap",
    },
    "@media (max-width:434px)": {
      flexWrap: "wrap",
      padding: "0 20px",
    },
  },
  elementContainer: {
    height: "40px",
    display: "flex",
    alighItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  elementDescription: {
    display: "flex",
    fontFamily: "SF Pro Display Regular",
    textAlign: "start",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",    
    "@media (max-width:768px)": {
      height: "40px",
      rowGap: "10px",
    },
    "@media (max-width:434px)": {
      padding: "0",
    },
  },
  elementHotline: {
    display: "flex",
    width: "145px",
    height: "40px",
    flexWrap: "wrap",
  },
  hotLineText: {
    fontFamily: "SF Pro Display Regular",
    fontSize: "10px",
    fontWeight: 600,
    color: baseColors.primaryGrey,
    alignSelf: "start",
  },
  socialText: {
    width: "100px",
  },
  number:{
    textDecoration:"none",
     color:"#000"
  },
  acceptRulesText: {
    "@media (max-width:768px)": {
      width: "343px",
      marginTop: "10px",
      padding: "0 16px",
    },
  },
}));
