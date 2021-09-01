interface FooterLink {
    url: string
    name: string
    rel?: string
    id?: string
    className?: string
}

export interface FooterColumn {
    links: FooterLink[]
}