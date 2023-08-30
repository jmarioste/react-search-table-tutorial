import { NextResponse } from "next/server";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
};

type DummyJSONResponse = {
  users: User[];
};

/**
 * A proxy for https://dummyjson.com to simulate calls to database
 * @param request
 * @returns
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  // select the properties that we need
  params.append(
    "select",
    "id,firstName,lastName,maidenName,age,gender,email,phone,username,password,birthDate"
  );

  // use different a base url if there's a search query
  const hasSearch = params.has("search");
  let baseUrl = `https://dummyjson.com/users`;
  if (hasSearch) {
    params.append("q", params.get("search")!);
    params.delete("search");
    baseUrl = `https://dummyjson.com/users/search`;
  }

  const dummyUrl = new URL(baseUrl);

  //copy all the search params to dummyURL
  params.forEach((val, key) => {
    dummyUrl.searchParams.append(key, val);
  });

  const response = await fetch(dummyUrl);

  //return the response
  const data = (await response.json()) as DummyJSONResponse;
  return NextResponse.json(data.users);
}
