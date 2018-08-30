<script>
// Mixins
import diy from "../mixins/diy";

/**
 * A space. No, THE space. Some code is commented out because the styleguide doesn't like it. I'll need to solve for that before this all goes live.
 * @since 1.0.0
 */
export default {
    computed: {
        /**
         * Compute the various background image props and return an image path
         */
        computedBackgroundImage() {
            if (this.backgroundImage && this.showBackgroundImage) {
                if (this.backgroundImageRemote) {
                    return this.backgroundImage;
                }
                return this.imgix(
                    this.backgroundImage +
                        (this.backgroundImageParams
                            ? "?" + this.backgroundImageParams
                            : "")
                );
            }

            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        },

        /**
         * Compute the various wrapper props and return an array of classes
         */
        computedWrapperClasses() {
            return [
                this.wrapperClasses,
                this.wrapperExtensionClasses,
                this.backgroundImageExtensionClasses,
                this.orderClasses,
                this.sticky ? this.stickyExtensionClasses : null
            ];
        }
    },

    mixins: [diy],

    name: "DiySpace",

    props: {
        /**
         * Default classes on the aside div
         */
        afterClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the after div
         */
        afterExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the aside div
         */
        asideClasses: {
            default: "col-md-6 col-12",
            type: String
        },

        /**
         * Classes that can be applied to the aside div
         */
        asideExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the aside additonal div
         */
        asideAdditionalClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the aside additional div
         */
        asideAdditionalExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the aside body div
         */
        asideBodyClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the aside body div
         */
        asideBodyExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the aside footer div
         */
        asideFooterClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the aside footer div
         */
        asideFooterExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the aside header div
         */
        asideHeaderClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the aside header div
         */
        asideHeaderExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * The URL for a background image
         */
        backgroundImage: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the background image div
         */
        backgroundImageExtensionClasses: {
            default: "bg-no-repeat bg-position-center bg-size-cover",
            type: String
        },

        /**
         * Imgix params that can be applied to the background image
         */
        backgroundImageParams: {
            default: "w=1440&auto=compress",
            type: String
        },

        /**
         * Is the background image in our s3 bucket or not
         */
        backgroundImageRemote: {
            default: false,
            type: Boolean
        },

        /**
         * Default classes on the before div
         */
        beforeClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the before div
         */
        beforeExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the body div
         */
        bodyClasses: {
            default: "row",
            type: String
        },

        /**
         * Classes that can be applied to the body div
         */
        bodyExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the body additonal div
         */
        bodyAdditionalClasses: {
            default: "col",
            type: String
        },

        /**
         * Classes that can be applied to the body additional div
         */
        bodyAdditionalExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the body footer div
         */
        bodyFooterClasses: {
            default: "col-12",
            type: String
        },

        /**
         * Classes that can be applied to the body footer div
         */
        bodyFooterExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the body header div
         */
        bodyHeaderClasses: {
            default: "col-12",
            type: String
        },

        /**
         * Classes that can be applied to the body header div
         */
        bodyHeaderExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the container div
         */
        containerClasses: {
            default: "container",
            type: String
        },

        /**
         * Classes that can be applied to the container div
         */
        containerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the footer div
         */
        footerClasses: {
            default: "row",
            type: String
        },

        /**
         * Default classes on the footer content div
         */
        footerContentClasses: {
            default: "col-12",
            type: String
        },

        /**
         * Classes that can be applied to the footer content div
         */
        footerContentExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the footer div
         */
        footerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the header div
         */
        headerClasses: {
            default: "row",
            type: String
        },

        /**
         * Default classes on the header content div
         */
        headerContentClasses: {
            default: "col-12",
            type: String
        },

        /**
         * Classes that can be applied to the header content div
         */
        headerContentExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the header div
         */
        headerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes the main div
         */
        mainClasses: {
            default: "col-md-6 col-12",
            type: String
        },

        /**
         * Default classes on the main additonal div
         */
        mainAdditionalClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the main additional div
         */
        mainAdditionalExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the main body div
         */
        mainBodyClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the main body div
         */
        mainBodyExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the main div
         */
        mainExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes the main footer div
         */
        mainFooterClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the main footer div
         */
        mainFooterExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the main header div
         */
        mainHeaderClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the main header div
         */
        mainHeaderExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes for re-ordering the component in the context of a template
         */
        orderClasses: {
            default: null,
            type: String
        },

        /**
         * Should we show the component
         */
        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the after div
         */
        showAfter: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the aside div
         */
        showAside: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the aside additional div
         */
        showAsideAdditional: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the aside body div
         */
        showAsideBody: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the aside footer div
         */
        showAsideFooter: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the aside header div
         */
        showAsideHeader: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show a background image
         */
        showBackgroundImage: {
            default: false
        },

        /**
         * Should we show the before div
         */
        showBefore: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the body div
         */
        showBody: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the body footer
         */
        showBodyFooter: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the body header div
         */
        showBodyHeader: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the container div
         */
        showContainer: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the footer div
         */
        showFooter: {
            default: true,
            type: Boolean
        },

        showFooterContent: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the header div
         */
        showHeader: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the header content
         */
        showHeaderContent: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main div
         */
        showMain: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main additional div
         */
        showMainAdditional: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main body div
         */
        showMainBody: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main footer div
         */
        showMainFooter: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main header div
         */
        showMainHeader: {
            default: true,
            type: Boolean
        },

        /**
         * Is the space sticky
         */
        sticky: {
            default: false,
            type: Boolean
        },

        /**
         * Classes that can be applied if the component if 'sticky' is true
         */
        stickyExtensionClasses: {
            default: "sticky-top",
            type: String
        },

        /**
         * Default classes on the top level div
         */
        wrapperClasses: {
            default: "wrapper",
            type: String
        },

        /**
         * Classes that can be applied to the wrapper div
         */
        wrapperExtensionClasses: {
            default: "py-3",
            type: String
        }
    }
};
</script>

