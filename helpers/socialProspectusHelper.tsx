import { SOCIAL_PLATFORMS } from "constants/constants";

export function GetSocialPlatformName(id) {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
        if (SOCIAL_PLATFORMS[i].id === id) {
            return SOCIAL_PLATFORMS[i].name;
        }
    }
    return "";
};

export function GetSocialPlatformImage(socialPlatformId) {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
        if (SOCIAL_PLATFORMS[i].id == socialPlatformId) {
            return SOCIAL_PLATFORMS[i].image;
        }
    }
}

export function GetSocialPlatformBaseUrl(socialPlatformId) {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
        if (SOCIAL_PLATFORMS[i].id == socialPlatformId) {
            return SOCIAL_PLATFORMS[i].base_url;
        }
    }
}

export function IsPersonalWebsite(socialPlatformId) {
    if (GetSocialPlatformName(socialPlatformId) === "Personal Website") {
        return true;
    } else {
        return false;
    }
}


export function GetSocialMediaUrl(socialPlatformId, handle) {
    if (IsPersonalWebsite(socialPlatformId)) {
        return handle;
    } else {
        return GetSocialPlatformBaseUrl(socialPlatformId) + "/" + handle;
    }
}