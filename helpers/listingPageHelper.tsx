import { CATEGORY_METADATA, SIMILAR_CATEGORIES } from "constants/category";

export function GetCategoryFromSlug(selectedCategorySlug) {
    var selectedCategory = "Artists";
    for (var i = 0; i < SIMILAR_CATEGORIES.length; i++) {
        if (SIMILAR_CATEGORIES[i]["slugs"].indexOf(selectedCategorySlug) > -1) {
            SIMILAR_CATEGORIES[i]["similar-categories"].forEach((category) => {
                if (category["slug"] == selectedCategorySlug) {
                    selectedCategory = category["name"];
                }
            })
        }
    }
    return selectedCategory;
}

export function GetListingHeaderData(selectedCategorySlug) {
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