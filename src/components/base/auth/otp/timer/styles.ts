import { makeStyles, Theme } from "@material-ui/core";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  timerContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  resendSms: {
    fontFamily: "SF Pro Display Regular",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "22.4px",
    marginBottom: 30,
    textAlign: "left",
    cursor: "pointer",
    color: baseColors.primaryBlack,
  },
  timerSeconds: {
    fontFamily: "SF Pro Display Regular",
    fontSize: "12px",
    marginBottom: 30,
    textAlign: "center",
    color: baseColors.primaryBlack,
  },
}));
