<script>
import DiyImage from "@core/components/diy/image.vue";

export default {
    components: {
        DiyImage
    },

    head() {
        return {
            title: "Be Aceable"
        };
    }
};
</script>

<template>
    <div class="bg-brand d-flex" style="position:absolute;bottom:0;left:0;right:0;top:0">
        <DiyImage src="/uploads/sites/3/2018/06/be-aceable.png" wrapper-extension-classes="m-auto" />
    </div>
</template>
