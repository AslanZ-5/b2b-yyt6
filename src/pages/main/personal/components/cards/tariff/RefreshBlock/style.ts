import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  refreshBlock: {
    cursor: "pointer",
  },
  refreshBlockText: {
    fontFamily: "PTSans-Regular",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: 0.94,
    letterSpacing: "0.15px",
    color: baseColors.primaryBlue,
    display: "flex",
    alignItems: "center",
    marginRight: "6px",
  },
  refreshBlockIconWrapper: {
    display: "flex",
    alignItems: "center",
    width: 20,
    height: 20,
    "& img": {
      width: "20px",
      height: "20px",
      margin: 0,
    },
  },
  refreshBlockIconRotate: {
    animation: "$rotation 1s",
  },
  "@keyframes rotation": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
}));
