import { CATEGORY_METADATA } from "constants/category";
import {
    SearchOutlined,
} from "@ant-design/icons";
import { artistsForCollab } from "constants/home";

export function GetSearchPageCategories() {
    const categories: JSX.Element[] = [];
    for (var i = 0; i < CATEGORY_METADATA.length; i++) {
        categories.push(
            <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                <a href="#" className="gallery-popup" title="Morning Dew">
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
        if (i === 6) {
            categories.push(
                <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                    <a href="#" className="gallery-popup" title="Morning Dew">
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
            break;
        }
    }
    return categories;
}

export function GetSearchPageProposals() {
    const proposals: JSX.Element[] = [];
    for (var i = 0; i < CATEGORY_METADATA.length; i++) {
        proposals.push(
            <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                <a href="#" className="gallery-popup" title="Morning Dew">
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
                                    Find Proposals
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
        if (i === 6) {
            proposals.push(
                <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                    <a href="#" className="gallery-popup" title="Morning Dew">
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
            break;
        }
    }
    return proposals;
}

export function GetSearchPageCollaborators() {
    const collaborators: JSX.Element[] = [];
    for (var i = 0; i < artistsForCollab.length; i++) {
        collaborators.push(
            <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                <a href="#" className="gallery-popup" title="Morning Dew">
                    <div className="project-item">
                        <div className="overlay-container">
                            <div className="searchPage-card">
                                <div className="searchPage-cardText">
                                    <div className="d-flex flex-column align-items-center">
                                        <img src={artistsForCollab[i]["url"]} alt="user" className="thumb-sm rounded-circle mb-2" />
                                        <p className="common-text-style text-center">
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