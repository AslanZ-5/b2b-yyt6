import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  middleContent: {
    position: "absolute",
    left: "31%",
    top: "26%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    textAlign: "center",
    paddingTop: 10,
  },
}));
