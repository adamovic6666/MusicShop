import NewListingForm from "@/app/_components/Forms/NewListingForm";
import { getBrands, getCategories, getCountries } from "@/app/services";

const NewAdvertisement = async () => {
  const categories = await getCategories();
  const brands = await getBrands();
  const countries = await getCountries();
  return (
    <NewListingForm
      categories={categories}
      brands={brands}
      countries={countries}
    />
  );
};

export default NewAdvertisement;
