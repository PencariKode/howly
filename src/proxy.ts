import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ACTIVE_ROOM_COOKIE = process.env.NEXT_PUBLIC_ACTIVE_ROOM_COOKIE || "active_room";

function getAllowedRoomPrefix(roomCode: string) {
  const code = roomCode.trim().toUpperCase();
  return `/room/${code}`;
}

async function fetchActiveRoom(req: NextRequest): Promise<string | null> {
  try {
    const url = req.nextUrl.clone();
    url.pathname = "/api/user/active-room";
    url.search = "";

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      },
    });

    if (!res.ok) return null;
    const data = (await res.json()) as { activeRoom?: string | null };
    return data?.activeRoom ? String(data.activeRoom).toUpperCase() : null;
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //PK: pengecualian untuk asset dan internal nextjs
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.next();
  }

  const cookieRoom = req.cookies.get(ACTIVE_ROOM_COOKIE)?.value;
  const cookieAllowedPrefix = cookieRoom ? getAllowedRoomPrefix(cookieRoom) : null;

  //PK: kalau user coba buka room lain tapi masih punya cookie active room,
  //paksa tetap di room itu (tanpa query DB).
  if (
    cookieAllowedPrefix &&
    pathname.startsWith("/room/") &&
    pathname !== cookieAllowedPrefix &&
    !pathname.startsWith(cookieAllowedPrefix + "/")
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = cookieAllowedPrefix;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  //PK: jika sudah di /room/*, render tanpa delay
  if (pathname.startsWith("/room/")) {
    return NextResponse.next();
  }

  //PK: untuk route non-room, cek room aktif di server lalu redirect sebelum render.
  const activeRoom = await fetchActiveRoom(req);
  if (!activeRoom) {
    //PK: clear cookie kalau ada
    if (cookieRoom) {
      const res = NextResponse.next();
      res.cookies.delete(ACTIVE_ROOM_COOKIE);
      return res;
    }
    return NextResponse.next();
  }

  const allowedPrefix = getAllowedRoomPrefix(activeRoom);
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = allowedPrefix;
  redirectUrl.search = "";

  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set(ACTIVE_ROOM_COOKIE, activeRoom, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return res;
}

export const config = {
  matcher: [
    //PK: terapkan ke seluruh route kecuali asset, API, dan internal nextjs
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
