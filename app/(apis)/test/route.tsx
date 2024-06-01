import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      email: "info@studiopresent.com",
      name: "studiopresent",
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTg0ODgzMTMsImV4cCI6MTcwNjI2NDMxMywiZHJ1cGFsIjp7InVpZCI6IjEifX0.h0RqSazjBtXrnUZd3SmXLGIoKx5alS8hKa_hOdh4qkseKW-zAOcxxgk-lRFcoUQ9_wftqakBM26_tI8mhT67GcmHlq2EFYLHmH1qoPwYf5N0AOz6a5Xvx7cxdRkb_8idb4QAF4cVj5pqLjoCQFUun4minjv0p8tOonCK3GqdIAHuRIVA9_0uKpUDUndSnjocZFxcBSqyZAEo3sWs_YsUq4WghDAVi7xl-xHfnoR36AlofUeeNnLXMIcELynWoeZRAPkmV3ksAxYQkn-_CHlh-Z3Cnr0Gom1_Qwrgcmc9SBHs6pkNorWOm9GukQ47oahictH9EsmVhDEn5Bj_9J-Bmg",
      token_type: "Bearer",
    },
    { status: 200 }
  );
}
