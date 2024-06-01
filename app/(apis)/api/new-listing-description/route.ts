import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json(); // To read request data
  const { brand, model } = requestBody;
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const body = JSON.stringify({
    messages: [
      {
        role: "user",
        content: `Can you give me the description, for this ${brand} and ${model}. You can take it from ${brand} official store or from Google. Also, please restricti it to 300 characters and return it only as Serbian translated text.`,
      },
    ],
    model: "gpt-3.5-turbo-0613",
    stream: false,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });
  const data = await response.json();
  const description = data.choices[0].message.content;
  return NextResponse.json(
    {
      description: description,
    },
    { status: 200 }
  );
}
