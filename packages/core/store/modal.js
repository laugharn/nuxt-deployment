import each from "lodash/each";
import merge from "lodash/merge";

export const actions = {
    set: (context, config) => {
        context.commit("set", config);
    },

    toggle: context => {
        context.commit("toggle");
    }
};

export const getters = {};

export const mutations = {
    set: (state, config) => {
        each(config, (value, key) => {
            state[key] = value;
        });
    },

    toggle: state => {
        state.show = !state.show;
    }
};

export const state = () => ({
    buttons: null,
    description: null,
    dismissCallback: null,
    title: "Modal!"
});
