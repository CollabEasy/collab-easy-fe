import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { routeToHref } from 'config/routes';
import { useRoutesContext } from '../../routeContext';
import { artistsForCollab, popularCollabCategories } from 'constants/home';
import { GetCategoryArtistTitle } from 'helpers/categoryHelper';


const HomePopularCatAndArtists = ({ }) => {


    const { toUserCollabPage, toCategoryArtistList } = useRoutesContext();

    useEffect(() => {
        const addAnimation = () => {
            const scrollers = document.querySelectorAll(".scroller");

            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", "true");

                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        };

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }
    }, []);


    return (
        <div className='popularCatAndArtists'>
            <div className="scroller" data-speed="fast">
                <ul className="tag-list scroller__inner">
                    {popularCollabCategories.map((item, index) => (
                        <Link href={toCategoryArtistList(item.slug, GetCategoryArtistTitle(item.slug)).as} passHref>
                            <li className='cursor-pointer'>{item.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="scroller" data-direction="right" data-speed="slow">
                <div className="scroller__inner">
                    {artistsForCollab.map((item, index) => (
                        <Link
                            href={routeToHref(toUserCollabPage(item["slug"]))}
                        >
                            <div className='cursor-pointer'>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="popularCatAndArtists_img"
                                    src={item["url"]}
                                    alt=""
                                />
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePopularCatAndArtists;