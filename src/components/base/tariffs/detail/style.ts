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
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "90%",
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
  },
  infoWrapper: {
    display: "flex",
    alignItems: "self-start",
    flexWrap: "nowrap",
  },
  info: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.5,
    color: baseColors.primaryGrey,
    paddingLeft: 4,
  },
}));

export const useQuotaStyles = makeStyles((theme: Theme) => ({
  cost: {
    fontSize: 18,
  },
}));
