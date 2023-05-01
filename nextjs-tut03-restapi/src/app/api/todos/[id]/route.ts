import { NextResponse } from "next/server";

const SOURCE_URL = process.env.DATA_SOURCE_URL as string;

export async function GET(request: Request) {
  console.log(request.url);
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  const res = await fetch(`${SOURCE_URL}/${id}`);

  const todo: Todo = await res.json();

  if (!todo.id) {
    return NextResponse.json({
      message: "Todo not found",
    });
  }

  return NextResponse.json(todo);
}
