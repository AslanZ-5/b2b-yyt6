import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
  },
  subTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 16,
  },
}));
