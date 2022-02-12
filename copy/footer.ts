import { Config } from "config/config";
import { FooterColumn } from "types/model/footer";

export const footerLinkColumns: FooterColumn[] = [
  {
    links: [
      { name: "FAQ", url: `${Config.baseUrl}/faq` },
    ],
  },
  {
    links: [
      { name: "About Us", url: `${Config.baseUrl}/about-us` },
    ]
  },
  {
    links: [
      {
        name: "Terms & Policy",
        url: `${Config.baseUrl}/terms-and-policy`,
      },
      
    ],
  },
  {
    links: [
      {
        name: "privacy",
        url: `${Config.baseUrl}/privacy`,
      },
    ]
  }
];
