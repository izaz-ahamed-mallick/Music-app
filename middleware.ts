import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supaBaseInstence } from "./lib/supabaseClient";
import { isTokenExpired } from "./lib/IsTokenExpire";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("access_token")?.value;

    // ✅ If the token exists and is valid, prevent access to login page
    if (pathname.startsWith("/auth") && token && !isTokenExpired(token)) {
        console.log("Redirecting logged-in user to homepage.");
        return NextResponse.redirect(new URL("/", req.url));
    }

    // ✅ If token is expired, clear token and redirect to login page
    if (token && isTokenExpired(token)) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("sessionExpired", "true");

        const response = NextResponse.redirect(url);
        response.cookies.delete("access_token");
        return response;
    }
    // ✅ Admin route protection
    if (pathname.startsWith("/admin")) {
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
            .single();

        if (roleError || !roles) {
            console.log("Role not found:", roles);
            return NextResponse.redirect(new URL("/", req.url));
        }

        // ✅ Only allow access if user has 'admin' role
        if (roles.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        console.log("User is admin, granting access to admin page");
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/auth/:path*"],
};
