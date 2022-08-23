import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    borderRadius: 8,
    boxShadow: "2px 2px 23px 0px rgba(253, 125, 59,0.06)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    height: 48,
    "&:hover": {
      borderColor: baseColors.mainOrange,
    },
    "&::before": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none",
      },
    },
    "&.MuiInput-underline": {
      "&::after": { borderBottom: `none` },
      "&:hover:not(.Mui-disabled)::before": {
        borderBottom: `none`,
      },
    },
    "& .MuiSelect-select": {
      fontFamily: "PTSans-Regular",
      fontSize: 16,
      paddingLeft: 14,
      paddingRight: 14,
      "&:focus": {
        backgroundColor: "white",
      },
    },
  },
  menu: {
    "& .MuiMenu-paper": {
      boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.12);",
      top: "240px !important",
    },
  },
  option: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    "&.MuiListItem-root.Mui-selected": {
      fontFamily: "PTSans-Bold",
      fontSize: 16,
      backgroundColor: "#fef7f1",
    },
  },
  emptyOption: {
    height: 0,
    padding: 0,
  },
}));
