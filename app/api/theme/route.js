
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const theme = cookieStore.get("theme")?.value || "dark";

  return NextResponse.json({ theme });
}

export async function POST(request) {
  try {
    const { theme } = await request.json();

    if (!["light", "dark"].includes(theme)) {
      return NextResponse.json(
        { error: "Invalid theme" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("theme", theme, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ message: "Theme saved" });
  } catch {
    return NextResponse.json(
      { error: "Failed to save theme" },
      { status: 500 }
    );
  }
}
