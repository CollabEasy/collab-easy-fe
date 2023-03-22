import { COUNTRIES, SOCIAL_PLATFORMS } from "config/constants";

export function GetSocialPlatformId(name: string) {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
        if (SOCIAL_PLATFORMS[i].name === name) {
            return SOCIAL_PLATFORMS[i].id;
        }
    }
    return 1;
};

export function GetSocialPlatformName(id: number) {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
        if (SOCIAL_PLATFORMS[i].id === id) {
            return SOCIAL_PLATFORMS[i].name;
        }
    }
    return "";
};

export function GetCountryName(country_iso: string) {
    for (var i = 0; i < COUNTRIES.length; i++) {
        if (COUNTRIES[i]["Dial"] == country_iso) {
            return COUNTRIES[i];
        }
    }
    return {};
};