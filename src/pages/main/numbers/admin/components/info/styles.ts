import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "@media (max-width: 1000px)": {
      flexDirection: "column",
    },
  },
  infoContainer: {
    "@media (max-width: 1000px)": {
      flexGrow: "100%",
      maxWidth: "100%",
    },
  },
  servicesListContainer: {
    "@media (max-width: 1000px)": {
      flexGrow: "100%",
      maxWidth: "100%",
    },
  },
  pageTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
  },
}));
