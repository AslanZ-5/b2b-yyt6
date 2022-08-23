import { FC, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import { Tariff } from "types/Tariff";
import { MAIN_HOST } from "constants/api";
import { baseColors } from "constants/colors";
import { routes } from "constants/routes";

import Quota from "components/base/tariffs/quota";
import Slider from "components/base/tariffs/slider";
import Button from "components/ui/Button";

import { useStyles, useQuotaStyles } from "./style";

interface IProps {
  tariff: Tariff;
}

const TariffCard: FC<IProps> = ({ tariff }) => {
  const history = useHistory();
  const classes = useStyles();
  const quotaClasses = useQuotaStyles();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSliderClick = (event: ChangeEvent<{}>, newValue: any) =>
    setCurrentSlide(newValue);

  const openTariffDetail = () => {
    history.push(`${routes.tariffs.users.base}/${tariff.id}`);
  };

  return (
    <div className={classes.container}>
      <div
        style={{
          backgroundImage: `url(${MAIN_HOST}/${tariff.logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100px",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      ></div>
      <div className={classes.content}>
        <div onClick={openTariffDetail}>
          <div className={classes.name}>{tariff?.name || ""}</div>
          <div className={classes.description}>{tariff?.description || ""}</div>

          {/** Остатки **/}
          <Grid container alignItems="center" className={classes.quotasContainer}>
            {(tariff?.sliders?.length
              ? tariff?.sliders[currentSlide]?.quotas
              : tariff?.quotas
            )?.map((quota) => (
              <Grid item xs={4} key={quota.type}>
                <Quota quota={quota} additionalStyles={quotaClasses} />
              </Grid>
            )) || null}
          </Grid>
        </div>

        {/** Слайдер **/}
        <div className={classes.slider}>
          {tariff?.sliders?.length ? (
            <Slider
              onChange={handleSliderClick}
              marks={tariff?.sliders?.map((el, i) => ({
                value: i,
              }))}
              value={currentSlide}
              max={tariff?.sliders?.length - 1}
            />
          ) : null}
        </div>
        <div onClick={openTariffDetail}>
          {/** Стоимость **/}
          <div className={classes.regularPrice}>
            <span className={classes.boldPrice}>
              {tariff?.sliders?.length
                ? tariff?.sliders[currentSlide].price
                : tariff?.price}
            </span>
            {` `}
            {tariff?.sliders?.length
              ? tariff?.sliders[currentSlide].unit
              : tariff?.unit}
          </div>

          {/** Подробнее **/}
          <div className={classes.buttonMore}>
            <Button
              text="Подробнее"
              onClick={() => {}}
              additionalClasses={{
                color: baseColors.darkOrange,
                backgroundColor: baseColors.lightOrange,
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
