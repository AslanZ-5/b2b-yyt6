import { FC, useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Quota from "components/base/tariffs/quota";
import Slider from "components/base/tariffs/slider";
import PageProgress from "components/ui/PageProgress";
import Button from "components/ui/Button";
import TariffServices from "../services";

import { MAIN_HOST } from "constants/api";
import { Tariff } from "types/Tariff";
import { useAppSelector, useAppDispatch } from "store";
import { downloadDocumentFromBaseHost } from "helpers/documents";
import { baseColors } from "constants/colors";

import { useStyles, useQuotaStyles } from "./style";
import { fetchTariffsList, fetchCurrentTariff } from "store/slices/tariffs";
import { routes } from "constants/routes";

interface IProps {
  id: string;
  isOwn?: boolean;
}

const TariffDetail: FC<IProps> = ({ id, isOwn }) => {
  const history = useHistory();
  const classes = useStyles();
  const quotaClasses = useQuotaStyles();

  const dispatch = useAppDispatch();
  const { list, current } = useAppSelector((state) => state.tariffs);
  const { user } = useAppSelector((state) => state.user);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tariff, setTariff] = useState<Tariff | null>(null);

  // if isOwn - current
  useEffect(() => {
    if (!current?.data?.id && isOwn) {
      dispatch(fetchCurrentTariff());
    }
  }, [dispatch, current?.data?.id, isOwn]);

  useEffect(() => {
    if (current?.data?.id && isOwn) {
      setTariff(current?.data);
    }
  }, [current?.data, isOwn]);

  // not isOwn
  useEffect(() => {
    if (!list?.data?.length && !isOwn) {
      dispatch(fetchTariffsList());
    }
  }, [dispatch, isOwn, list?.data?.length]);

  useEffect(() => {
    if (list?.data?.length && id && !isOwn) {
      const tariffById = list.data.find((item) => +item.id === +id);
      if (tariffById) setTariff(tariffById);
    }
  }, [list.data, id, isOwn]);

  const handleSliderClick = (event: ChangeEvent<{}>, newValue: any) =>
    setCurrentSlide(newValue);

  if (!tariff) return <PageProgress />;

  return (
    <>
      <Grid container justify="space-between" spacing={3} id="tariffDetail">
        <Grid item xs={12} sm={6}>
          <img
            className={classes.mainImg}
            src={`${MAIN_HOST}/${tariff?.logo || ""}`}
            alt=""
          />
        </Grid>
        <Grid container direction="column" item xs={12} sm={6}>
          {/** Общее **/}
          <Box width="100%" mb={3}>
            <Grid container justify="space-between" alignItems="flex-start">
              <Grid container direction="column" item xs={6}>
                <div className={classes.name}>{tariff?.name || ""}</div>
                <div className={classes.description}>
                  {tariff?.description || ""}
                </div>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="flex-end"
                item
                xs={6}
              >
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
                <div className={classes.description}>Абонентская плата</div>
              </Grid>
            </Grid>
          </Box>
          {/** Остатки **/}
          <Grid container alignItems="center">
            {(tariff?.sliders?.length
              ? tariff?.sliders[currentSlide]?.quotas
              : tariff?.quotas
            )?.map((quota) => (
              <Grid item xs={4} key={quota.type}>
                <Quota quota={quota} additionalStyles={quotaClasses} />
              </Grid>
            )) || null}
          </Grid>
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
          {/** Инфо **/}
          <div className={classes.infoWrapper}>
            {user?.isAdmin ? (
              <Button
                text="Изменить условия тарифа"
                onClick={() =>
                  history.push(routes.personal.admin.tariffs.change)
                }
                additionalClasses={{
                  color: baseColors.primaryBlue,
                  backgroundColor: baseColors.lightBlue,
                  width: "200px",
                }}
              />
            ) : (
              <>
                <img src="/images/icons/exclamation-mark.svg" alt="" />
                <span className={classes.info}>
                  Для изменений условий тарифа обратитесь к администратору.
                </span>
              </>
            )}
          </div>
        </Grid>
      </Grid>
      {/** Услуги **/}
      <Box width="100%" mt={4} mb={3} className={classes.servicesWrapper}>
        <TariffServices services={tariff?.services} />
      </Box>
      <Box width="100%" textAlign="center" className={classes.moreDetailBtnWrapper}>
        <Button
          text="Подробное описание тарифа (PDF)"
          onClick={() =>
            downloadDocumentFromBaseHost(
              tariff.pdf,
              "Подробное описание тарифа.pdf"
            )
          }
          additionalClasses={{
            color: baseColors.primaryBlue,
            backgroundColor: baseColors.lightBlue,
            width: "275px",
          }}
        />
      </Box>
    </>
  );
};

export default TariffDetail;
