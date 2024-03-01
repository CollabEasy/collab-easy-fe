import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { routeToHref } from 'config/routes';
import { useRoutesContext } from '../../routeContext';
import { artistsForCollab, popularCollabCategories } from 'constants/home';
import { GetCategoryArtistTitle } from 'helpers/categoryHelper';


const HomePopularInspoCards = ({ }) => {

    const { toGetInspired } = useRoutesContext();

    return (
        <div className='popularInspo'>
            <div className="popularInspoContainer">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 order-1 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
                        {/* eslint-disable @next/next/no-img-element */}
                        <img 
                            className="inspo__illustration"
                            src="https://lcdn-us.icons8.com/c/7HoWHL7EokyCTGGB0wVptQ/6cafe5c9c62162bf0aaba7bd188ccbe75682fde6.png" alt="" 
                        />
                    </div>

                    <div className="col-lg-6 col-md-6 col-12 order-2 order-md-2">
                        <div className='inspo__text'>
                            <h2 className="common-h2-style">
                                Over 200 Inspiring Ideas for Your Next Masterpiece
                            </h2>
                            <p className="text-muted mb-0 common-p-style">
                                Let these guiding ideas be the catalyst for your next creative endeavor, shaping a masterpiece that reflects your unique voice and passion.
                            </p>

                            <div className="row">
                                <div className="col-lg-6 col-sm-6 col-6 mt-4 pt-2">
                                    <div className="align-items-center rounded shadow p-3" style={{backgroundColor: "white"}}>
                                        <h6 className="common-h6-style ml-3 mb-0">
                                            <Link href={routeToHref(toGetInspired("painting"))} passHref>
                                                Painting ideas
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-6 mt-4 pt-2">
                                    <div className="align-items-center rounded shadow p-3" style={{backgroundColor: "white"}}>
                                        <h6 className="common-h6-style ml-3 mb-0">
                                            <Link href={routeToHref(toGetInspired("photography"))} passHref>
                                                Photography ideas
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-6 mt-4 pt-2">
                                    <div className="align-items-center rounded shadow p-3" style={{backgroundColor: "white"}}>
                                        <h6 className="common-h6-style ml-3 mb-0">
                                            <Link href={routeToHref(toGetInspired("writing"))} passHref>
                                                Writing ideas
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-6 mt-4 pt-2">
                                    <div className="align-items-center rounded shadow p-3" style={{backgroundColor: "white"}}>
                                        <h6 className="common-h6-style ml-3 mb-0">
                                            <Link href={routeToHref(toGetInspired("all"))} passHref>
                                                Browse all
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePopularInspoCards;