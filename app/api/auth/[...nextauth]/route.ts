import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const dynamic = "force-dynamic";

type AppRouterContext = {
  params: { nextauth: string[] };
};

const handler = NextAuth(authOptions);

export async function GET(req: NextRequest, context: AppRouterContext) {
  return await handler(req, context);
}

export async function POST(req: NextRequest, context: AppRouterContext) {
  return await handler(req, context);
}
