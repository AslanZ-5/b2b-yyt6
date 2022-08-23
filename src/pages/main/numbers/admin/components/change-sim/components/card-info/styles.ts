import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    padding: 25,
  },
  row: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  value: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    color: "#010101",

    whitespace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
