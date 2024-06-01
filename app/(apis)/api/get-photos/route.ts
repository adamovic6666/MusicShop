// pages/api/get-photos.ts
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("imageUrl");
  // const imageUrl =
  //   // "https://randomwordgenerator.com/img/picture-generator/gdb88e214954e986ff79401d06496b93e5b80c5a124b1bf02c828faf910e3d6e01e787dc8bf602e26c585ac4e8dbbb76c_640.jpg";
  if (!imageUrl) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return new NextResponse(buffer, {
      status: 200,
      headers: { "Content-Type": "image/*" },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
