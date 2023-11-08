import { CATEGORY_METADATA } from "constants/category";


export function GetCategoryArtistTitle(selectedCategorySlug) {
    for (var i = 0; i < CATEGORY_METADATA.length; i++) {
        if (CATEGORY_METADATA[i]["slug"] === selectedCategorySlug) {
            return CATEGORY_METADATA[i]["artist-title"].replace(/\s+/g, '-').toLowerCase();
        }
    }
    return "artists";
}