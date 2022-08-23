import { FC, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import { useStyles } from "./style";

interface IProps {
  label: string;
  info: string;
}

const SettingAccordion: FC<IProps> = ({ label, info, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root} id="settingAccordion">
      <Accordion>
        <AccordionSummary
          onClick={() => setOpen(!open)}
          expandIcon={
            <div
              onClick={() => setOpen(!open)}
              className={classes.actionsButton}
            >
              {open ? "Отмена" : "Изменить"}
            </div>
          }
          aria-controls={`panel1a-content-${label}`}
          id={`panel1a-header-${label}`}
        >
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <div className={classes.label}>{label}</div>
            </Grid>
            <Grid item xs={7}>
              <div className={classes.info}>{info}</div>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SettingAccordion;
