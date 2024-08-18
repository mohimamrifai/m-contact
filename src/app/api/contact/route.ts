import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const values = await req.json();
  const { name, number_phone, authorId } = values;
  try {
    const res = await prisma.contact.create({
      data: {
        name,
        number_phone,
        authorId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function DELETE(req: Request) {
  const id = await req.json();
  try {
    const res = await prisma.contact.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function PUT(req: Request) {
  const values = await req.json();
  const { name, number_phone, authorId, id } = values;
  try {
    const res = await prisma.contact.update({
      data: {
        name,
        number_phone,
        authorId,
      },
      where: {
        id
      }
    });
    return NextResponse.json(values);
  } catch (error) {
    return NextResponse.json(null);
  }
}
