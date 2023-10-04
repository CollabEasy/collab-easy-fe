import { COUNTRIES, SOCIAL_PLATFORMS } from "constants/constants";

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

export function GetCountryByISO(country_iso: string) {
    for (var i = 0; i < COUNTRIES.length; i++) {
        if (COUNTRIES[i]["Dial"] === country_iso) {
            return COUNTRIES[i];
        }
    }
    return {};
};

export function GetCountryByName(country_name: string) {
    console.log(country_name);
    for (var i = 0; i < COUNTRIES.length; i++) {
        if (COUNTRIES[i]["Name"] === country_name) {
            return COUNTRIES[i];
        }
    }
    return {};
};