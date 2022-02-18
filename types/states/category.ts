import { User
 } from "types/model";
export interface CategoryState {
    selectedId: number;
    isFetchingArtists: boolean;
    artists: User[];
}