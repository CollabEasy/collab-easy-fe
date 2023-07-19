import { CATEGORY_WIKI } from "constants/categoryWiki";

export function GetCategoryWikiData(selectedCategorySlug) {
    let general = {};
    for (var i = 0; i < CATEGORY_WIKI.length; i++) {
        if (CATEGORY_WIKI[i]["slug"] === selectedCategorySlug) {
            return CATEGORY_WIKI[i];
        }
    }
    return general;
}