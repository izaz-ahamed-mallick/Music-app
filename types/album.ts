export interface ICreateAlbumForm {
    albumName: string;
    artist: string;
    releaseDate: string;
    coverImage: FileList;
}

export interface IAlbumData {
    album_name: string;
    artist: string;
    cover_image: string;
    release_date: Date;
    id: string;
}
