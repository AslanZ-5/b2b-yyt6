import { FC } from "react";
import { useHistory } from "react-router";
import { Grid, Card, CardActionArea, Box } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStyles } from "./styles";

export interface SupportCardProps {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
}

const SupportCard: FC<SupportCardProps> = ({
  title,
  description,
  imgSrc,
  link,
}) => {
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
