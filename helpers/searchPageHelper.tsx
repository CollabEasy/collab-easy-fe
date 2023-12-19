import { CATEGORY_METADATA } from "constants/category";
import {
    SearchOutlined,
} from "@ant-design/icons";
import { artistsForCollab } from "constants/home";
import { GetAllCategories, GetAllProposals, GetArtistCollabPage, GetCategoryPage } from "./routeHelper";


export function GetSearchPageCategories() {
    const categories: JSX.Element[] = [];
    for (var i = 0; i < 5; i++) {
        categories.push(
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6">
                <a href={GetCategoryPage(CATEGORY_METADATA[i]["slug"])} className="gallery-popup" title="Morning Dew">
                    <div className="project-item">
                        <div className="overlay-container">
                            <div className="searchPage-card">
                                <div className="searchPage-cardText">
                                    <p className="common-text-style">
                                        {CATEGORY_METADATA[i]["name"]}
                                    </p>
                                </div>
                                <SearchOutlined />
                            </div>
                            <div className="project-item-overlay">
                                <p className="common-text-style">
                                    Find Collaborator
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
    categories.push(
        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6">
            <a href={GetAllCategories()} className="gallery-popup" title="Morning Dew">
                <div className="project-item">
                    <div className="overlay-container">
                        <div className="searchPage-card">
                            <div className="searchPage-cardText">
                                <p className="common-text-style">
                                    More Categories
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

export function GetSearchPageProposals() {
    const proposals: JSX.Element[] = [];
    let count = CATEGORY_METADATA.length - 1;
    for (var i = 0; i < 5; i++) {
        proposals.push(
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6">
                <a href={GetAllProposals()} className="gallery-popup" title="Morning Dew">
                    <div className="project-item">
                        <div className="overlay-container">
                            <div className="searchPage-card">
                                <div className="searchPage-cardText">
                                    <p className="common-text-style">
                                        {CATEGORY_METADATA[count - i]["name"]}
                                    </p>
                                </div>
                                <SearchOutlined />
                            </div>
                            <div className="project-item-overlay">
                                <p className="common-text-style">
                                    Find Proposals
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
    proposals.push(
        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6">
            <a href={GetAllProposals()} className="gallery-popup" title="Morning Dew">
                <div className="project-item">
                    <div className="overlay-container">
                        <div className="searchPage-card">
                            <div className="searchPage-cardText">
                                <p className="common-text-style">
                                    All Proposals
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

export function GetSearchPageCollaborators() {
    const collaborators: JSX.Element[] = [];
    for (var i = 0; i < artistsForCollab.length; i++) {
        collaborators.push(
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-6">
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
                                    Collaborate Now
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