<script>
// Components
import DiyButton from "@core/components/diy/button.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import merge from "lodash/merge";
import loadjs from "loadjs";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
  async mounted() {
    // If we haven't loaded Stripe and PayPal, load them
    if (!loadjs.isDefined("mapbox")) {
      loadjs(["https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js"], "mapbox");
    }
    loadjs.ready("mapbox", () => {
      L.mapbox.accessToken = this.computedConfig.mapbox.token;
      let map = L.mapbox
        .map("map", "mapbox.streets")
        .setView(
          this.computedConfig.mapbox.coordinates.center,
          this.computedConfig.mapbox.coordinates.zoom
        );
    });
  },
  components: {
    DiyButton,
    DiyCollection,
    DiyHeading,
    DiyMarkdown,
    DiySpace
  },

  computed: {
    baseConfig() {
      return {
        buttons: {
          id: this.id + "-buttons"
        },
        description: {
          id: this.id + "-description"
        },
        mapbox: {
          token:
            "pk.eyJ1IjoiYWNlYWJsZSIsImEiOiJjaW9ibzU5YjgwNGVodzFrcWZoOWc4cjF1In0.IJ9qqIQSFDQxFd5gy0E44A",
          coordinates: {
            zoom: 12.2158632477472,
            //Houston
            center: [29.752, -95.368]
          }
        },
        space: {
          id: this.id + "-space"
        },
        title: {
          id: this.id + "-title"
        }
      };
    },

    defaultConfig() {
      return this.baseConfig;
    }
  },

  mixins: [prefab],

  props: {
    configKey: {
      default: "spaces.map",
      type: String
    }
  }
};
</script>

  <style scoped>
@import "https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css";
</style>

  <style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.map-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  @include media-breakpoint-down(md) {
    height: 300px;
  }
}

.map-content {
  ul {
    margin-left: 0;
    padding-left: 0;
    list-style-type: none;
    -moz-column-count: 3;
    -moz-column-gap: 20px;
    -webkit-column-count: 3;
    -webkit-column-gap: 20px;
    column-count: 3;
    column-gap: 20px;
  }
}
</style>

  <template>
    <DiySpace v-bind="computedConfig.space">
      <div class="col-md-6 p-0">
        <DiyCollection v-bind="computedConfig.content">
        <div slot-scope="item" v-bind="item">
          <DiyHeading v-bind="item.title" />
          <div class="map-content" v-html="item.content"></div>
        </div>
        </DiyCollection>
      </div>
      <div class="col-md-6 p-0">
        <div class="map-wrapper">
          <div id="map">
          </div>
        </div>
      </div>
    </DiySpace>
  </template>
