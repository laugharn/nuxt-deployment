import sitemap from "sitemap";

export default async (req, res, next) => {
    let sm = sitemap.createSitemap({
        cacheTime: 600000,
        hostname: "https://be.aceable.com"
    });

    sm.toXML((err, xml) => {
        if (err) {
            res.end(err);
        }

        res.end(xml);
    });
};
