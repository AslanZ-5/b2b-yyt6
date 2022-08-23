import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: 0,
    marginTop: 0,
    color: baseColors.mainOrange,
    "& .MuiSlider-mark": {
      backgroundColor: baseColors.mainOrange,
      top: 11,
      width: 8,
      height: 8,
      marginLeft: -4,
      borderRadius: "50%",
      opacity: 0.6,
    },
    "& .MuiSlider-rail": {
      backgroundColor: baseColors.mainOrange,
      height: "4px",
      top: 13,
    },
    "& .MuiSlider-track": {
      height: "4px",
      top: 13,
    },
    "& .MuiSlider-markActive": {
      backgroundColor: baseColors.mainOrange,
      opacity: 1,
    },
    "& .MuiSlider-thumb": {
      margin: 0,
      top: 6,
      width: 18,
      height: 18,
      marginLeft: -9,
      backgroundImage: "url(/images/icons/slider-thumb.svg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
}));
