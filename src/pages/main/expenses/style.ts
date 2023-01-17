import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors, BoldRegularFont } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  detalizationHeader: {
    marginTop: 10,
    marginBottom: 16,
    "& > h6": {
      ...BoldRegularFont,
      fontSize: 20,
      color: baseColors.primaryBlack,
      display: "flex",
      alignItems: "center",
      "& > div:first-child": {
        marginLeft: 10,
      },
    },
  },
  detalizationSearch: {
    padding: 8,
    boxShadow: "2px 2px 23px 0px rgba(0,0,0,0.08)",
    marginBottom: 10,
    "&.MuiPaper-rounded": {
      borderRadius: 8,
    },
  },
  detalizationSearchIcon: {
    marginLeft: 10,
    width: 14,
    height: 14,
  },
  detalizationSearchInput: {
    border: "none",
    width: "calc(100% - 40px)",
    outline: "none",
    marginLeft: 10,
  },
  searchBtn: {
    textTransform: "none",
    marginLeft: 25,
    backgroundColor: baseColors.primaryBlue,
    color: baseColors.primaryWhite,
    padding: "8px 32px",
    "&:hover": {
      backgroundColor: baseColors.primaryBlue,
    },
  },
  categoryBlock: {
    marginBottom: 22,
  },

  detalizationButton: {
    background: "white",
    width: 28,
    height: 28,
    padding: 0,
    borderRadius: 4,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    marginLeft: 19,
    "&:hover": {
      backgroundColor: "white",
    },
  },

  formControlLabel: {
    "& .MuiTypography-root": {
      fontSize: 14,
    },
    "&.MuiFormControlLabel-root": {
      margin: 0,
    },
    "@media (max-width:599px)": {
      "&.MuiFormControlLabel-root": {
        marginRight: "auto",
        marginTop: 24,
        "& .MuiButtonBase-root.MuiIconButton-root": {
          padding: "5px 5px 5px 0",
        },
      },
    },
  },

  mobileHide: {
    "@media (max-width:599px)": {
      display: "none",
    },
  },
  mobileShow: {
    marginBottom: 20,
    fontSize: 18,
    "@media (max-width:599px)": {
      display: "inline-block",
    },
    "@media (min-width:599px)": {
      display: "none",
    },
  },
  emptyCostsText: {
    fontSize: "14px",
    lineHeight: 1.29,
    marginBottom: "22px",
    letterSpacing: "normal",
    textAlign: "center",
    color: baseColors.primaryGrey,
  },
  errorText: {
    color: baseColors.error,
    minHeight: 24,
    width: "100%",
  },
  form: {
    "@media (max-width: 400px)": {
      minWidth: "auto",
    },
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    height: 36,
    width: "100%",
    "@media (max-width: 400px)": {
      width: "80%",
    },
    boxSizing: "border-box",
    border: `1px solid ${baseColors.secondaryGrey}`,
    borderRadius: 5,
    paddingLeft: 10,
    outline: "none",
    "&:focus::placeholder ": {
      color: "transparent",
    },
  },
  errorBorder: {
    border: "1px solid red !important",
  },
  submitBtn: {
    textTransform: "none",
    background: baseColors.primaryBlue,
    color: baseColors.primaryWhite,
    marginTop: 10,
    padding: "5px 36px",
    "&:hover": {
      background: baseColors.primaryBlue,
    },
  },
}));
