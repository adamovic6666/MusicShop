"use client";

import { API_ENDPOINTS } from "@/app/_constants";
import { Rating, Tab, UserStatuses } from "@/app/_types/Index";
import {
  getInitialUserRatings,
  getNameOfUserWhoseGradesAreBeingRated,
  getOnlyUserRatings,
  getUserRatingTabsWithTotals,
  updateUserRatingTabValues,
} from "@/app/_utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import UserRating from "./UserRating";
import UserRatingTabs from "./UserRatingTabs";

const UserRatings = ({ userId }: { userId: string }) => {
  const { data: allRatings, isLoading } = useSWR(
    API_ENDPOINTS.GET_USER_RATINS(userId)
  );
  const [initialRatings, setInitialRatings] = useState<Rating[]>([]);
  const [userRatings, setUserRatings] = useState<Rating[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [tabs, setTabs] = useState<{ [key: string]: Tab[] } | {}>({});
  const params = useSearchParams();
  const ratedNegative = params.get("rated-negative");

  useEffect(() => {
    const onlyUserRatings = getOnlyUserRatings(allRatings?.data, +userId);
    setInitialRatings(onlyUserRatings);
    setUserRatings(
      getInitialUserRatings(!!ratedNegative, onlyUserRatings, +userId)
    );
    setTabs(getUserRatingTabsWithTotals(onlyUserRatings, +userId));
    setActiveTab(`${UserStatuses.Seller}-${ratedNegative ? 0 : 1}`);
  }, [allRatings, ratedNegative, userId]);

  const onTabClickHandler = (is_positive: number, type: string, id: string) => {
    const updatedRatings = updateUserRatingTabValues(
      initialRatings,
      type,
      is_positive,
      +userId
    );
    setActiveTab(id);
    setUserRatings(updatedRatings);
  };

  if (isLoading) return <div>Loading...</div>;
  if (initialRatings && initialRatings?.length === 0)
    return <div>No ratings</div>;

  return (
    <div className="container">
      {getNameOfUserWhoseGradesAreBeingRated(initialRatings, userId)}
      <UserRatingTabs
        onTabClick={onTabClickHandler}
        tabs={tabs}
        activeTab={activeTab}
      />
      {userRatings?.map((rating: Rating) => (
        <UserRating key={rating.id} {...rating} userId={+userId} />
      ))}
    </div>
  );
};

export default UserRatings;
