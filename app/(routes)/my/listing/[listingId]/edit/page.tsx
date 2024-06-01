import EditListingForm from "@/app/_components/Forms/EditListingForm";
import {
  getBrands,
  getCategories,
  getCountries,
  getListing,
} from "@/app/services";

const EditListingPage = async ({
  params,
}: {
  params: { listingId: string };
}) => {
  const categories = await getCategories();
  const brands = await getBrands();
  const countries = await getCountries();
  const { data: listing } = await getListing(params?.listingId);

  return (
    <EditListingForm
      listing={listing}
      categories={categories}
      brands={brands}
      countries={countries}
    />
  );
};

export default EditListingPage;
