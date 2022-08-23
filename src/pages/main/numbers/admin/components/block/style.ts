import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    letterSpacing: 0.24,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 12,
  },
  iosMargin: {
    height: 30,
  },
  icons: {
    display: "flex",
    alignItems: "center",
  },
  iconsImg: {
    paddingLeft: 20,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export const useSelectStyles = makeStyles((theme: Theme) => ({
  root: {
    border: "none",
    "& .MuiSelect-select": {
      fontFamily: "PTSans-Bold",
      fontSize: "20px",
      letterSpacing: "0.24",
      padding: 0,
    },
  },
  menu: {
    "& .MuiMenu-paper": {
      top: "170px !important",
    },
  },
}));
