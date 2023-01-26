import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors, BoldFont, RegularFont } from "constants/colors";

interface CardAccordionStylesProps {
  isCardView?: boolean;
}

export const useStyles = makeStyles<Theme, CardAccordionStylesProps>(
  (theme: Theme) => ({
    root: {
      marginBottom: 4,
      "& .MuiAccordion-root": {
        boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
        backgroundColor: baseColors.primaryWhite,
      },
      "& .MuiAccordionSummary-root": {
        borderRadius: 8,
        backgroundColor: baseColors.primaryWhite,
        padding: ({ isCardView }) => (isCardView ? "20px 24px 21px 20px" : 25),
      },
      "& MuiCollapse-container": {
        backgroundColor: baseColors.primaryWhite,
      },
      "& .MuiAccordionDetails-root": {
        padding: "0 25px 25px 25px",
      },
      "& .MuiAccordionSummary-content": {
        margin: 0,
      },
    },
    answer: {
      ...RegularFont,
      fontSize: 16,
      whiteSpace: "pre-wrap",
    },
    question: {
      ...BoldFont,
      fontSize: 16,
    },
    card: {
      overflow: "visible",
      boxShadow: "none",
    },
    title: {
      ...BoldFont,
      fontSize: 16,
      paddingLeft: 10,
    },
    description: {
      ...RegularFont,
      fontSize: 16,
      color: baseColors.primaryGrey,
      paddingLeft: 40,
    },
  })
);
