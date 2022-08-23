import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    backgroundColor: "#eff3f8",
    padding: "14px 16px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    paddingLeft: 5,
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 1.4,
  },
}));
