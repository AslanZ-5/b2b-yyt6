import { makeStyles } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  secondary: {
    backgroundColor: baseColors.primaryBlue,
    "&:hover": {
      backgroundColor: baseColors.primaryBlue,
    },
  },
}));
