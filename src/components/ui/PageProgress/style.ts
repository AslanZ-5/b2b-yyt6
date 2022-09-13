import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    },
    spinner: {
      color: baseColors.primaryBlue,
    },
  })
);
