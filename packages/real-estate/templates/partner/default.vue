<script>
// Components
// DIY
import DiyStructure from "@core/components/diy/structure.vue";

// Prefab
import DrawerCart from "~/components/prefab/drawer/cart/default.vue";
import ModalConflict from "~/components/prefab/modal/conflict/default.vue";
import SpaceCalloutButtons from "~/components/prefab/space/callout/buttons.vue";
import SpaceCalloutPartner from "~/components/prefab/space/callout/partner.vue";
import SpaceCalloutYoutube from "~/components/prefab/space/callout/youtube.vue";
import SpaceFooter from "~/components/prefab/space/footer/default.vue";
import SpaceNav from "~/components/prefab/space/nav/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyStructure,

        DrawerCart,
        ModalConflict,
        SpaceCalloutButtons,
        SpaceCalloutPartner,
        SpaceCalloutYoutube,
        SpaceFooter,
        SpaceNav,
        SpaceTrustpilot
    },

    computed: {
        buttonItems() {
            let buttons = [];

            this.stateFilters.forEach(state => {
                this.lineFilters.forEach(line => {
                    let title = (state + " " + line)
                        .replace("-", " ")
                        .replace(/\b\w/g, l => l.toUpperCase());

                    let href =
                        "https://aceable.cake.aclz.net/?a=" +
                        this.$store.state.page.content.cake_id +
                        "&c=" +
                        (line == "continuing-education" ? "272" : "267") +
                        "&p=r&s1=";

                    buttons.push({
                        href,
                        title
                    });
                });
            });

            return buttons;
        },

        lineFilters() {
            let allLines = ["continuing-education", "pre-license"];

            if (this.$store.state.page.content.filters) {
                return this.$store.state.page.content.filters.lines
                    ? this.$store.state.page.content.filters.lines
                    : allLines;
            }

            return allLines;
        },

        stateFilters() {
            let allStates = ["texas"];

            if (this.$store.state.page.content.filters) {
                return this.$store.state.page.content.filters.states
                    ? this.$store.state.page.content.filters.states
                    : allStates;
            }

            return allStates;
        }
    },

    mixins: [prefab]
};
</script>

<template>
    <DiyStructure>
        <SpaceNav />

        <SpaceCalloutPartner
            :config="{
                buttons: {
                    buttonExtensionClasses: 'btn-convert',
                    items: buttonItems
                }
            }"
            config-key="spaces.hero"
            id="hero"
        />

        <SpaceCalloutYoutube
            :config="{
                buttons: {
                    buttonExtensionClasses: 'btn-convert',
                    items: buttonItems.filter(item => item.title == 'Texas Continuing Education')
                },
                space: {
                    wrarpperExtensionClasses: 'bg-light py-3'
                },
                title: {
                    content: 'Time for your renewal? Let’s gets started!'
                },
                youtube: {
                    src: '6ESXga22vdk'
                }
            }"
            config-key="spaces.texas_continuing_education"
            id="continuing-education"
            v-if="stateFilters.includes('texas') && lineFilters.includes('continuing-education')"
        />

        <SpaceCalloutYoutube
            :config="{
                buttons: {
                    buttonExtensionClasses: 'btn-convert',
                    items: buttonItems.filter(item => item.title == 'Texas Pre License')
                },
                space: {
                    asideExtensionClasses: 'order-1 p-3',
                    mainExtensionClasses: 'order-2 p-3',
                    wrarpperExtensionClasses: 'bg-light py-3'
                },
                title: {
                    content: 'Want to become a real estate agent?'
                },
                youtube: {
                    src: '1CN7yviW2O4'
                }
            }"
            config-key="spaces.texas_pre_license"
            v-if="stateFilters.includes('texas') && lineFilters.includes('pre-license')"
        />

        <SpaceTrustpilot
            :config="{
                trustpilot: {
                    clickable: true
                }
            }"
        />

        <SpaceCalloutButtons
            :config="{
                buttons: {
                    buttonExtensionClasses: 'btn-light'
                },
                space: {
                    wrarpperExtensionClasses: 'bg-brand-to-success py-3 text-white'
                }
            }"
            config-key="spaces.help"
            id="help"
        />

        <SpaceFooter />
        <DrawerCart />
        <ModalConflict />
    </DiyStructure>
</template>
