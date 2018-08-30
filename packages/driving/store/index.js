export const actions = {};

export const getters = {};

export const mutations = {
    mutateTemplate: (state, template) => {
        state.template = template;
    },

    mutateTemplateData: (state, templateData) => {
        state.templateData = templateData;
    },

    mutateUpdatedAt: (state, updatedAt) => {
        state.updated_at = updatedAt;
    }
};

export const state = () => ({
    template: null,
    templateData: null,
    updated_at: null
});
