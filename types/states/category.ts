import { User
 } from "types/model";
export interface CategoryState {
    selectedCategoryId: number;
    selectedCategorySlug: string;
    isFetchingArtists: boolean;
    isFetchingCategories: boolean;
    categories: any[];
    artists: User[];
    errorInFetchingArtists: boolean;
}