import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supaBaseInstence } from "./lib/supabaseClient";
import { isTokenExpired } from "./lib/IsTokenExpire";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("access_token")?.value;

    if (isTokenExpired(token)) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (!token) {
        console.log("No token found, redirecting to home");
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/admin")) {
        console.log("token", token);

        const {
            data: { user },
            error,
        } = await supaBaseInstence.auth.getUser(token);

        if (error || !user) {
            console.log("Error getting user from token:", error);
            return NextResponse.redirect(new URL("/", req.url));
        }

        const userId = user?.id;
        if (!userId) {
            console.log("User ID is missing");
            return NextResponse.redirect(new URL("/", req.url));
        }

        const { data: roles, error: roleError } = await supaBaseInstence
            .from("users")
            .select("role")
            .eq("id", user?.id)
            .single(); // Ensures exactly one row is returned

        console.log("Roles Data:", roles);
        console.log("Role Error:", roleError);

        if (roleError || !roles) {
            console.log("Role not found:", roles);
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (roles.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        console.log("User is admin, granting access to admin page");
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
