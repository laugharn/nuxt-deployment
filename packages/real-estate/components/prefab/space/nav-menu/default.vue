<script>
// Components
import DiyList from "@core/components/diy/list.vue";
import DiySpace from "@core/components/diy/space.vue";

// Content
import items from "~/assets/js/content/nav";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyList,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                list: {
                    id: this.id + "-list",
                    itemsInnerExtensionClasses: "text-blue",
                    itemsItemExtensionClasses: "font-size-xxs",
                    items,
                    inline: true,
                    listExtensionClasses: "mb-0",
                    slot: "body-header"
                },
                space: {
                    id: this.id,
                    wrapperExtensionClasses:
                        "d-none d-md-block font-size-sm py-1"
                }
            };
        }
    },

    mixins: [prefab],

    name: "SpaceNavMenu",

    props: {
        configKey: {
            default: "spaces.nav_menu"
        },

        id: {
            default: "nav-menu"
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyList v-bind="computedConfig.list">
        </DiyList>
    </DiySpace>
</template>
