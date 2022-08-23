import { FC, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import CustomMultipleTabs from "components/ui/CustomMultipleTabs";
import PageProgress from "components/ui/PageProgress";
import Search from "components/ui/Search";

import useCategories from "./hooks/useCategories";
import useFilteredServices from "./hooks/useFilteredServices";

import ServiceItem from "./components/service-item";
import ServiceDialog from "./components/service-dialog";
import { Service } from "types/Service";

import { useStyles as useSearchStyles } from "./hooks/useSearchStyles";
import { useStyles } from "./style";

const All: FC = () => {
  const classes = useStyles();
  const searchClasses = useSearchStyles();

  const [search, setSearch] = useState("");
  const [isOnlyConnectedServices, setIsOnlyConnectedServices] = useState(false);
  const [costTab, setCostTab] = useState<0 | 1>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogService, setDialogService] = useState<Service | null>(null);

  const {
    loading: categoriesLoading,
    currentCategory,
    setCurrentCategory,
    categories,
  } = useCategories();
  const { loading: servicesLoading, services } = useFilteredServices({
    currentCategory,
    isOnlyConnectedServices,
    costTab,
    search,
  });

  const handleChangeCostTab = (event: React.ChangeEvent<{}>, newValue: 0 | 1) =>
    setCostTab(newValue);
  const handleChangeCheckbox = () =>
    setIsOnlyConnectedServices(!isOnlyConnectedServices);
  const openServiceDialog = (service: Service) => {
    setOpenDialog(true);
    setDialogService(service);
  };

  if (categoriesLoading || servicesLoading) return <PageProgress />;

  return (
    <div>
      <ServiceDialog
        open={openDialog}
        setOpen={setOpenDialog}
        service={dialogService}
      />
      <div className={classes.title} id="userServicesTitle">
        Услуги
      </div>
      <Grid container alignItems="center" className={classes.topPanel}>
        <Grid item sm={8} id="userServicesCategoriesTabs">
          <CustomMultipleTabs
            tabs={categories}
            value={currentCategory}
            handleChangeTabs={setCurrentCategory}
          />
        </Grid>
        <Grid item sm={4} id="userServicesSearch">
          <Search
            value={search}
            setValue={setSearch}
            placeholder="Поиск услуги"
            additionalStyles={searchClasses}
            startAdornment={<img src="/images/icons/search.svg" alt="reset" />}
            endAdornment={
              <Button className={searchClasses.searchBtn}>
                <img src="/images/icons/arrow-right.svg" alt="reset" />
              </Button>
            }
          />
        </Grid>
      </Grid>
      <Box width="100%" mt={3}>
        <Grid container justify="space-between" alignItems="center">
          <FormControlLabel
            id="userServicesCheckbox"
            className={classes.connectedCheckBox}
            control={
              <Checkbox
                checked={isOnlyConnectedServices}
                onChange={handleChangeCheckbox}
                color="default"
              />
            }
            label="Только подключенные услуги"
          />
          <Tabs
            id="userServicesCostTabs"
            className={classes.costTabs}
            value={costTab}
            onChange={handleChangeCostTab}
          >
            <Tab label="Платные" />
            <Tab label="Бесплатные" />
          </Tabs>
        </Grid>
      </Box>
      <Box width="100%" mt={2}>
        <Grid container spacing={3} id="userServicesList">
          {services.map((service) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={service.id}
              id="userServicesListItem"
            >
              <ServiceItem service={service} openDialog={openServiceDialog} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default All;
