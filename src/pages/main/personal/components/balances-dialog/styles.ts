import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  paper: {
    padding: "30px 40px",
    borderRadius: 12,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    width: 600,
    position: "relative",
  },
}));
