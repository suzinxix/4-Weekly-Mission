import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ROUTE_PATHS } from "constants/route";
import { TOKEN } from "constants/auth";

export function middleware(request: NextRequest) {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem(TOKEN.access);
    if (accessToken) {
      return NextResponse.redirect(new URL(ROUTE_PATHS.folder, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/signin/:path", "/signup/:path"],
};
