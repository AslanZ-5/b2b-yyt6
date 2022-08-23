import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "& .MuiDialog-paper": {
      width: 580,
      padding: 25,
      borderRadius: 12,
    },
  },
  header: {
    marginBottom: 20,
    width: "100%",
  },
  listHeader: {
    borderBottom: "1px solid #eff3f8",
  },
  listItem: {
    fontFamily: "PTSans-Regular",
    fontSiaze: 14,
    lineHeight: 1.14,
    paddingTop: 9,
    paddingBottom: 9,

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  dialogButton: {
    width: 22,
    height: 20,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
