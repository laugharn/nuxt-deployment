<script>
// Components
import DiyList from "@core/components/diy/list.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import startCase from "lodash/startCase";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyList,
        DiySpace
    },

    computed: {
        baseConfig() {
            return {
                list: {
                    id: this.id + "-list",
                    inline: true,
                    items: this.build(),
                    listExtensionClasses: "font-size-xxs mb-0 text-secondary",
                    slot: "body-header"
                },

                space: {
                    id: this.id,
                    wrapperExtensionClasses:
                        "bg-light d-none d-md-block font-size-sm py-2"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    methods: {
        build(path = null) {
            let items = [];
            path = path || this.get(this.$store.state.page, "path");

            let breadcrumbs = path
                .split("/")
                .filter(item => item !== "")
                .map(item => {
                    items.push(item);

                    return {
                        content: startCase(item),
                        href: "/" + items.join("/") + "/"
                    };
                });

            breadcrumbs.unshift({
                content: "Home",
                href: "/"
            });

            if (breadcrumbs.length > 1) {
                breadcrumbs[breadcrumbs.length - 1].content = this.get(
                    this.$store.state.page.content,
                    "post_title"
                );
            }

            let breadcrumbsLength = breadcrumbs.length;

            do {
                if (
                    breadcrumbsLength !== breadcrumbs.length &&
                    breadcrumbsLength !== 0
                ) {
                    breadcrumbs.splice(breadcrumbsLength, 0, {
                        content: this.delimiter
                    });
                }
            } while (breadcrumbsLength--);

            return breadcrumbs;
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.breadcrumbs",
            type: String
        },

        delimiter: {
            default: ">",
            type: String
        },

        id: {
            default: "breadcrumbs",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyList v-bind="computedConfig.list" />
    </DiySpace>
</template>
