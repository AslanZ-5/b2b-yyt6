import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "94vh",
    minHeight: "100%",
    marginRight: 5,
    boxShadow: "5px 0 5px 0 rgba(0,0,0,0.08)",
  },
}));
