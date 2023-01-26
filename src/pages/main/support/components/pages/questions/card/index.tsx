import { FC } from "react";
import Accordion from "@material-ui/core/Accordion";
import { Grid } from "@material-ui/core";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Question } from "types/Question";
import { useStyles } from "./styles";

interface IProps {
  question: Question;
  cardView?: {
    icon?: string;
    description?: string;
  };
}

const QuestionCard: FC<IProps> = ({ question, cardView }) => {
  const classes = useStyles({ isCardView: Boolean(cardView) });

  return (
    <div className={classes.root} id={`questionAccordion-${question.id}`}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel1a-content-${question?.question}`}
          id={`panel1a-header-${question?.question}`}
        >
          {!cardView ? (
            <div className={classes.question}>{question?.question || ""}</div>
          ) : (
            <Grid container alignItems="center" justify="space-between">
              <Grid container direction="column" item xs={10}>
                <Grid container alignItems="center">
                  <img src={cardView?.icon} alt="" />
                  <span className={classes.title}>{question.question}</span>
                </Grid>
                <div className={classes.description}>
                  {cardView.description}
                </div>
              </Grid>
            </Grid>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.answer}>{question?.answer || ""}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QuestionCard;
