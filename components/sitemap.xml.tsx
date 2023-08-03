import { GetServerSideProps } from "next";
import { EXAMPLES } from "../pages/examples";
import { slugify, slugifyExample } from "../utils";

function generateSiteMap(pages: string[]) {
  const URL = "https://cronjob.page";
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${URL}</loc>
     </url>
     <url>
       <loc>${URL}/cron</loc>
     </url>
     <url>
       <loc>${URL}/examples</loc>
     </url>
     ${pages
       .map((page) => {
         return `
       <url>
           <loc>${URL}/${page}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

const SiteMap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = [...Object.keys(EXAMPLES).map((key) => slugifyExample(key)), ...Object.values(EXAMPLES).map((val) => `cron/${slugify(val)}`)];

  const sitemap = generateSiteMap(pages);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;

// THIS PAGE CAN BE ENABLED FOR GENERATING A NEW STATIC SITEMAP WHEN 'EXAMPLES' change
