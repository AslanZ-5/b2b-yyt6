import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import BackLink from "components/ui/BackLink";

const BackNavigate: FC = () => {
  const history = useHistory();

  return (
    <Box mb="12px">
      <BackLink onClick={() => history.goBack()}>Назад</BackLink>
    </Box>
  );
};

export default BackNavigate;
