import { FC } from "react";
import { useHistory } from "react-router";

import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";

import { useStyles } from "./styles";

interface IProps {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
}

const SupportCard: FC<IProps> = ({ title, description, imgSrc, link }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box width="100%" mb="12px" id="supportListItem">
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push(link)}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.container}
          >
            <Grid container direction="column" item xs={10}>
              <Grid container alignItems="center">
                <img src={imgSrc} alt="" />
                <span className={classes.title}>{title}</span>
              </Grid>
              <div className={classes.description}>{description}</div>
            </Grid>
            <Grid container justify="flex-end" item xs={2}>
              <ChevronRightIcon />
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default SupportCard;
