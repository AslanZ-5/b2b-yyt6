import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  backLinkContainer: {
    minWidth: 70,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  backLinkText: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    color: baseColors.primaryBlue,
  },
}));
