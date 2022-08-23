import { FC, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { Service } from "types/Tariff";
import CustomMultipleTabs from "components/ui/CustomMultipleTabs";
import { useAppSelector } from "store";

import { useStyles } from "./style";

interface IProps {
  services: Service[];
}

const TariffServices: FC<IProps> = ({ services }) => {
  const classes = useStyles();
  const { appInfo } = useAppSelector((state) => state.app);

  const [currentTab, setCurrentTab] = useState(
    services?.length ? services[0].name : ""
  );
  const tabs = services?.length
    ? services.map((el) => ({ id: el.name, name: el.name }))
    : [];

  const units = appInfo?.categories?.units || [];

  const handleTabClick = (event: React.ChangeEvent<{}>, newValue: string) =>
    setCurrentTab(newValue);

  return (
    <>
      <Box width="100%" mb={4}>
        <CustomMultipleTabs
          handleChangeTabs={handleTabClick}
          value={currentTab}
          tabs={tabs}
        />
      </Box>
      {services?.map((serviceItem) =>
        currentTab === serviceItem.name ? (
          <div key={serviceItem.name}>
            {serviceItem?.descriptions.map((descItem) => (
              <Grid
                key={descItem.title}
                className={classes.rowContainer}
                container
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
              >
                <div className={classes.rowLabel}>{descItem?.title || ""}</div>
                <div className={classes.rowValue}>
                  {+descItem?.value === -1 ? (
                    <img src="/images/icons/endless.svg" alt="" />
                  ) : (
                    `${descItem?.value || ""} ${
                      units[units.findIndex((e) => e.id === descItem.unit_id)]
                        .name
                    }`
                  )}
                </div>
              </Grid>
            ))}
          </div>
        ) : null
      )}
    </>
  );
};

export default TariffServices;
