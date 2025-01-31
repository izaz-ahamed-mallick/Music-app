import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-white text-center px-4">
            <h1 className="text-4xl font-bold mb-4">🚫 Sorry!</h1>
            <p className="text-lg mb-6">
                Sorry! We can&apos;t seem to find the resource you&apos;re
                looking for.
            </p>

            <p className="mb-8">
                Please check that the website address is spelled correctly.
                <br />
                Or go to our home page and use the menus to navigate.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
            >
                Go to Homepage
            </Link>
        </div>
    );
}
