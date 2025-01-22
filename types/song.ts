export interface ICreateSongForm {
    title: string;
    artist: string;
    albumId: string;
    duration: string;
    audioFile: FileList;
}

export interface ISongData {
    album_id: string;
    artist: string;
    audio_file: string;
    created_at: Date;
    id: string;
    title: string;
}
