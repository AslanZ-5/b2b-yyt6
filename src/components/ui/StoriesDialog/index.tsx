import React, { memo, useState, useEffect } from "react";
import { Dialog, Slide, IconButton, DialogContent } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import Stories from "react-insta-stories";

import { useStyles } from "./style";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  show: boolean;
  handleClose: () => void;
  stories: Array<{ content: () => JSX.Element }>;
  changeStoriesList: (index: number) => void;
  index: number;
  bestOffersLength: number;
}

const StoriesDialog: React.FC<IProps> = ({
  handleClose,
  show,
  stories,
  changeStoriesList,
  index,
  bestOffersLength,
}) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (index === 0) setCurrentIndex(0);
  }, [setCurrentIndex, index]);

  return (
    <Dialog
      id="storiesDialog"
      className={`${classes.root} ${classes.paper}`}
      open={show}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogContent key={index}>
        <div className={classes.customContainer}>
          <div
            className={classes.leftSection}
            onClick={() => {
              if (index === 0 && currentIndex === 0) handleClose();
              else if (currentIndex === 0) changeStoriesList(index - 1);
              else setCurrentIndex((prev) => --prev);
            }}
          ></div>
          <div
            className={classes.rightSection}
            onClick={() => {
              if (
                index === bestOffersLength - 1 &&
                currentIndex === stories.length - 1
              )
                handleClose();
              else if (currentIndex === stories.length - 1) {
                changeStoriesList(index + 1);
                setCurrentIndex(0);
              } else if (currentIndex === 0 && stories.length === 1)
                changeStoriesList(index + 1);
              else setCurrentIndex((prev) => ++prev);
            }}
          ></div>
        </div>
        <IconButton
          onClick={() => {
            if (index === 0) handleClose();
            else {
              changeStoriesList(index - 1);
              setCurrentIndex(0);
            }
          }}
          className={`${classes.arrowBtn} ${classes.leftArrow}`}
        >
          <img src="/images/icons/arrow-previous.svg" alt="previous" />
        </IconButton>
        <IconButton className={classes.closeBtn} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (index === bestOffersLength - 1) handleClose();
            else {
              changeStoriesList(index + 1);
              setCurrentIndex(0);
            }
          }}
          className={`${classes.arrowBtn} ${classes.rightArrow}`}
        >
          <img src="/images/icons/arrow-next.svg" alt="next" />
        </IconButton>
        <Stories
          defaultInterval={10000}
          stories={stories}
          currentIndex={currentIndex}
          onAllStoriesEnd={() => {
            if (index === bestOffersLength - 1) handleClose();
            else changeStoriesList(index + 1);
          }}
          onStoryEnd={() => {
            setCurrentIndex((prev) => ++prev);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default memo(StoriesDialog);
