import { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "store";
import { fetchBestOffers } from "store/slices/bestOffers";

const useBestOffers = () => {
  const { data, loading } = useAppSelector((state) => state.bestOffers);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [stories, setStories] = useState<{
    list: Array<{
      text: string;
      img: string;
      timer: number;
    }>;
    link: string;
    index: number;
  } | null>(null);

  useEffect(() => {
    if (!user?.isAdmin) dispatch(fetchBestOffers());
  }, [dispatch, user?.isAdmin]);

  const changeStoriesList = (index: number) => {
    if (data) {
      const modifiedIndex =
        index < 0 ? data.length - 1 : index > data.length - 1 ? 0 : index;
      setStories({
        list: data[modifiedIndex].sliders,
        link: data[modifiedIndex].link,
        index: modifiedIndex,
      });
    }
  };

  return {
    stories,
    setStories,
    changeStoriesList,
    bestOffers: { data, loading },
  };
};

export default useBestOffers;
