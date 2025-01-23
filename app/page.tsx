import Albums from "./components/album/Albums";
import Header from "./components/Header";

export default function Home() {
    return (
        <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto ">
            <Header>
                <div className="mb-2">
                    <h1 className="text-3xl mb-4 font-semibold text-white">
                        Welcome Back!
                    </h1>
                </div>
            </Header>
            <div className="mt-1 mb-6 px-6">
                <div className="flex flex-col ">
                    <h1 className="text-white text-2xl font-semibold mb-4">
                        Albums
                    </h1>
                    <Albums />
                </div>
            </div>
        </div>
    );
}
