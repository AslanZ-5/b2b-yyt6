import { makeStyles } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles({
  inputAttach: {
    display: "inline-flex",
    minWidth: 142,
    "& input": {
      width: 0.1,
      height: 0.1,
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      zIndex: -1,
      "@media (max-width: 600px)": {
        width: "100%",
      },
    },
    "& label": {
      cursor: "pointer",
      "& span": {
        "&:first-of-type": {
          marginRight: 6,
          position: "relative",
          top: 2,
        },
        "&:last-of-type": {
          fontFamily: "PTSans-Bold",
          color: baseColors.mainOrange,
        },
      },
    },
  },
});
