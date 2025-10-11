import { NextRequest, NextResponse } from "next/server";
import data from "@/data/resources.json";

export async function GET(req: NextRequest) {
  return NextResponse.json({ data });
}
