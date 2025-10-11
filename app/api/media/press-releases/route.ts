import { NextRequest, NextResponse } from "next/server";
import data from "@/data/press-releases.json";

export async function GET(req: NextRequest) {
  return NextResponse.json({ data });
}
