import rand from "../assets/js/utils/rand";

export const actions = {
    // Set user from dispatch
    setAccount: (context, user) => {
        context.commit("mutateAccount", user);
    },

    // Sign in the user
    signIn: async (context, form) => {
        const signInApi = await import("../assets/js/services/aceable/signIn").then(
            response => response.default
        );

        let account = await signInApi(form).catch(error => {
            context.commit(
                "mutateError",
                error.response.data.errorList[0].message
            );

            throw error.response.data.errorList[0].message;
        });

        context.commit("mutateError", null);
        context.commit("mutateAccount", account);

        await context.dispatch(
            "layer/push",
            {
                event: "signIn"
            },
            {
                root: true
            }
        );
    },

    // Sign out the user
    signOut: async context => {
        await context.dispatch(
            "layer/push",
            {
                event: "signOut"
            },
            {
                root: true
            }
        );

        context.commit("mutateAccount", null);
    },

    // Sign up the user
    signUp: async (context, form) => {
        const signUpApi = await import("../assets/js/services/aceable/signUp").then(
            response => response.default
        );

        let account = await signUpApi(form).catch(error => {
            context.commit(
                "mutateError",
                error.response.data.errorList[0].message
            );

            throw error.response.data.errorList[0].message;
        });

        context.commit("mutateError", null);
        context.commit("mutateAccount", account);

        await context.dispatch(
            "layer/push",
            {
                event: "signUp"
            },
            {
                root: true
            }
        );
    },

    // Sign up the user without a password
    signUpWithoutPassword: async (context, form) => {
        form.password = rand(16);

        const signUpApi = await import("../assets/js/services/aceable/signUp").then(
            response => response.default
        );

        let account = await signUpApi(form).catch(error => {
            context.commit(
                "mutateError",
                error.response.data.errorList[0].message
            );

            throw error.response.data.errorList[0].message;
        });

        const passwordResetApi = await import("../assets/js/services/aceable/passwordReset").then(
            response => response.default
        );

        await passwordResetApi({
            username: account.username
        }).catch(error => {
            context.commit(
                "mutateError",
                error.response.data.errorList[0].message
            );

            throw error.response.data.errorList[0].message;
        });

        context.commit("mutateError", null);
        context.commit("mutateAccount", account);

        await context.dispatch(
            "layer/push",
            {
                event: "signUp"
            },
            {
                root: true
            }
        );
    },

    sync: async context => {
        const syncApi = await import("../assets/js/services/aceable/sync").then(
            response => response.default
        );

        let account = await syncApi(context.getters.sessionToken);

        context.commit("mutateAccount", account);
    }
};

export const getters = {
    resetCode: state => (state.account ? state.account.resetCode : ""),
    sessionToken: state => (state.account ? state.account.sessionToken : null),
    signedIn: state => (state.account ? true : false)
};

export const mutations = {
    mutateAccount: (state, value) => {
        state.account = value;
    },

    mutateError: (state, value) => {
        state.error = value;
    },

    mutateIntake: (state, value) => {
        state.intake = value;
    },

    mutateTeacher: (state, value) => {
        state.teacher = value;
    }
};

export const state = () => ({
    account: null,
    error: null,
    intake: null,
    teacher: null
});
