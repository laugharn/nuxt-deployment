import get from "lodash/get";
import isUrl from "../assets/js/utils/isUrl";
import store from "store";

export const actions = {
    checkout: async context => {
        // let cakeId = get(context.rootState.page.content, "cake_id", null);
        let cakeId = null;

        if (cakeId) {
            let cakeUrl = `https://aceable.cake.aclz.net/?a=${cakeId}&c=${
                process.env.CAKE_CAMPAIGN
            }&p=r&s1=`;

            await context.dispatch(
                "layer/push",
                {
                    event: "navigatedTo",
                    destinationUrl: cakeUrl
                },
                {
                    root: true
                }
            );

            window.location.href = cakeUrl;
        } else {
            context.dispatch("goTo", "/checkout/");
        }
    },

    goTo: async (context, location) => {
        await context.dispatch(
            "layer/push",
            {
                event: "navigatedTo",
                destinationUrl: location
            },
            {
                root: true
            }
        );

        if (location == "#") {
            // Do nothing
        } else if (location.startsWith("tel:")) {
            window.location.href = location;
        } else if (isUrl(location)) {
            window.open(location, "_blank");
        } else {
            const hostname =
                window.location.hostname == "localhost"
                    ? "http://localhost" +
                      (window.location.port ? ":" + window.location.port : "")
                    : `https://${window.location.hostname}`;

            window.location.href = `${hostname}${location}`;
        }
    },

    scrollTo: async (context, id) => {
        const scroll = await import("smooth-scroll").then(
            response => response.default
        );
        const anchor = document.querySelector(id);

        scroll({
            easing: "easeInOutQuad",
            speed: 1000
        }).animateScroll(anchor);
    },

    setCookie: async (context, data) => {
        const { prefix, name } = data;

        const cookie = store.set(kebabCase(prefix + "-" + name), true);

        return cookie;
    },

    shouldShowContent: async (context, data) => {
        const { prefix, name } = data;
        const capture = get(
            context.state.content,
            "attributes.require_capture"
        );

        if (capture == true) {
            const cookie = store.get(kebabCase(`${prefix}-${name}`));

            return cookie ? cookie : false;
        }

        return true;
    },

    toggleCart: context => {
        context.commit("toggleCart");
    },

    toggleMenu: context => {
        context.commit("toggleMenu");
    }
};

export const mutations = {
    mutate: (state, obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            state[key] = value;
        });
    },

    mutateContent: (state, content) => {
        state.content = content;
    },

    mutateContentParts: (state, contentParts) => {
        state.contentParts = contentParts;
    },

    mutatePath: (state, path) => {
        state.path = path;
    },

    mutateTemplate: (state, template) => {
        state.template = template;
    },

    mutateTemplateData: (state, templateData) => {
        state.templateData = templateData;
    },

    setFromMiddleware: (state, { content, contentParts, template }) => {
        state.content = content;
        state.contentParts = contentParts;
        state.template = template;
    },

    setHelpers: (state, { host, params, path, protocol, query }) => {
        state.host = host;
        state.params = params;
        state.path = path;
        state.protocol = protocol;
        state.query = query;
    },

    toggleCart: state => {
        state.showCart = !state.showCart;
    },

    toggleMenu: state => {
        state.showMenu = !state.showMenu;
    }
};

export const state = () => ({
    checkoutType: "goTo",
    content: null,
    contentParts: null,
    host: null,
    params: null,
    path: null,
    protocol: null,
    query: null,
    showCart: false,
    showMenu: false,
    showModal: false,
    template: null,
    templateData: null,
    theme: null
});
