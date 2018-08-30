<script>
// Prefab Components
import SpaceCheckout from "../../components/prefab/space/checkout/default.vue";
import Structure from "../../components/prefab/structure/default.vue";

export default {
    components: {
        SpaceCheckout,
        Structure
    }
};
</script>

<template>
    <Structure
        :config="{
            nav: {
                left: {
                    listExtensionClasses: 'd-none'
                },

                logo: {
                    slot: 'left'
                }
            }
        }"
    >
        <SpaceCheckout />
    </Structure>
</template>
