import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  leftContent: {
    "@media (max-width:767px)": {
      display: "none",
    },
  },
  rightContent: {
    paddingLeft: 60,
    paddingTop: 30,

    "@media (max-width:767px)": {
      paddingLeft: 0,
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  passwordInputImg: {
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
  },
  error: {
    fontFamily: "PTSans-Regular",
    color: "#f44336",
    marginBottom: 10,
    fontSize: "0.75rem",
  },
}));
