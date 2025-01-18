import Header from "./components/Header";

export default function Home() {
    return (
        <div className="bg-neutral-800 rounded-lg h-full w-full overflow-hidden overflow-y-auto ">
            <Header>
                <div className="mb-2">
                    <h1 className="text-3xl mb-4 font-semibold text-white">
                        Welcome Back!
                    </h1>
                </div>
            </Header>
            <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center ">
                    <h1 className="text-white text-2xl font-semibold">
                        Newest Song
                    </h1>
                </div>
                <div>List of Songs!</div>
            </div>
        </div>
    );
}
