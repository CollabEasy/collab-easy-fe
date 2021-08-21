export interface WebRoute {
    /**
     * This is understood as being a normal URL for use in non-NextJS <a>
     */
    href: string;
    as?: undefined | null | string;
}