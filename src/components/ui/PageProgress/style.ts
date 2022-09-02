import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    spinner: {
      color: baseColors.primaryBlue,
    },
  })
);
