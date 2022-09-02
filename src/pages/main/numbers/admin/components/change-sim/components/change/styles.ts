import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  subTitle: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    color: baseColors.primaryBlack,

    marginTop: 30,
    marginBottom: 16,
  },
}));
