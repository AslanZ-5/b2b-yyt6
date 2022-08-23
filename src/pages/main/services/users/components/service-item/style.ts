import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    padding: "16px 20px",
    height: 200,
    "&:hover": {
      cursor: "pointer",
    },
  },
  wrapper: {
    height: "100%",
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    letterSpacing: "0.19px",
    lineHeight: 1.81,
    color: "#131313",

    marginBottom: 4,
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.29,

    marginBottom: 10,
  },
  status: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    letterSpacing: "0.19px",
    lineHeight: 1.64,

    marginLeft: 3,
  },
  moreLink: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    lineHeight: 1.64,

    color: baseColors.mainOrange,

    "&:hover": {
      cursor: "pointer",
    },
  },
  cost: {
    display: "flex",
    alignItems: "center",
  },
  costValue: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    lineHeight: 2.3,

    color: "#010101",
  },
  costText: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.93,

    paddingLeft: 7,
  },
}));
