import { FC } from "react";

import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import StoriesDialog from "components/ui/StoriesDialog";

import { MAIN_HOST } from "constants/api";

import useBestOffers from "../../hooks/useBestOffers";

import { useStyles } from "./style";

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

const BestOffers: FC = () => {
  const classes = useStyles();
  const { stories, setStories, changeStoriesList, bestOffers } =
    useBestOffers();

  const storiesList =
    stories &&
    stories.list.map((s) => ({
      content: () => (
        <div style={{ width: "100%", height: "100%" }}>
          <h5 className={classes.storiesText}>{s.text}</h5>
          <img
            alt="story"
            src={`${MAIN_HOST}${s.img}`}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              margin: "auto",
            }}
          />
          <Button
            onClick={() => openInNewTab(stories.link)}
            className={classes.storiesBtn}
          >
            Подробнее
          </Button>
        </div>
      ),
    }));

  if (bestOffers.loading) {
    return null;
  }

  return (
    <>
      {stories && storiesList && (
        <StoriesDialog
          changeStoriesList={changeStoriesList}
          show={!!stories}
          stories={storiesList}
          index={stories.index}
          handleClose={() => setStories(null)}
          bestOffersLength={bestOffers?.data?.length || 0}
        />
      )}
      <Grid className={classes.bestOffersContainer} container wrap="wrap">
        {bestOffers.data?.map((el, i) => (
          <div style={{ padding: 10 }} key={i}>
            <ButtonBase
              className={classes.storiesWrapper}
              onClick={() =>
                setStories({ list: el.sliders, link: el.link, index: i })
              }
            >
              <img
                className={classes.storiesImg}
                src={`${MAIN_HOST}${el.sliders[0]["img"]}`}
                alt="story"
              />
              <div className={classes.storiesHighlight}></div>
            </ButtonBase>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default BestOffers;
