import { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { useAppSelector } from 'store';

import TariffCard from './card';
import { useStyles } from './style';

const TariffsList: FC = () => {
  const {
    list: { data: tariffs },
  } = useAppSelector(state => state.tariffs);
  const classes = useStyles();

  return (
    <Grid container alignItems='flex-start' spacing={2} id='userTariffsList'>
      {tariffs.length ? (
        tariffs?.map(tariff => (
          <Grid key={tariff.tariff_id} item xs={12} sm={4} className={classes.listItem} id='userTariffsListItem'>
            <TariffCard tariff={tariff} />
          </Grid>
        ))
      ) : (
        <Typography className={classes.infoTitle} variant='h5'>
          Нет доступных тарифов
        </Typography>
      )}
    </Grid>
  );
};

export default TariffsList;
