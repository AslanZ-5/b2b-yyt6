import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    letterSpacing: 0.24,
  },
  headerInfo: {
    fontFamily: "PTSans-Bold",
    fontSize: 18,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 12,
  },
}));
