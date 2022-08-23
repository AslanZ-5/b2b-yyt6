import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  listWrapper: {
    overflow: "auto",
    fontFamily: "PTSans-Regular",
    height: "65%",
    fontSize: 14,
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    width: "1000px",
  },
  listRow: {
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: "PTSans-Regular",
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eff3f8",
    fontFamily: "PTSans-Regular",
  },
  checkboxField: {
    width: 60,
    minWidth: 60,
  },
  imgField: {
    width: 40,
    minWidth: 40,
  },
  phoneField: {
    width: 180,
    minWidth: 180,
  },
  phoneFieldAdditional: {
    color: "#512893",
    fontFamily: "PTSans-Bold",
    "& span": {
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#eff3f8",
        padding: 5,
      },
    },
  },
  fioField: {
    width: 180,
    minWidth: 180,
    marginRight: 40,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  accountField: {
    width: 140,
    minWidth: 140,
  },
  tariffField: {
    width: 170,
    minWidth: 170,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: 25,
  },
  simField: {
    width: 160,
    minWidth: 160,
  },
  statusField: {
    width: 160,
    minWidth: 160,
  },
  checkbox: {
    padding: 0,

    "&.Mui-checked": {
      color: baseColors.mainOrange,
    },
  },
  searchBtn: {
    fontFamily: "PTSans-Bold",
    backgroundColor: baseColors.mainOrange,
    color: "#fff",
    width: 100,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    "&:hover": {
      backgroundColor: baseColors.mainOrange,
    },
  },
  numbersInfo: {
    borderRadius: 4,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "ffffff",
    padding: "11px 18px",
  },
}));
