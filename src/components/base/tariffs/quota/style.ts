import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  cost: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    color: "#010101",
    paddingRight: 4,
  },
  label: {
    fontFamily: "PTSans-Regular",
    fontSize: 10,
    textAlign: "left",
  },
  mainImg: {
    paddingRight: 8,
    width: 44,
  },
}));
