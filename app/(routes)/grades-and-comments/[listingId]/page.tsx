import UserRatingsForm from "@/app/_components/Forms/UserRatingsForm";

const GradesAndComments = ({ params }: { params: { listingId: string } }) => {
  return <UserRatingsForm listingId={Number(params?.listingId)} />;
};

export default GradesAndComments;
