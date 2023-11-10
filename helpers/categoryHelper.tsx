import { CATEGORY_METADATA } from "constants/category";


export function GetCategoryArtistTitle(selectedCategorySlug) {
    for (var i = 0; i < CATEGORY_METADATA.length; i++) {
        if (CATEGORY_METADATA[i]["slug"] === selectedCategorySlug) {
            return CATEGORY_METADATA[i]["artist-title"].replace(/\s+/g, '-').toLowerCase();
        }
    }
    return "artists";
}

export function GetCategoryMetadata(selectedCategorySlug) {
    let general = {};
    for (var i = 0; i < CATEGORY_METADATA.length; i++) {
        if (CATEGORY_METADATA[i]["slug"] === selectedCategorySlug) {
            return CATEGORY_METADATA[i];
        }
        else if (CATEGORY_METADATA[i]["slugs"] === "artists") {
            // This is a case where we do not have any data for header. Just return the generic one.
            general = CATEGORY_METADATA[i];
        }
    }
    return general;
}