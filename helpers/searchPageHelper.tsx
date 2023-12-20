import { CATEGORY_METADATA } from "constants/category";
import {
    SearchOutlined,
} from "@ant-design/icons";
import { artistsForCollab } from "constants/home";
import { GetAllCategories, GetAllProposals, GetArtistCollabPage, GetCategoryPage } from "./routeHelper";


export function onlyUnique(value, index, array) {
    if (typeof value === 'object' && value !== null) {
        // Check for objects based on their properties
        const existingIndex = array.findIndex(item =>
            typeof item === 'object' &&
            item !== null &&
            item.name === value.name &&
            item.slug === value.slug
        );

        return existingIndex === index;
    } else {
        // Check for regular values
        return array.indexOf(value) === index;
    }
}


export function GetUserMightLikeCategories(skill) {
    let mightLikeCategories = [];
    if (skill && skill.length !== 0) {
        let match = skill.length;
        for (var i = 0; i < CATEGORY_METADATA.length; i++) {
            if (skill.includes(CATEGORY_METADATA[i]["name"])) {
                for (var j = 0; j < CATEGORY_METADATA[i]["similar-categories"].length; j++) {
                    mightLikeCategories.push(CATEGORY_METADATA[i]["similar-categories"][j]);
                }
                match--;
            }
            if (match === 0) {
                break;
            }
        }
    }
    return mightLikeCategories.filter(onlyUnique);
}

export function GetSearchCategoryCard(slug, name) {
    return (
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6">
            <a href={GetCategoryPage(slug)} className="gallery-popup" title="Morning Dew">
                <div className="project-item">
                    <div className="overlay-container">
                        <div className="searchPage-card">
                            <div className="searchPage-cardText">
                                <p className="common-text-style">
                                    {name}
                                </p>
                            </div>
                            <SearchOutlined />
                        </div>
                        <div className="project-item-overlay">
                            <p className="common-text-style">
                                Find collaborators
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export function GetSearchPageCategories(skill: any[]) {
    const categories: JSX.Element[] = [];
    if (skill.length === 0) {
        for (var i = 0; i < 5; i++) {
            categories.push(GetSearchCategoryCard(CATEGORY_METADATA[i]["slug"], CATEGORY_METADATA[i]["name"]))
        }
    } else {
        for (var i = 0; i < skill.length; i++) {
            categories.push(GetSearchCategoryCard(skill[i]["slug"], skill[i]["name"]))
        }
    }
    categories.push(
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6">
            <a href={GetAllCategories()} className="gallery-popup" title="Morning Dew">
                <div className="project-item">
                    <div className="overlay-container">
                        <div className="searchPage-card">
                            <div className="searchPage-cardText">
                                <p className="common-text-style">
                                    More categories
                                </p>
                            </div>
                            <SearchOutlined />
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )

    return categories;
}


export function GetSearchProposalCard(slug, name) {
    return (
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6">
            <a href={GetAllProposals(slug)} className="gallery-popup" title="Morning Dew">
                <div className="project-item">
                    <div className="overlay-container">
                        <div className="searchPage-card">
                            <div className="searchPage-cardText">
                                <p className="common-text-style">
                                    {name}
                                </p>
                            </div>
                            <SearchOutlined />
                        </div>
                        <div className="project-item-overlay">
                            <p className="common-text-style">
                                Find proposals
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export function GetSearchPageProposals(skill: string[]) {
    const proposals: JSX.Element[] = [];
    if (skill.length === 0) {
        let count = CATEGORY_METADATA.length - 1;
        for (var i = 0; i < 5; i++) {
            proposals.push(
                GetSearchProposalCard(CATEGORY_METADATA[count - i]["slug"], CATEGORY_METADATA[count - i]["name"])

            )
        }
    } else {
        for (var i = 0; i < skill.length; i++) {
            proposals.push(GetSearchProposalCard(skill[i]["slug"], skill[i]["name"]))
        }
    }
    proposals.push(
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6">
            <a href={GetAllProposals("all")} className="gallery-popup" title="Morning Dew">
                <div className="project-item">
                    <div className="overlay-container">
                        <div className="searchPage-card">
                            <div className="searchPage-cardText">
                                <p className="common-text-style">
                                    All proposals
                                </p>
                            </div>
                            <SearchOutlined />
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
    return proposals;
}

export function GetSearchPageCollaborators(skill: string[]) {
    const collaborators: JSX.Element[] = [];
    for (var i = 0; i < artistsForCollab.length; i++) {
        collaborators.push(
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 col-6">
                <a href={GetArtistCollabPage(artistsForCollab[i]["slug"])} className="gallery-popup">
                    <div className="project-item">
                        <div className="overlay-container">
                            <div className="searchPage-card">
                                <div className="searchPage-cardText">
                                    <div className="d-flex flex-column flex-md-row align-items-center">
                                        <img src={artistsForCollab[i]["url"]} alt="user" className="thumb-sm rounded-circle mb-2" />
                                        <p className="common-text-style text-center" style={{ paddingLeft: "10px" }}>
                                            {artistsForCollab[i]["artist"]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="project-item-overlay">
                                <p className="common-text-style">
                                    Collaborate now
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
    return collaborators;
}