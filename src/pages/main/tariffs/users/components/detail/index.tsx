import { FC } from "react";
import { useParams, useHistory } from "react-router";
import Box from "@material-ui/core/Box";

import BackLink from "components/ui/BackLink/index";
import TariffDetail from "components/base/tariffs/detail";

const Detail: FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const backHandler = () => history.goBack();

  return (
    <>
      <Box mb="20px">
        <BackLink onClick={backHandler}>Назад</BackLink>
      </Box>
      <TariffDetail id={params.id} />
    </>
  );
};

export default Detail;
