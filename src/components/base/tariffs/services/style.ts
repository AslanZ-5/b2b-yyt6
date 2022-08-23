import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  rowContainer: {
    marginBottom: 20,
  },
  rowLabel: {
    fontFamily: "PTSans-Regular",
    fontSize: 13,
  },
  rowValue: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    minWidth: 100,
    textAlign: "right",
  },
}));
