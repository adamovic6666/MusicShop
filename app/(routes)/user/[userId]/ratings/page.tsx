import UserRatings from "@/app/_components/UserRatings/UserRatings";

const Ratings = ({ params }: { params: { userId: string } }) => {
  return <UserRatings userId={params?.userId} />;
};

export default Ratings;
