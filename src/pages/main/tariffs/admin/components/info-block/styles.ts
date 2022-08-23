import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
  },
  header: {
    display: "flex",
    alignItems: "center",

    marginBottom: 9,
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    lineHeight: 1.14,

    marginLeft: 7,
  },
  listItem: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.14,

    marginBottom: 7,
  },
}));
