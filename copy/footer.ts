import { Config } from "config/config";
import { FooterColumn } from "types/model/footer";

export const footerLinkColumns: FooterColumn[] = [
  {
    links: [
      {
        name: "Get Inspired",
        url: `${Config.baseUrl}/get-inspired`,
      },
      { name: "FAQ", url: `${Config.baseUrl}/faq` },
      { name: "About Us", url: `${Config.baseUrl}/about-us` },
    ],
  },
  {
    links: [
      {
        name: "Terms & Policy",
        url: `${Config.baseUrl}/terms-and-policy`,
      },
      {
        name: "Tutorial",
        url: `${Config.baseUrl}/tutorial`,
      },
      {
        name: "privacy",
        url: `${Config.baseUrl}/privacy`,
      },
      {
        name: "Contacts",
        url: `${Config.baseUrl}/contact-us`,
      },
    ],
  },
];