<template>
    <div :class="computedWrapperClasses" :id="identify('wrapper')" v-lazy:background-image="computedBackgroundImage" v-if="show">
        <div :class="[beforeClasses, beforeExtensionClasses]" :id="identify('before')" v-if="showBefore">
            <!-- @slot The before slot, where you would put a top detail shape -->
            <slot name="before">
            </slot>
        </div>
        <!-- @slot The default slot -->
        <slot>
            <div :class="[containerClasses, containerExtensionClasses]" :id="identify('container')" v-if="showContainer">
                <!-- @slot The container slot -->
                <slot name="container">
                    <div :class="[headerClasses, headerExtensionClasses]" :id="identify('header')" v-if="showHeader">
                        <!-- @slot The container header slot -->
                        <slot name="header">
                            <div :class="[headerContentClasses, headerContentExtensionClasses]" :id="identify('header-content')" v-if="showHeaderContent">
                                <slot name="header-content"></slot>
                            </div>
                        </slot>
                    </div>

                    <div :class="[bodyClasses, bodyExtensionClasses]" :id="identify('body')" v-if="showBody">
                        <!-- @slot The body slot, at the row level -->
                        <slot name="body">
                            <div :class="[bodyHeaderClasses, bodyHeaderExtensionClasses]" :id="identify('body-header')" v-if="showBodyHeader">
                                <!-- @slot The body header slot, in a column -->
                                <slot name="body-header"></slot>
                            </div>
                            <div :class="[mainClasses, mainExtensionClasses]" :id="identify('main')" v-if="showMain">
                                <!-- @slot The main slot -->
                                <slot name="main">
                                    <div :class="[mainHeaderClasses, mainHeaderExtensionClasses]" :id="identify('main-header')" v-if="showMainHeader">
                                        <!-- @slot The main header slot -->
                                        <slot name="main-header"></slot>
                                    </div>
                                    <div :class="[mainBodyClasses, mainBodyExtensionClasses]" :id="identify('main-body')" v-if="showMainBody">
                                        <!-- @slot The main body slot -->
                                        <slot name="main-body"></slot>
                                    </div>
                                    <div :class="[mainAdditionalClasses, mainAdditionalExtensionClasses]" :id="identify('main-additional')" v-if="showMainAdditional">
                                        <!-- @slot The main additional slot -->
                                        <slot name="main-additional"></slot>
                                    </div>
                                    <div :class="[mainFooterClasses, mainFooterExtensionClasses]" :id="identify('main-footer')" v-if="showMainFooter">
                                        <!-- @slot The main footer slot -->
                                        <slot name="main-footer"></slot>
                                    </div>
                                </slot>
                            </div>
                            <div :class="[asideClasses, asideExtensionClasses]" :id="identify('aside')" v-if="showAside">
                                <!-- @slot The aside slot -->
                                <slot name="aside">
                                    <div :class="[asideHeaderClasses, asideHeaderExtensionClasses]" :id="identify('aside-header')" v-if="showAsideHeader">
                                        <!-- @slot The aside header slot -->
                                        <slot name="aside-header"></slot>
                                    </div>
                                    <div :class="[asideBodyClasses, asideBodyExtensionClasses]" :id="identify('aside-body')" v-if="showAsideBody">
                                        <!-- @slot The aside body slot -->
                                        <slot name="aside-body"></slot>
                                    </div>
                                    <div :class="[asideAdditionalClasses, asideAdditionalExtensionClasses]" :id="identify('aside-additional')" v-if="showAsideAdditional">
                                        <!-- @slot The aside additional slot -->
                                        <slot name="aside-additional"></slot>
                                    </div>
                                    <div :class="[asideFooterClasses, asideFooterExtensionClasses]" :id="identify('aside-footer')" v-if="showAsideFooter">
                                        <!-- @slot The aside footer slot -->
                                        <slot name="aside-footer"></slot>
                                    </div>
                                </slot>
                            </div>
                            <div :class="[bodyFooterClasses, bodyFooterExtensionClasses]" :id="identify('body-footer')" v-if="showBodyFooter">
                                <!-- @slot The full body slot, in a column -->
                                <slot name="body-footer"></slot>
                            </div>
                        </slot>
                    </div>

                    <div :class="[footerClasses, footerExtensionClasses]" :id="identify('footer')" v-if="showFooter">
                        <!-- @slot The container header slot -->
                        <slot name="footer">
                            <div :class="[footerContentClasses, footerContentExtensionClasses]" :id="identify('footer-content')" v-if="showFooterContent">
                                <slot name="footer-content"></slot>
                            </div>
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>

        <div :class="[afterClasses, afterExtensionClasses]" :id="identify('after')" v-if="showAfter">
            <!-- @slot The after slot, where you would put a bottom detail shape -->
            <slot name="after">
            </slot>
        </div>

        <div :id="identify('schema')">
            <!-- @slot The schema slot, for space-specific schema -->
            <slot name="schema">
            </slot>
        </div>

        <div :id="identify('portal')">
            <!-- @slot The portal slot, for things that need to be added to spaces that don't really belong -->
            <slot name="portal"></slot>
        </div>
    </div>
</template>
