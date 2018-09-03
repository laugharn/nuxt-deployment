import axios from "axios";

export default async zip => {
    return await axios
        .get(
            "https://datasette-lvlcncoprp.now.sh/prices-9a2c234/prices.json?RegionName__exact=" +
                zip
        )
        .then(response => response.data.rows[0][7]);

    // return response * data.volume * data.commission;
};
