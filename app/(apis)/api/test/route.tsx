import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      data: [
        {
          id: 1,
          title: "Ibanez Electric Guitar",
          description: "Ibanez Electric Guitar description",
          state: "good",
          brand: null,
          country_id: 112,
          brand_id: null,
          category_id: 1,
          price: 140000,
          model: "RG8560-SPB J-Custom",
          currency: "EUR",
          user_id: 1,
          created_at: null,
          updated_at: null,
          likedByUser: false,
          images: [],
          country: {
            id: 112,
            name: "Japan",
            alpha2: "JP",
            alpha3: "JPN",
            created_at: null,
            updated_at: null,
          },
          category: {
            id: 1,
            name: "Electric Guitars",
            options: {
              bodyWood: ["mahogany", "alder", "basswood"],
              "number-of-strings": [4, 5, 6, 7, 8, 9],
            },
            created_at: null,
            updated_at: null,
          },
          likes: [],
        },
        {
          id: 2,
          title: "Jackson Soloist",
          description: "Jackson Soloist",
          state: null,
          brand: {
            id: 162,
            name: "Jackson",
            created_at: null,
            updated_at: null,
          },
          country_id: null,
          brand_id: 162,
          category_id: 1,
          price: 170000,
          model: "Pro Plus Series Soloist\u2122 SLA3Q",
          currency: "eur",
          user_id: 3,
          created_at: "2023-12-03T11:17:29.000000Z",
          updated_at: "2023-12-03T11:17:29.000000Z",
          likedByUser: false,
          images: [
            {
              id: 1,
              path: "/storage/listings/2/r0c3YwtrapDqrUgkSOqar4FEdFAKGroXONc6ZtDM.png",
              listing_id: 2,
              created_at: "2023-12-03T11:17:29.000000Z",
              updated_at: "2023-12-03T11:17:29.000000Z",
            },
          ],
          country: null,
          category: {
            id: 1,
            name: "Electric Guitars",
            options: {
              bodyWood: ["mahogany", "alder", "basswood"],
              "number-of-strings": [4, 5, 6, 7, 8, 9],
            },
            created_at: null,
            updated_at: null,
          },
          likes: [
            {
              id: 66,
              user_id: 5,
              listing_id: 2,
              created_at: "2024-02-22T18:51:29.000000Z",
              updated_at: "2024-02-22T18:51:29.000000Z",
            },
          ],
        },
      ],
    },
    { status: 200 }
  );
}
