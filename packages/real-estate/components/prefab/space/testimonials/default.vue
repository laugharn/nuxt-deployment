<script>
// Components
// DIY
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";
// Libraries
import deepGet from "@core/assets/js/utils/deepGet";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyHeading,
        DiyMarkdown,
        DiySpace,
    },

    computed: {
        baseConfig() {
            return {
                title: {
                  content: "Our students love us"
                },
                testimonials: [
                  {
                    stars: {
                      content:
                          '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
                      markdownExtensionClasses: "text-warning font-size-lg mb-3",
                    },
                    author: {
                      content: "Rebecca Tongsinoon",
                    },
                    title: {
                      content: "Engaging content and wonderful team",
                    },
                    quote: {
                      content: "Engaging content, wonderful and patient support team. Should make every competitor in their space nervous. Hope they come out with more courses. Will recommend and use again.",
                    }
                  },
                  {
                    stars: {
                      content:
                          '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
                      markdownExtensionClasses: "text-warning font-size-lg mb-3",
                    },
                    author: {
                      content: "Quen Williams",
                    },
                    title: {
                      content: "From the beginning to end, this was just a great experience!",
                    },
                    quote: {
                      content: "Taking the training through AceableAgent was easy and fun. And any time I had questions, the staff was more than willing to help! I don't feel I missed anything by doing my pre-licensing training online vs in-person. I definitely saved a lot of money, though! And I passed my exam in my first try with flying colors! And the AceableAgent team sent me a sweet handwritten card signed by all the staff congratulating me on passing my exam. From the beginning to end, this was just a great experience!",
                    }
                  },
                  {
                    stars: {
                      content:
                          '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
                      markdownExtensionClasses: "text-warning font-size-lg mb-3",
                    },
                    author: {
                      content: "Stephanie Atkinson",
                    },
                    title: {
                      content: "A New & Innovative Way to Learn!",
                    },
                    quote: {
                      content: "I've heard of other online Real Estate schools and courses, but everyone always said the same things... it's A LOT of mundane reading... not very interactive... or out dated! I'm so happy I chose Aceable Agent, bc it's anything but mundane, or out dated. It's one of the latest and most innovative ways to learn your Real Estate coursework. It's broken down into interactive slides, videos, and quizzes to keeep your memory fully engaged. So far I'm loving it, and learning SO MUCH! Thank you Aceable Agent for coming up with this new system =)",
                    }
                  },
                  {
                    stars: {
                      content:
                          '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
                      markdownExtensionClasses: "text-warning font-size-lg mb-3",
                    },
                    author: {
                      content: "Tony C",
                    },
                    title: {
                      content: "I passed the state and national exams...",
                    },
                    quote: {
                      content: "I passed the state and national exams first time around thanks to this program and the team. They truly care about how you're learning and making progress. When you're studying for the exams, you get customized study guides to ensure you're studying effectively. Matt was always prompt and very helpful, and Grace made sure my studying was on track!",
                    }
                  }
                ],
                space: {
                    wrapperExtensionClasses: "testimonials container-fluid",
                    id: this.id,
                    backgroundImage: "https://ace.imgix.net/uploads/sites/3/2018/03/Fotolia_144718558_Subscription_Monthly_M.jpg?w=1440&blend=000000&balph=67&bm=darken&auto=compress",
                    showBackgroundImage: true,
                },
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.testimonials",
            type: String
        },

        id: {
            default: "testimonials",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
      <DiyHeading v-bind="computedConfig.title" />
      <div class="row">
        <div :class="id + '-testimonial col-sm-6 col-md-3'" v-for="(testimonial, index) in computedConfig.testimonials">
          <div :class="id + '-testimonial__stars'">
            <svg viewBox="0 0 251 46" xmlns="http://www.w3.org/2000/svg" style="">
                  <g class="tp-rebrand-star">
                      <path class="tp-rebrand-star__canvas" fill="#00b67a" d="M0 46.330002h46.375586V0H0z"></path>
                      <path class="tp-rebrand-star__shape" d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z" fill="#FFF"></path>
                  </g>
                  <g class="tp-rebrand-star">
                      <path class="tp-rebrand-star__canvas" fill="#00b67a" d="M51.24816 46.330002h46.375587V0H51.248161z"></path>
                      <path class="tp-rebrand-star__shape" d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z" fill="#FFF"></path>
                  </g>
                  <g class="tp-rebrand-star">
                      <path class="tp-rebrand-star__canvas" fill="#00b67a" d="M102.532209 46.330002h46.375586V0h-46.375586z"></path>
                      <path class="tp-rebrand-star__shape" d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z" fill="#FFF"></path>
                  </g>
                  <g class="tp-rebrand-star">
                      <path class="tp-rebrand-star__canvas" fill="#00b67a" d="M153.815458 46.330002h46.375586V0h-46.375586z"></path>
                      <path class="tp-rebrand-star__shape" d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                  </g>
                  <g class="tp-rebrand-star">
                      <path class="tp-rebrand-star__canvas" fill="#00b67a" d="M205.064416 46.330002h46.375587V0h-46.375587z"></path>
                      <path class="tp-rebrand-star__shape" d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                  </g>
            </svg>
          </div>
          <div :class="id + '-testimonial__author'">
            <DiyMarkdown v-bind="testimonial.author" />
          </div>
          <div :class="id + '-testimonial__title'">
            <DiyMarkdown v-bind="testimonial.title" />
          </div>
          <div :class="id + '-testimonial__quote'">
            <DiyMarkdown v-bind="testimonial.quote" />
          </div>
        </div>
      </div>
    </DiySpace>
</template>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.testimonials {
  background-image: url("https://ace.imgix.net/uploads/sites/3/2018/03/Fotolia_144718558_Subscription_Monthly_M.jpg?w=1440&blend=000000&balph=67&bm=darken&auto=compress") !important;
  padding: 40px 60px;
}

.testimonials {
  .Heading {
    color: white;
    text-align: center;
    padding-bottom: 50px;
    padding-top: 20px;
  }
}

@include media-breakpoint-down(sm) {
  .testimonials {
    .Heading {
      font-size: 26px;
    }
  }
}

.testimonials {
  .testimonials-testimonial {
    background-color: white;
    padding-top: 15px;
    padding-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    max-width: calc(25% - 20px);
    margin-bottom: 20px;
  }
}

@include media-breakpoint-down(md) {
  .testimonials {
    .testimonials-testimonial {
      flex: 0 0 50%;
      max-width: calc(50% - 20px);
      width: calc(50% - 20px);
    }
  }
}

@include media-breakpoint-down(sm) {
  .testimonials {
    .testimonials-testimonial {
      flex: 0 0 100%;
      max-width: calc(100% - 20px);
      width: calc(100% - 20px);
    }
  }
}

.testimonials {
  .testimonials-testimonial__stars {
    svg {
      width: 150px;
    }
  }
}

.testimonials {
  .testimonials-testimonial__author {
    .Markdown {
      color: map-get($grays, 600);
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 15px;
    }
  }
}

.testimonials {
  .testimonials-testimonial__title {
    .Markdown {
      color: black;
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 10px;
    }
  }
}

.testimonials {
  .testimonials-testimonial__quote {
    .Markdown {
      font-size: 15px;
    }
  }
}
</style>
