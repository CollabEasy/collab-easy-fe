import { BLOGS } from "constants/blogs";

export function GetBlogMetadata(url) {
    let general = {};
    for (var i = 0; i < BLOGS.length; i++) {
        if (BLOGS[i]["url"] === url) {
            return BLOGS[i];
        }
    }
    return general;
}