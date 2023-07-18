import { CATEGORY_WIKI } from "config/categoryWiki";

export function GetCategoryWikiData(selectedCategorySlug) {
    let general = {};
    for (var i = 0; i < CATEGORY_WIKI.length; i++) {
        if (CATEGORY_WIKI[i]["slugs"].indexOf(selectedCategorySlug) > -1) {
            return CATEGORY_WIKI[i];
        }
    }
    return general;
}