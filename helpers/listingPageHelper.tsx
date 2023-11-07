import { CATEGORY_LISTING_BANNERS, SIMILAR_CATEGORIES } from "constants/category";

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
    for (var i = 0; i < CATEGORY_LISTING_BANNERS.length; i++) {
        if (CATEGORY_LISTING_BANNERS[i]["slugs"].indexOf(selectedCategorySlug) > -1) {
            CATEGORY_LISTING_BANNERS[i]["category"] = GetCategoryFromSlug(selectedCategorySlug);
            return CATEGORY_LISTING_BANNERS[i];
        }
        else if (CATEGORY_LISTING_BANNERS[i]["slugs"].indexOf("artist") > -1) {
            // This is a case where we do not have any data for header. Just return the generic one.
            general = CATEGORY_LISTING_BANNERS[i];
        }
    }
    return general;
}