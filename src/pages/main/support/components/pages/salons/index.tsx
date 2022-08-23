import { FC, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useGETRequest } from "hooks/useRequest";
import { getOffices } from "api/support";
import { Office } from "types/Office";
import PageProgress from "components/ui/PageProgress";

import OfficesList from "./components/list";
import Map from "./components/map";

import { useStyles as useLocalStyles } from "./style";
import { useStyles } from "../../../style";

const Salons: FC = () => {
  const classes = useStyles();
  const localClasses = useLocalStyles();

  const { loading, data: offices } = useGETRequest<Office[]>({
    api: getOffices,
  });
  const [tab, setTab] = useState(1);

  const handlePointsType = (event: React.ChangeEvent<{}>, newValue: number) =>
    setTab(newValue);

  if (loading) return <PageProgress />;

  return (
    <>
      <Grid container id="supportSalons">
        <Grid item xs={12} sm={8}>
          <div className={classes.pageTitle}>Салоны продаж и обслуживания</div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tabs
            className={localClasses.tabs}
            value={tab}
            onChange={handlePointsType}
          >
            <Tab
              icon={<img src="/images/icons/location.svg" alt="icon" />}
              label="Карта"
            />
            <Tab
              icon={<img src="/images/icons/list.svg" alt="icon" />}
              label="Список"
            />
          </Tabs>
        </Grid>
      </Grid>
      <div>
        {tab === 1 ? (
          <OfficesList offices={offices} />
        ) : (
          <Map offices={offices} />
        )}
      </div>
    </>
  );
};

export default Salons;
