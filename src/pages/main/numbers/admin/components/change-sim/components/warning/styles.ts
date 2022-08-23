import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    paddingLeft: 7,
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
  },
}));
