import React, { FC } from 'react'
import Link from 'next/link'
import styles from '../public/styles/index.module.scss';
import { FooterColumn } from 'types/core';

interface FooterColumnsProps {
  columns: FooterColumn[]
}

export interface FooterLinkProps {
  title: string
  href: string
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  title,
  href
}) => {
  return (
    <li>
      <Link href={href}>
        <a>
          {title}
        </a>
      </Link>
    </li>
  )
}

export const FooterColumns: FC<FooterColumnsProps> = ({ columns }) => (
  <>
    {columns.map((column, index) => (
      <div key={index} className="col-md-4 col-xl-3">
        <ul className={styles["nav-list"]}>
          {column.links.map((link, index) =>
            <FooterLink key={index} title={link.name} href={link.url} />
          )}
        </ul>
      </div>
    ))}
  </>
)