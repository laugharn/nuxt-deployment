export default context => {
    if (!context.route.path.endsWith("/")) {
        let query = Object.keys(context.route.query).length
            ? "?" +
              Object.keys(context.route.query)
                  .map(
                      k =>
                          `${encodeURIComponent(k)}=${encodeURIComponent(
                              context.route.query[k]
                          )}`
                  )
                  .join("&")
            : "";

        return context.redirect(`${context.route.path}/${query}`);
    }
};
