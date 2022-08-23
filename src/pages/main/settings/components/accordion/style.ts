import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiAccordion-root": {
      boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
      backgroundColor: "#ffffff",
    },
    "& .MuiAccordionSummary-root": {
      borderRadius: 8,
      backgroundColor: "#ffffff",
      padding: 25,
    },
    "& MuiCollapse-container": {
      backgroundColor: "#ffffff",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0 25px 25px 25px",
    },
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "none",
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
  },
  label: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  info: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
  },
  actionsButton: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    color: baseColors.mainOrange,
  },
}));
