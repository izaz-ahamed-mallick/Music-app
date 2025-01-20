import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServerClient } from "./lib/supabaseClient";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin")) {
        const token = req.cookies.get("access_token")?.value;
        if (!token) {
            console.log("No token found, redirecting to home");
            return NextResponse.redirect(new URL("/", req.url));
        }
        if (!supabaseServerClient) {
            console.error(
                "Supabase Service Role Client is not configured properly."
            );
            return NextResponse.redirect(new URL("/", req.url));
        }

        const {
            data: { user },
            error,
        } = await supabaseServerClient.auth.getUser(token);

        if (error || !user) {
            console.log("Error getting user from token:", error);
            return NextResponse.redirect(new URL("/", req.url));
        }

        const { data: roles, error: roleError } = await supabaseServerClient
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single();

        if (roleError || !roles) {
            console.log("Error fetching user roles:", roleError);
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (roles.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"], // Applies the middleware to any path under /admin
};
