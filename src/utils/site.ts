const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://sahal.pro";

export const siteConfig = {
  name: "Sahal | Full Stack Developer",
  description:
    "Personal portfolio website showcasing my projects and skills as a full stack developer",
  url: site_url,
  ogImage: `${site_url}/_static/og-image.png`,
  links: {
    twitter: "https://twitter.com/sahal_salim",
    github: "https://github.com/sahalsalim4",
    linkedin: "https://www.linkedin.com/in/sahal-salim-38a0b32b9",
    instagram: "https://instagram.com/sahal_.l_",
  },
  mailSupport: "sahalsalim04@gmail.com",
};
