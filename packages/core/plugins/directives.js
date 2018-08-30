/**
 * Various Vue directives and plugins
 */
import Vue from "vue";
import VueLazyload from "vue-lazyload";
import VueViewport from "vue-in-viewport-directive";

Vue.directive("in-viewport", VueViewport);

Vue.use(VueLazyload, {
    lazyComponent: true
});
