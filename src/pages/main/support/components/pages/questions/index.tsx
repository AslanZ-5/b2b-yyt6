import { FC, useState, useEffect } from "react";
import Box from "@material-ui/core/Box";

import CustomMultipleTabs from "components/ui/CustomMultipleTabs";
import PageProgress from "components/ui/PageProgress";

import { useAppSelector, useAppDispatch } from "store";
import { fetchAppInfo } from "store/slices/app";
import { useGETRequest } from "hooks/useRequest";
import { Question } from "types/Question";
import { getQuestions } from "api/support";

import QuestionCard from "./card";
import { useStyles } from "../../../style";

const Questions: FC = () => {
  const classes = useStyles();

  const { appInfo, loading: appInfoLoading } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();
  const { loading: questionsLoading, data: questions } = useGETRequest<
    Question[]
  >({ api: getQuestions });

  const [tab, setTab] = useState(1);
  const tabs = appInfo?.categories?.faq_categories || [];
  const handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (!appInfo?.categories?.faq_categories) dispatch(fetchAppInfo());
  }, [appInfo?.categories?.faq_categories, dispatch]);

  if (appInfoLoading || questionsLoading) return <PageProgress />;

  return (
    <div id="supportFaq">
      <div className={classes.pageTitle}>Вопрос / Ответ</div>
      <CustomMultipleTabs
        handleChangeTabs={handleChangeTabs}
        value={tab}
        tabs={tabs}
      />
      <Box mt="20px" mb="20px">
        {questions
          ?.filter((question) => question.categories.includes(tab))
          .map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
      </Box>
    </div>
  );
};

export default Questions;
