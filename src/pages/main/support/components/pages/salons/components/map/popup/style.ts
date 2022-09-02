import { makeStyles } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles({
  popup: {
    "& .leaflet-popup-close-button": {
      top: "10px !important",
      right: "9px !important",
    },
    "& .leaflet-popup-content-wrapper": {
      width: 340,
    },
  },
  popupContent: {
    "& p": {
      margin: 0,
      width: "auto",
    },
    "& > p:first-child": {
      margin: "20px 0",
    },
  },
  popupSchedule: {
    display: "flex",
    justifyContent: "space-between",
  },
  popupAddress: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    marginBottom: 10,
  },
  popupDay: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    color: baseColors.primaryGrey,
  },
  popupHours: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    color: baseColors.primaryBlack,
  },
});
