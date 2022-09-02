import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .thumb-vertical": {
      backgroundColor: baseColors.primaryBlue,
      borderRadius: 6,
      opacity: 0.8,
    },
    "& .track-vertical": {
      position: "absolute",
      width: 6,
      right: 2,
      bottom: 2,
      top: 2,
      backgroundColor: baseColors.lightGrey,
      borderRadius: 6,
    },
    "& .thumb-horizontal": {
      backgroundColor: baseColors.primaryBlue,
      borderRadius: 6,
      opacity: 0.8,
    },
    "& .track-horizontal": {
      position: "absolute",
      height: 6,
      bottom: 2,
      right: 2,
      left: 2,
      backgroundColor: baseColors.lightGrey,
      borderRadius: 6,
    },
  },
}));
