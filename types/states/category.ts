import { User
 } from "types/model";
export interface CategoryState {
    selectedCategoryId: number;
    selectedCategorySlug: string;
    isFetchingArtists: boolean;
    isFetchingCategories: boolean;
    categories: any[];
    publishedCategories: any[];
    artists: User[];
    errorInFetchingArtists: boolean;
    isUpdatingCategory: boolean;
    showCategoryModal: boolean,
}

export interface CategoryEntry {
    id: number;
    slug: string; 
    artName: string;
    description: string;
    approved: boolean;
}