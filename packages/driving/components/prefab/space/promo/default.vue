<script>
// Components
import DiyList from "@core/components/diy/list.vue";
import DiyLogo from "@core/components/diy/logo.vue";
import DiyNav from "@core/components/diy/nav.vue";
import DiySpace from "@core/components/diy/space.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

//Scripts
import countdown from '~/assets/js/scripts/countdown.js';

export default {
    components: {
        // DIY
        DiyList,
        DiyLogo,
        DiyNav,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                left: this.left,
                logo: this.logo,
                nav: this.nav,
                right: this.right,
                space: this.space
            };
        }
    },

    mixins: [prefab],

    name: "SpaceNav",

    props: {
        configKey: {
            default: "spaces.nav",
            type: String
        },

        left: {
            default() {
                return {
                    items: [
                        {
                            itemExtensionClasses: "d-none",
                            href: "#",
                            icon: {
                                icon: "bars"
                            },
                            title: "Menu"
                        }
                    ],
                    slot: "left"
                };
            },
            type: Object
        },

        logo: {
            default() {
                return {
                    desktopSrc:
                        "/uploads/sites/3/2018/05/aceable-logo-white.png",
                    mobileSrc:
                        "/uploads/sites/3/2018/05/aceable-logomark-white.png",
                    slot: "center",
                    type: "span"
                };
            },
            type: Object
        },

        nav: {
            default() {
                return {
                    slot: "body-header"
                };
            },
            type: Object
        },

        right: {
            default() {
                return {
                    inline: true,
                    items: [
                        {
                            content: "Sign-in",
                            href: "https://app.aceable.com/user/signin",
                            icon: {
                                icon: "sign-in",
                                show: true
                            }
                        }
                    ],
                    listExtensionClasses: "font-size-sm mb-0",
                    itemsShowBefore: true,
                    slot: "right"
                };
            },
            type: Object
        },

        space: {
            default() {
                return {
                    wrapperExtensionClasses: "promo-wrapper"
                };
            },
            type: Object
        }
    },
    mounted() {
      countdown();
    }
};
</script>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.discount-sale {
    vertical-align: middle;
    display: inline-block;
    text-align: center;
    font-weight: 700 !important;
    font-size: 20px!important;
    font-size: $font-size-lg;
    text-transform: uppercase;
    color: #fff;
    font-weight: 700!important;
    text-transform: uppercase
}

.discount-sale strong {
    font-size: 25px!important;
    bottom: -1px;
    position: relative;
    font-weight: 700 !important;
}

.global-sale-promo {
    padding: 3px 0;
    background: #21333F !important;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    -moz-box-shadow: 0 0 1px 1px rgba(0,0,0,0.3);/*FF 3.5+*/
    -webkit-box-shadow: 0 0 1px 1px rgba(0,0,0,0.3);/*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.3);/* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
}

.countdown-container {
  color: $white;
  max-width: 100%;
  padding: 0 $spacer*2;
  position:relative;
}
.countdown-container .countdown-label {
	color: theme-color("notice");
  font-size:24px;
  line-height:20px;
  text-transform: uppercase;
  text-align:left;
}

.countdown-container div {
  width: 25%;
}

.countdown-container {
  display: flex;
  font-size: 12px;
  text-align: center;
  align-items: center;
  justify-content: space-around;
}

.countdown-container span {
  width:100%;
  display:block;
  font-size: 22px;
  height: 30px;
  font-weight: 700;
  padding: 0;
  margin: 0;
}

.promo {
    padding: 3px 0;
    // background: #21333F !important;
    border-bottom: solid 2px theme-color("notice");
    top: 0;
    left: 0;
    width: 100% !important;
    display: none;
    -moz-box-shadow: 0 0 1px 1px rgba(0,0,0,0.3);
    -webkit-box-shadow: 0 0 1px 1px rgba(0,0,0,0.3);
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.3);
    &.fixed {
      z-index: 99999;
      position: fixed;
    }
    &.visible {
      display: block !important;
    }
}

//Add top padding to body on pages with Promo since it is sticky
.promo-wrapper {
  height: 60px;
    @include media-breakpoint-down(md){
      height: $spacer*4;
    }
    @include media-breakpoint-down(sm) {
      height: $spacer*7;
    }
}

</style>

<template>
    <DiySpace v-bind="computedConfig.space">
      <div id="global-sale-promo" class="global-sale-promo fixed promo visible">
        <div class="container d-md-flex justify-content-around align-items-center">
          <div class="global-sale-promo-offer">
              <div class="discount-sale">Limited Time Sale <strong>25% off all courses!</strong></div>
          </div>
          <div class="active countdown-container">
              <div class="countdown-label">Sale Ends:</div>
              <div class="hours"><span id="hours">00</span> Hours</div>
              <div class="mins"><span id="mins">00</span> Minutes</div>
              <div class="seconds"><span id="seconds">00</span> Seconds</div>
            </div>
        </div>
      </div>
    </DiySpace>
</template>
