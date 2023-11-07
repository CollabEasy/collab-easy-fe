import { CATEGORY_WIKI } from "constants/category";

export function GetCategoryWikiData(selectedCategorySlug) {
    let general = {
        "name": selectedCategorySlug,
        "slug": selectedCategorySlug.replace(/\s+/g, '-').toLowerCase(),
        "meta-slug": "learn-about-%s-and-collaboration-opportunities".replace("%s", selectedCategorySlug),
        "meta-title": "Learn about %s and collaboration opportunities with journalers | Wondor".replace("%s", selectedCategorySlug),
        "meta-content": "Learn about the enchanting world of %s - its definition, techniques, and how it fuses creativity and self-expression.".replace("%s", selectedCategorySlug),
    };
    for (var i = 0; i < CATEGORY_WIKI.length; i++) {
        if (CATEGORY_WIKI[i]["slug"] === selectedCategorySlug) {
            return CATEGORY_WIKI[i];
        }
    }
    return general;
}