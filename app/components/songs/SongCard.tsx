import { ISongData } from "@/types/song";
import PlayButton from "../PlayButton";

const SongCard = ({ song }: { song: ISongData }) => {
    return (
        <div className="relative group p-4 bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl text-white font-semibold">
                        {song.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{song.artist}</p>
                </div>

                <div className="flex items-center justify-center">
                    <PlayButton
                        artist={song.artist}
                        audioUrl={song.audio_file}
                        id={song.id}
                        title={song.title}
                        className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition duration-200 ease-in-out"
                    />
                </div>
            </div>
        </div>
    );
};

export default SongCard;
