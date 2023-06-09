import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const entry = await strapi.entityService.findONe('api::model.model', 5, {});
  console.log(entry)


  return NextResponse.json(requestBody)
}