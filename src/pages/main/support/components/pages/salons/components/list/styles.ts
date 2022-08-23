import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  pageContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    padding: "20px 30px",
    marginBottom: 6,
  },
  address: {
    fontFamily: "PTSans-Bold",
    fontSize: 17,
  },
  weekDay: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    opacity: 0.4,
    textAlign: "right",
  },
  hours: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    color: "#141414",
    textAlign: "right",
  },
}));
