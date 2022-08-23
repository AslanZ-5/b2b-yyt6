import { FC } from "react";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import Balances from "components/base/balances";
import BackLink from "components/ui/BackLink";

const BalancesPage: FC = () => {
  const history = useHistory();
  return (
    <div id="balancesPage">
      <Box mb="12px">
        <BackLink onClick={() => history.goBack()}>Назад</BackLink>
      </Box>
      <Balances />
    </div>
  );
};

export default BalancesPage;
