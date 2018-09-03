<script>
// Components
import SpaceFourOFour from "~/components/prefab/space/404/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceFourOFour,
        Structure
    }
};
</script>

<template>
    <Structure>
        <SpaceFourOFour />
    </Structure>
</template>
