import { NextResponse } from "next/server";

const SOURCE_URL = process.env.DATA_SOURCE_URL as string;
const API_KEY = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(SOURCE_URL);
  console.log(API_KEY);

  const todos: Todo[] = await res.json();

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();

  if (!userId || !title) {
    return NextResponse.json({
      message: "Missing required data",
    });
  }

  const res = await fetch(SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    }),
  });

  const newTodo: Todo = await res.json();

  return NextResponse.json(newTodo);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  console.log(id);

  if (!id) {
    return NextResponse.json({
      message: "Todo id not found",
    });
  }

  await fetch(`${SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
  });

  return NextResponse.json({
    message: `Todo ${id} deleted`,
  });
}

export async function PUT(request: Request) {
  const { userId, id, title, completed }: Todo = await request.json();

  if (!userId || !id || !title || typeof completed !== "boolean") {
    return NextResponse.json({
      message: "Required data are missing",
    });
  }

  const res = await fetch(`${SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
    }),
  });

  const updatedTodo: Todo = await res.json();

  return NextResponse.json(updatedTodo);
}
