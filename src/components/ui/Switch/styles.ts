import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiFormControlLabel-root": {
      margin: 0,
    },
    "& .MuiSwitch-track": {
      border: "none",
    },
  },
}));
