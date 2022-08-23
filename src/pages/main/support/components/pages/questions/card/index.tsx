import { FC } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Question } from "types/Question";
import { useStyles } from "./styles";

interface IProps {
  question: Question;
}

const QuestionCard: FC<IProps> = ({ question }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} id={`questionAccordion-${question.id}`}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel1a-content-${question?.question}`}
          id={`panel1a-header-${question?.question}`}
        >
          <div className={classes.question}>{question?.question || ""}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.answer}>
            {question?.answer || ""}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QuestionCard;
