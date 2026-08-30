export type Author = {
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO string
  image: string; // path under public/images
  content: string; // simple HTML for now
  categories?: string[];
  tags?: string[];
  author?: Author;
  readTime?: number; // in minutes
};

export const blogs: BlogPost[] = [
  {
    slug: "crispy-chicken-secrets",
    title: "The Secrets Behind Our Crispy Chicken",
    excerpt:
      "Ever wondered how we get that perfect crunch every time? Here are three kitchen secrets you can try at home.",
    date: "2025-08-15",
    image: "/images/3.webp",
    categories: ["Cooking Tips", "Recipes"],
    tags: ["chicken", "cooking", "recipes"],
    readTime: 4,
    author: {
      name: "Chef Maria Rodriguez",
      role: "Head Chef",
      avatar: "/images/chef-maria.jpg",
      bio: "With over 15 years of experience in Southern cuisine, Chef Maria brings authentic flavors to every dish.",
    },
    content: `
      <h2>Our Secret to Perfect Crispy Chicken</h2>
      <p>Our signature crispy chicken starts with premium cuts, a carefully seasoned marinade, and a double-coating technique for maximum crunch. We rest the chicken before frying to set the crust, then fry at a precise temperature for that golden finish.</p>
      <h3>What you can try at home</h3>
      <ul>
        <li>Rest after coating to let the crust hydrate</li>
        <li>Use a thermometer to control oil temperature</li>
        <li>Season the flour generously</li>
      </ul>
    `,
  },
  {
    slug: "family-feast-ideas",
    title: "Family Feast: 5 Sharing Ideas for Game Night",
    excerpt:
      "From spicy tenders to honey-butter biscuits, here's a simple way to build a shareable spread everyone will love.",
    date: "2025-07-02",
    image: "/images/1.webp",
    categories: ["Family Meals", "Entertaining"],
    tags: ["family", "game night", "sharing"],
    readTime: 5,
    author: {
      name: "Alex Johnson",
      role: "Marketing Director",
      bio: "Alex loves bringing people together over great food and creating memorable dining experiences.",
    },
    content: `
      <h2>Create the Perfect Game Night Spread</h2>
      <p>Game night is better with a spread! Mix crispy chicken, spicy tenders, and refreshing sides. Don't forget sauces and our Honey-Butter Biscuits to keep the energy high.</p>
      <ol>
        <li>Pick a base: mixed chicken pieces</li>
        <li>Add variety: spicy tenders or sandwiches</li>
        <li>Balance with sides: slaw, fries, or rice</li>
        <li>Sauces: ranch, BBQ, and spicy options</li>
        <li>Sweet finish: biscuits with honey-butter</li>
      </ol>
    `,
  },
  {
    slug: "halal-commitment-malaysia",
    title: "Our Halal Commitment in Malaysia",
    excerpt:
      "Learn how we uphold Halal standards from sourcing to kitchen practices at every Texas Chicken™ in Malaysia.",
    date: "2025-05-20",
    image: "/images/subscription-bg.jpg",
    categories: ["Company News", "Halal"],
    tags: ["halal", "malaysia", "commitment"],
    readTime: 6,
    author: {
      name: "Ahmad Fauzi",
      role: "Quality Assurance Manager",
      bio: "Ensuring the highest Halal standards and food safety practices across all our locations.",
    },
    content: `
      <h2>Our Halal Commitment</h2>
      <p>We partner only with certified suppliers and maintain daily checks to ensure Halal compliance. Our teams receive ongoing training, and our kitchens are monitored for cleanliness and segregation.</p>
      <p>For more details, visit our Halal page and download the latest certification.</p>
    `,
  },
];
