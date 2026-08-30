import {
  BoardMember,
  FooterItems,
  MetricsItem,
  NavItemType,
  NewsItem,
  SocialMediaItem,
} from "@/types";

export const Metrics: MetricsItem[] = [
  {
    id: 1,
    name: "Cities",
    to: 2,
  },
  {
    id: 2,
    name: "Locations",
    to: 7,
  },
  {
    id: 3,
    name: "employees",
    to: 500,
  },
];

export const News: NewsItem[] = [
  {
    id: 1,
    name: "Savor the Moment",
    desc: "Our menu showcases the best of Italian gastronomy",
    date: "1 August 2024",
    img: "/images/restaurant1.jpg",
  },
  {
    id: 2,
    name: "Family Tradition",
    desc: "Our menu showcases the best of Italian gastronomy",
    date: "1 August 2024",
    img: "/images/restaurant2.jpg",
  },
  {
    id: 3,
    name: "Culinary Excellence",
    desc: "Our menu showcases the best of Italian gastronomy",
    date: "1 August 2024",
    img: "/images/restaurant1.jpg",
  },
];

export const SocialMedia: SocialMediaItem[] = [
  {
    id: 1,
    type: 1,
    name: "facebook",
    href: "#",
  },
  {
    id: 2,
    type: 2,
    name: "instagram",
    href: "#",
  },
  {
    id: 3,
    type: 3,
    name: "linkedin",
    href: "#",
  },
  {
    id: 4,
    type: 4,
    name: "twitter",
    href: "#",
  },
];

export const FooterLinks: FooterItems[] = [
  {
    id: 1,
    name: "Contact us",
    href: "/contact",
  },
  {
    id: 2,
    name: "Newsroom",
    href: "/news",
  },
];
export const FooterFGLinks: FooterItems[] = [
  {
    id: 1,
    name: "About Us",
    href: "/about",
  },
  {
    id: 2,
    name: "Brands",
    href: "/brands",
  },
  {
    id: 3,
    name: "Investor Relations",
    href: "/investors",
  },
];

export const BoardMembers: BoardMember[] = [
  {
    position: "Chairperson",
    name: "Alice Johnson",
  },
  {
    position: "Secretary",
    name: "Emily Davis",
  },
  {
    position: "Board Member",
    name: "Susan Lee",
  },
  {
    position: "President/CEO",
    name: "David Thompson",
  },
  {
    position: "Audit Committee Chair",
    name: "Karen White",
  },
  {
    position: "Committee Chair",
    name: "Brian Clark",
  },
  {
    position: "Committee Member",
    name: "Natalie King",
  },
];
export const ExcutiveMangers: BoardMember[] = [
  {
    position: "Chief Executive Officer (CEO)",
    name: "David Thompson",
  },
  {
    position: "Chief Operating Officer (COO)",
    name: "Rebecca Miller",
  },
  {
    position: "Chief Financial Officer (CFO)",
    name: "Michael Brown",
  },
  {
    position: "Chief Technology Officer (CTO)",
    name: "Jason Clark",
  },
  {
    position: "Chief Marketing Officer (CMO)",
    name: "Sarah Johnson",
  },
  {
    position: "Chief Human Resources Officer (CHRO)",
    name: "Emily Davis",
  },
];
