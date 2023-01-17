import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  expensesHeaderWrapper: {
    marginBottom: 12,

    "&:first-child": {
      marginRight: 10,
    },
  },

  expensesCard: {
    width: "100%",
    boxShadow: "2px 2px 23px 0px rgba(0,0,0,0.08)",
    display: "flex",
    borderRadius: "10px",
    alignItems: "center",
    minHeight: 238,
    fontFamily: "PTSans-Regular",
    marginBottom: 30,
    "& > div": {
      height: "100%",
    },
    "&.MuiPaper-rounded": {
      borderRadius: 8,
    },
  },

  expensesCardInfo: {
    height: 262.8,
    "@media (max-width: 670px)": {
      marginTop: 16,
    },
  },
  subTitle: {
    fontSize: 20,
    fontFamily: "PTSans-Bold",
    fontWeight: "bold",
    color: baseColors.primaryBlack,
  },
  textButton: {
    color: baseColors.primaryBlue,
    fontFamily: "PTSans-Bold",
    fontWeight: "bold",
    maxHeight: 25,
    textTransform: "none",
  },
  periodButton: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    textTransform: "none",
    borderBottom: "1px dashed black",
    padding: 0,
    height: 23,
    borderRadius: 0,
    marginLeft: 5,
  },
  expensesCardCoinImg: {
    width: 12,
    height: 12,
    marginTop: 5,
    marginRight: 10,
    transition: "0.2s",
  },
  expensesCardInfoWrapper: {
    cursor: "pointer",
    "&:hover .info-dot": {
      marginLeft: 5,
    },
  },
  expensesCardInfoDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: "black",
    transition: "0.2s",
    marginTop: 5,
    marginRight: 10,
  },
  expensesCardInfoTitle: {
    fontSize: 14,
    fontFamily: "PTSans-Regular",
    color: baseColors.primaryBlack,
    transition: "0.3s",
  },
  expensesCardInfoTime: {
    fontSize: 13,
    color: baseColors.primaryGrey,
    minHeight: 19,
  },
  expensesCardInfoAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  doughnutInnerContent: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  innerContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > p": {
      fontSize: 16,
      height: 20,
      fontFamily: "PTSans-Regular",
      fontWeight: "bold",
      textAlign: "center",
    },
    "& > span": {
      fontSize: 14,
      fontFamily: "PTSans-Regular",
      display: "block",
      textAlign: "center",
      color: baseColors.primaryGrey,
    },
  },
  replenishDoughnut: {
    "@media (max-width: 820px)": {
      display: "none",
    },
  },
  tariffDoughnut: {
    cursor: "pointer",
  },
  expensesCardContent: {
    padding: "26px",
    "@media (max-width: 600px)": {
      padding: "16px",
      flexDirection: "column-reverse",
    },
  },
}));
