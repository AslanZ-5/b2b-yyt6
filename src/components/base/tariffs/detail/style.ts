import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from 'constants/colors';

export const useStyles = makeStyles((theme: Theme) => ({
  mainImg: {
    maxWidth: "100%",
    width: "100%",
  },
  name: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    lineHeight: 2,
    color: baseColors.primaryBlack,

    "@media (max-width:767px)": {
      fontSize: 16,
      lineHeight: "21px",
    },
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "90%",

    "@media (max-width:767px)": {
      fontSize: 12,
      lineHeight: "16px",
    },
  },
  regularPrice: {
    textAlign: "center",
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 2,
  },
  boldPrice: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    lineHeight: 2,
    color: baseColors.primaryBlack,
  },
  slider: {
    width: "92%",
    margin: "0 auto",
    marginTop: 15,
    marginBottom: 24,
    height: 31,

    "@media (max-width:767px)": {
      display: "none",
    },
  },
  infoWrapper: {
    display: "flex",
    alignItems: "self-start",
    flexWrap: "nowrap",

    "@media (max-width:767px)": {
      justifyContent: "center",
      "& .MuiButton-root": {
        width: "100%",
      },
    },
  },
  info: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.5,
    color: baseColors.primaryGrey,
    paddingLeft: 4,
  },
  servicesWrapper: {
    "@media (max-width:767px)": {
      marginTop: 16,
    },
  },
  moreDetailBtnWrapper: {
    "@media (max-width:767px)": {
      "& .MuiButton-root": {
        width: "100%",
        lineHeight: "14px"
      },
    },
  },
}));

export const useQuotaStyles = makeStyles((theme: Theme) => ({
  cost: {
    fontSize: 18,
  },
}));
