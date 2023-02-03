import { makeStyles } from "@material-ui/core/styles";
import {
  baseColors,
  RegularFont,
  BoldRegularFont,
  BoldFont,
} from "constants/colors";

export const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontSize: 16,
    marginBottom: 27,
    ...BoldFont,
  },
  topText: {
    fontSize: 16,
    marginBottom: 5,
    ...BoldRegularFont,
  },
  bottomText: {
    fontSize: 14,
    color: baseColors.primaryGrey,
    ...RegularFont,
  },
  detailSectionDivider: {
    height: 3,
    backgroundColor: baseColors.lightGrey,
    border: "none",
    margin: "20px 0",
  },
}));
