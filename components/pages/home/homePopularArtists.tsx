import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { routeToHref } from 'config/routes';
import { useRoutesContext } from '../../routeContext';

const HomePopularArtists = ({ list }) => {


    const { toUserCollabPage, toMySearchPage } = useRoutesContext();

    return (
        <div className='homePagePopularArtistsContainer'>
            <section className="homePagePopularArtists">
                <div className="homePagePopularArtists_description">
                    <h1 className="homePagePopularArtists_title">
                        <span className="common-h1-style homePagePopularArtists_gradient-text">
                            Advance Your Artistic Journey, Together
                            <div className="homepage-heading-line"></div>
                        </span>
                    </h1>
                    <p className="common-p-style homePagePopularArtists_paragraph" style={{ color: "white" }}>
                        Always wanted to start a creative project with a friend?
                        Now you can. Meet with like-minded artists on Wondor and grow
                        your skill sets together.
                    </p>
                    <Link href={routeToHref(toMySearchPage())} passHref >
                        <button className="homepage-button" style={{ backgroundColor: "white", color: "black" }}>
                            Let&apos;s Collaborate
                        </button>
                    </Link>
                </div>

                <div className="homePagePopularArtists_users-color-container">
                    <span
                        className="homePagePopularArtists_item"
                        style={{ backgroundColor: "#CDD1B8", borderRadius: "50% 50% 0 50%", '--i': 1 } as React.CSSProperties}
                    >
                    </span>
                    <Link
                        href={routeToHref(toUserCollabPage(list[0]["slug"]))}
                    >
                        <div className='cursor-pointer'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="homePagePopularArtists_item"
                                src={list[0]["url"]}
                                style={{ borderRadius: "50% 50% 0 0", '--i': 2 } as React.CSSProperties}
                                alt=""
                            />
                        </div>
                    </Link>
                    <span
                        className="homePagePopularArtists_item"
                        style={{ backgroundColor: "#C8A75F", borderRadius: "50%", '--i': 3 } as React.CSSProperties}
                    ></span>
                    <Link
                        href={routeToHref(toUserCollabPage(list[1]["slug"]))}
                    >
                        <div className='cursor-pointer'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="homePagePopularArtists_item"
                                src={list[1]["url"]}
                                style={{ borderRadius: "0 0 0 50%", '--i': 4 } as React.CSSProperties}
                                alt="" />
                        </div>
                    </Link>

                    <Link
                        href={routeToHref(toUserCollabPage(list[2]["slug"]))}
                    >
                        <div className='cursor-pointer'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="homePagePopularArtists_item"
                                src={list[2]["url"]}
                                style={{ borderRadius: "50%", '--i': 10 } as React.CSSProperties}
                                alt="" />
                        </div>
                    </Link>
                    <span
                        className="homePagePopularArtists_item"
                        style={{ backgroundColor: "#C4DFDF", borderRadius: "50% 0 50% 50%", '--i': 11 } as React.CSSProperties}
                    ></span>
                    <Link
                        href={routeToHref(toUserCollabPage(list[3]["slug"]))}
                    >
                        <div className='cursor-pointer'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="homePagePopularArtists_item"
                                src={list[3]["url"]}
                                style={{ borderRadius: "50% 0 0 0", '--i': 12 } as React.CSSProperties}
                                alt="" />
                        </div>
                    </Link>
                    <span
                        className="homePagePopularArtists_item"
                        style={{ backgroundColor: "#F9FCDC", borderRadius: "0 50% 50% 0", '--i': 5 } as React.CSSProperties}
                    ></span>

                    <span
                        className="homePagePopularArtists_item"
                        style={{ backgroundColor: "#f5bec3", borderRadius: "0 50% 50% 0", '--i': 9 } as React.CSSProperties}
                    ></span>

                    <Link
                        href={routeToHref(toUserCollabPage(list[4]["slug"]))}
                    >
                        <div className='cursor-pointer'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="homePagePopularArtists_item"
                                src={list[4]["url"]}
                                style={{ borderRadius: "50% 0 0 50%", '--i': 8 } as React.CSSProperties}
                                alt=""
                            />
                        </div>
                    </Link>
                    <span
                        className="homePagePopularArtists_item"
                        style={{ backgroundColor: "#E9CFF1", borderRadius: "50% 50% 0 50%", '--i': 7 } as React.CSSProperties}
                    ></span>
                    <Link
                        href={routeToHref(toUserCollabPage(list[5]["slug"]))}
                    >
                        <div className='cursor-pointer'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="homePagePopularArtists_item"
                                src={list[5]["url"]}
                                style={{ backgroundColor: "#8071a8", borderRadius: "0 50% 50% 50%", '--i': 6 } as React.CSSProperties}
                                alt=""
                            />
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePopularArtists;