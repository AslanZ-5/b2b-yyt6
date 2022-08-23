import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "white",
      borderRadius: 6,
    },
  },
  rotateImg: {
    transform: "rotate(180deg)",
  },
}));
