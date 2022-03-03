import { User
 } from "types/model";
export interface CategoryState {
    selectedId: number;
    isFetchingArtists: boolean;
    isFetchingCategories: boolean;
    categories: any[];
    artists: User[];
}