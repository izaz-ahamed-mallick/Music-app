import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supaBaseInstence } from "./lib/supabaseClient";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin")) {
        const token = req.cookies.get("access_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        const {
            data: { user },
            error,
        } = await supaBaseInstence.auth.getUser(token);

        if (error || !user) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Check if the user is an admin
        const { data: roles, error: roleError } = await supaBaseInstence
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single();

        if (roleError || roles.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
