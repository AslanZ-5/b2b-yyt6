import { FC, useState, ChangeEvent } from "react";

import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import { MAIN_HOST } from "constants/api";
import Quota from "components/base/tariffs/quota";
import TariffSlider from "components/base/tariffs/slider";
import InfoDialog from "components/base/tariffs/detail-dialog";

import { AvailableTariff } from "../../hooks/useTariffs";
import { useStyles } from "./styles";
import { useAppSelector } from "store";

interface IProps {
  tariff: AvailableTariff;
  selectedTariff: AvailableTariff | null;
  setSelectedTariff: (tariff: AvailableTariff | null) => void;
}

const TariffCard: FC<IProps> = ({
  tariff,
  selectedTariff,
  setSelectedTariff,
}) => {
  const {current} = useAppSelector(state => state.tariffs);
  const classes = useStyles();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const openCollapse = selectedTariff?.tariff_id === tariff.tariff_id;

  const handleCollapseClick = () =>
    setSelectedTariff(openCollapse ? null : tariff);

  const handleSliderClick = (event: ChangeEvent<{}>, newValue: any) =>
    setCurrentSlide(newValue);

  return (
    <div
      className={`${classes.container} ${
        openCollapse ? classes.highlightContainer : ""
      }`}
    >
      <InfoDialog open={openDialog} setOpen={setOpenDialog} tariff={tariff} isOwn={tariff.id === current.data?.id}/>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.header}
        onClick={handleCollapseClick}
      >
        <Grid container alignItems="center" wrap="nowrap" item sm={10}>
          <img
            src={`${MAIN_HOST}/${tariff.logo}`}
            className={classes.mainImg}
            alt=""
          />
          <span className={classes.name}>{tariff.name}</span>
        </Grid>
        <Grid container justify="flex-end" item sm={2}>
          <IconButton
            className={`${openCollapse ? classes.expandOpen : ""}`}
            aria-expanded={openCollapse}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div className={classes.description}>{tariff.description}</div>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <Grid container alignItems="center">
          {(tariff?.sliders?.length
            ? tariff?.sliders[currentSlide]?.quotas
            : tariff?.quotas
          )?.map((quota) => (
            <Grid item xs={4} key={quota.type}>
              <Quota quota={quota} />
            </Grid>
          )) || null}
        </Grid>
        {tariff?.sliders?.length ? (
          <div className={classes.slider}>
            <TariffSlider
              onChange={handleSliderClick}
              marks={tariff?.sliders?.map((el, i) => ({
                value: i,
              }))}
              value={currentSlide}
              max={tariff?.sliders?.length - 1}
            />
          </div>
        ) : null}
        <div className={classes.more} onClick={() => setOpenDialog(true)}>
          Подробнее
        </div>
      </Collapse>
    </div>
  );
};

export default TariffCard;
