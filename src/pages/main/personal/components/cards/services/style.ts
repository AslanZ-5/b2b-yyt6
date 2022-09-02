import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

interface StyleProps {
  isAdmin: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  servicesCard: {
    //minHeight: (props) => (props.isAdmin ? 200 : 190),
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: "10px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "2px 2px 23px 0px rgba(0,0,0,0.08)",
    "&:hover": {
      cursor: "pointer",
    },
  },
  innerContent: {
    position: "absolute",
    width: 95,
    height: 95,
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > p": {
      fontSize: 16,
      height: 20,
      fontFamily: "PTSans-Bold",
      textAlign: "center",
    },
    "& > span": {
      fontSize: 13,
      fontFamily: "PTSans-Regular",
      display: "block",
      textAlign: "center",
      color: baseColors.primaryGrey,
    },
  },
  addDoughnut: {
    //padding: 10,
    "@media (max-width:1020px)": {
      display: "none",
    },
    "& > div": {
      transition: "0.5s",
      cursor: "pointer",
      borderRadius: "50%",
      width: 80,
      height: 80,
      border: `10px solid ${baseColors.lightGrey}`,
      display: "flex",
      justifyContent: " center",
      alignItems: "center",
    },
    "& > p": {
      fontSize: 14,
      fontFamily: "PTSans-Regular",
      textAlign: "center",
      paddingTop: 8,
    },
    "& svg": {
      transition: "0.5s",
      fontSize: 35,
      color: baseColors.secondaryGrey,
    },
    "&:hover": {
      "& > div": {
        transition: "0.5s",
        background: baseColors.lightGrey,
      },
      "& svg": {
        transition: "0.5s",
        color: baseColors.primaryAqua,
      },
    },
  },
  addBtn: {
    width: "50%",
    marginTop: 15,
    fontFamily: "PTSans-Bold",
    textTransform: "none",
    backgroundColor: baseColors.lightBlue,
    color: baseColors.primaryBlue,
    "@media (min-width: 1020px)": {
      display: "none",
    },
  },
}));
