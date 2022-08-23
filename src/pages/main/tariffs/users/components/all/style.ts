import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    "@media (max-width:1100px)": {
      width: "50%",
      maxWidth: "50%",
      flexBasis: "50%",
    },
    "@media (max-width:767px)": {
      width: "100%",
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
}));
