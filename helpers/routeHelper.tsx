import { GetCategoryArtistTitle } from "./categoryHelper";


export function GetCollabLink(slug) {
    return (typeof window !== "undefined" && window.location.origin
        ? window.location.origin + "/collab/artist/" + slug
        : "");
}

export function GetBlogUrl(url) {
    return (typeof window !== "undefined" && window.location.origin
        ? window.location.origin + url
        : "");
}

export function GetProposalUrl(url) {
    return (typeof window !== "undefined" && window.location.origin
        ? window.location.origin + url
        : "");
}


export function GetArtistCollabPage(slug) {
    return (typeof window !== "undefined" && window.location.origin
        ? window.location.origin + "/collab/artist/" + slug
        : "");
}


export function GetAllProposals() {
    return (typeof window !== "undefined" && window.location.origin
        ? window.location.origin + "/collab-proposals-for-artists"
        : "");
}

export function GetAllCategories() {
    return (typeof window !== "undefined" && window.location.origin
        ? window.location.origin + "/collab-categories"
        : "");
}

export function GetCategoryPage(slug) {
    return (typeof window !== "undefined" && window.location.origin
        ? window.location.origin + "/category/" + slug + "/" + GetCategoryArtistTitle(slug) + "-seeking-collab"
        : "");
}