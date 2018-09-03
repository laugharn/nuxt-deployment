<script>
// DIY
import DiyStructure from "@core/components/diy/structure.vue";

// Prefab
import SpaceCheckout from "~/components/prefab/space/checkout/default.vue";
import SpaceFooter from "~/components/prefab/space/footer/default.vue";
import SpaceNav from "~/components/prefab/space/nav/checkout.vue";

export default {
    components: {
        DiyStructure,
        SpaceCheckout,
        SpaceFooter,
        SpaceNav
    }
};
</script>

<template>
    <DiyStructure>
        <SpaceNav />
        <SpaceCheckout />
        <SpaceFooter />
    </DiyStructure>
</template>
