<script>
// Components
import DiyBadge from "./badge.vue";
import DiyIcon from "./icon.vue";
import DiyLink from "@core/components/diy/link.vue";

// Mixins
import diy from "../mixins/diy";

export default {
    components: {
        DiyBadge,
        DiyIcon,
        DiyLink
    },

    computed: {
        computedInnerComponentType() {
            return this.innerComponentType
                ? this.innerComponentType
                : this.href
                    ? "a"
                    : "span";
        },

        computedItemClasses() {
            return [
                this.itemClasses,
                this.itemExtensionClasses,
                this.inline ? "list-inline-item" : null
            ];
        },

        computedClickHandler() {
            console.log(this.toggleSubItemsOnClick);
            if (this.toggleSubItemsOnClick) {
                return this.toggleSubItems;
            } else {
                return false;
            }
        }
    },

    data() {
        return {
            loading: true
        };
    },

    methods: {
        clickHandler() {
            if (this.toggleSubItemsOnClick) {
                this.toggleSubItems();
            }
        },

        async itemEvent() {
            if (this.event) {
                await this.event();
            }
            await this.$store.dispatch("page/goTo", this.href);
        },

        toggleSubItems() {
            this.subItemsShow = !this.subItemsShow;
        }
    },

    mixins: [diy],

    mounted() {
        this.loading = false;
    },

    props: {
        afterClasses: {
            default: null,
            type: String
        },

        afterExtensionClasses: {
            default: "ml-1 my-auto",
            type: String
        },

        badge: {
            default: null,
            type: Object
        },

        beforeClasses: {
            default: null,
            type: String
        },

        beforeExtensionClasses: {
            default: "mr-1 my-auto",
            type: String
        },

        content: {
            default: null,
            type: String
        },

        contentClasses: {
            default: null,
            type: String
        },

        contentExtensionClasses: {
            default: "my-auto",
            type: String
        },

        event: {
            default: null,
            type: Function
        },

        href: {
            default: null,
            type: String
        },

        icon: {
            default: null,
            type: Object
        },

        inline: {
            default: false,
            type: Boolean
        },

        innerClasses: {
            default: "ListItem__inner --default",
            type: String
        },

        innerComponentType: {
            default: null,
            type: String
        },

        innerExtensionClasses: {
            default: null,
            type: String
        },

        itemClasses: {
            default: null,
            type: String
        },

        itemExtensionClasses: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        showAfter: {
            default: false,
            type: Boolean
        },

        showBadge: {
            default: true,
            type: Boolean
        },

        showBefore: {
            default: false,
            type: Boolean
        },

        showContent: {
            default: true,
            type: Boolean
        },

        showIcon: {
            default: true,
            type: Boolean
        },

        showInner: {
            default: true,
            type: Boolean
        },

        subItems: {
            default: null,
            type: Array
        },

        subItemsShow: {
            default: false,
            type: Boolean
        },

        subItemsAsLinks: {
            default: false,
            type: Boolean
        },

        toggleSubItemsOnClick: {
            default: true,
            type: Boolean
        }
    }
};
</script>

<template>
    <li @click="clickHandler()" :class="computedItemClasses" :id="id" v-if="show">
        <slot>
            <component :class="[innerClasses, innerExtensionClasses]" @click.prevent="itemEvent()" :href="href" :is="computedInnerComponentType" style="align-items:center;display:inline-flex" v-if="showInner">

                <span :class="[beforeClasses, beforeExtensionClasses]" style="align-items:center;display:flex" v-if="showBefore">
                    <slot name="before">
                        <DiyIcon v-bind="icon" v-if="showIcon" />
                    </slot>
                </span>

                <span :class="[contentClasses, contentExtensionClasses]" v-if="showContent" style="align-items:center;display:flex;flex:1">
                    <slot name="content">
                        <span v-html="markdown(content)" v-if="content"></span>
                    </slot>
                </span>

                <span :class="[afterClasses, afterExtensionClasses]" style="align-items:center;display:flex" v-if="showAfter">
                    <slot name="after">
                        <DiyBadge v-bind="badge" v-if="showBadge" />
                    </slot>
                </span>

            </component>
        </slot>
        <ul v-if="subItemsShow && subItems" class="sub-list">
          <slot name="subListBeforeItems">
          </slot>
          <li v-for="(item, itemIndex) in subItems" class="sub-list__item">
            <!-- You can optionally fill your sub li items as just vanilla li tags or with links within the li tag. -->
            <template v-if="!subItemsAsLinks">
              <span v-html="markdown(item.content)" v-if="item.content"></span>
            </template>
            <template v-else>
              <DiyLink class="sub-list__item-link" v-bind="item"/>
            </template>
          </li>
        </ul>
    </li>
</template>
