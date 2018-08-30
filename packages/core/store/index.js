export const actions = {};

export const getters = {};

export const mutations = {
    mutateUpdatedAt: (state, updatedAt) => {
        state.updated_at = updatedAt;
    }
};

export const state = () => ({
    updated_at: null
});
