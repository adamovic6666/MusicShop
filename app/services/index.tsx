import httpClient from "@/httpClient";

import axios from "axios";
import { API_ENDPOINTS } from "../_constants";
import {
  Brand,
  Category,
  ConversationMessage,
  Country,
  OptionType,
} from "../_types/Index";

export const getListings = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + API_ENDPOINTS.LISTINGS,
    { cache: "no-store", next: { revalidate: 0 } }
  );
  return await response.json();
};

export const getListing = async (id: string) => {
  return httpClient
    .get(API_ENDPOINTS.LISTINGS + "/" + id)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const sendMessage = (data: ConversationMessage) => {
  return httpClient
    .post(API_ENDPOINTS.MESSAGES, data)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getCategories = async (): Promise<OptionType[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + API_ENDPOINTS.CATEGORIES,
    {
      cache: "no-store",
      next: { revalidate: 0 },
    }
  );
  const data = await response.json();
  const modifiedData = data.data.map((category: Category) => {
    return {
      value: category?.id,
      label: category?.name,
      additionalOptions: Object.entries(category.options).reduce(
        (acc, [key, value]) => {
          acc[key] = value.map((val) => ({ value: val, isChecked: false }));
          return acc;
        },
        {} as { [key: string]: { value: string; isChecked: boolean }[] }
      ),
    };
  });
  return modifiedData;
};

export const getBrands = (): Promise<OptionType[]> => {
  return httpClient
    .get(API_ENDPOINTS.BRANDS)
    .then(({ data }) => {
      const modifiedData = data.data.map((brand: Brand) => {
        return {
          value: brand.id,
          label: brand.name,
          additionalOptions: {},
        };
      });
      return modifiedData;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getNewListingDescription = (brand: string, model: string) => {
  // CHECK THIS ENDPOINT
  return axios
    .post(`${API_ENDPOINTS.NEW_LISTING_GENERATED_DESCRIPTION}`, {
      brand,
      model,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCountries = () => {
  return httpClient
    .get(API_ENDPOINTS.COUNTRIES)
    .then(({ data }) => {
      const modifiedData = data.data.map((country: Country) => {
        return {
          value: country.id,
          label: country.name,
        };
      });
      return modifiedData;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getExchangeRates = () => {
  return httpClient
    .get(API_ENDPOINTS.GET_EXCHANGE_RATES())
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
