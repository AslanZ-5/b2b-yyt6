import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    padding: "16px 20px",
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    marginBottom: 3,
    color: "#131313",
  },
  date: {
    fontFamily: "PTSans-Regular",
    fontSize: 12,
    marginBottom: 16,
  },
  progress: {
    margin: "12px 0",
    height: 6,
    borderRadius: 5,
    "&.MuiLinearProgress-colorPrimary": {
      backgroundColor: baseColors.lightOrange,
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: baseColors.mainOrange,
      borderRadius: 5,
    },
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    color: "#131313",
  },
}));
