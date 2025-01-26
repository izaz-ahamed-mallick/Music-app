import Albums from "./components/album/Albums";
import GreetingsPage from "./components/GreetingsPage";
import Header from "./components/Header";

export default function Home() {
    return (
        <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto ">
            <Header>
                <div className="mb-2">
                    <GreetingsPage />
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
