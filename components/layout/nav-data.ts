export type NavChild = {
  href: string;
  label: string;
  note: string;
};

export type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    children: [
      {
        href: "/about",
        label: "About us",
        note: "Connecting markets, delivering growth",
      },
      {
        href: "/about/director",
        label: "Meet a Director",
        note: "Leadership across sourcing and shipping",
      },
      {
        href: "/about/mission",
        label: "Mission",
        note: "What we commit to on every order",
      },
      {
        href: "/about/vision",
        label: "Vision",
        note: "Where we are taking the business",
      },
    ],
  },
  {
    href: "/products",
    label: "Our Products",
    children: [
      {
        href: "/products/whole-spices",
        label: "Whole Spices",
        note: "19 origin-graded lines",
      },
      {
        href: "/products/powder-spices",
        label: "Powder Form Spices & Nutritions",
        note: "Ground, sieved, colour tested",
      },
      {
        href: "/products/vegetables",
        label: "Fresh Vegetables",
        note: "Farm-direct, reefer and ventilated",
      },
      {
        href: "/products/dry-fruits",
        label: "Dry Fruits",
        note: "Konkan and Nashik origins",
      },
      {
        href: "/products/makhana",
        label: "Makhana & Others",
        note: "Bulk and private label",
      },
    ],
  },
  {
    href: "/services",
    label: "Our Services",
    children: [
      {
        href: "/services/packaging-consultancy",
        label: "Packaging Consultancy Services",
        note: "Design, cost, compliance, testing",
      },
      {
        href: "/services/packaging-material-exports",
        label: "Packaging Material Exports",
        note: "Films, cartons, closures, laminates",
      },
      {
        href: "/services/private-label",
        label: "Private Label Product Development",
        note: "Concept to first container",
      },
      {
        href: "/services/sustainable-packaging",
        label: "Sustainable Packaging",
        note: "Recyclable and reduced-material formats",
      },
    ],
  },
  {
    href: "/contact",
    label: "Contact us",
  },
];
