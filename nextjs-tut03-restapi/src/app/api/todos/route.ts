import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

const API_KEY = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);
  console.log(API_KEY);

  const todos: Todo[] = await res.json();

  return NextResponse.json(todos);
}
