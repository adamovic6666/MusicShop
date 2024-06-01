import UserListings from "@/app/_components/UserListings/UserListings";

const UserListingsPage = ({ params }: { params: { userId: string } }) => {
  return <UserListings userId={+params?.userId} />;
};

export default UserListingsPage;
