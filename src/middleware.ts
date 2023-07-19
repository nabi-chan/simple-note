import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { type NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.startsWith("/shared")
  ) {
    return;
  }

  return withAuth(req as NextRequestWithAuth, {
    pages: {
      signIn: "/login",
    },
  });
}
