import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    marginBottom: 20,
  },
  pageTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  info: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    paddingRight: 18,
  },
  searchBtn: {
    backgroundColor: baseColors.primaryBlue,
    margin: "0 auto",
    width: 35,
    minWidth: 35,
    padding: 0,
    height: 35,
    "&:hover": {
      backgroundColor: baseColors.primaryBlue,
    },
  },
  listWrapper: {
    overflow: "auto",
    fontFamily: "PTSans-Regular",
    height: "65%",
    fontSize: 14,
    marginTop: 20,
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    width: 600,
  },
  listRow: {
    fontFamily: "PTSans-Regular",
    display: "flex",
    alignItems: "center",

    paddingTop: 8,
    paddingBottom: 8,
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${baseColors.lightGrey}`,
  },
  listDateColumn: {
    width: 120,
    marginRight: 40,
  },
  listNameColumn: {
    width: 180,
    marginRight: 40,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  listCostColumn: {
    width: 120,
    marginRight: 30,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  removeButton: {
    "&:hover": { cursor: "pointer" },
  },
}));
