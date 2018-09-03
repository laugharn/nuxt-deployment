<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCapture from "~/components/prefab/space/capture/default.vue";
import SpaceContent from "@core/components/prefab/space/content/default.vue";
import SpaceHero from "~/components/prefab/space/hero/default.vue";
import SpaceUser from "~/components/prefab/space/user/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceCapture,
        SpaceContent,
        SpaceHero,
        SpaceUser,
        Structure
    }
};
</script>

<template>
    <Structure
        :config="{
            nav: {
                space: {
                    sticky: false
                }
            }
        }"
    >

        <SpaceBreadcrumbs />
        <SpaceHero />
        <SpaceCapture
            :config="{
                form: {
                    listId: 38697
                },
                space: {
                    mainExtensionClasses: 'd-none d-md-flex my-auto',
                    wrapperExtensionClasses: 'bg-brand-to-success text-white'
                }
            }"
        />
        <SpaceContent />
        <SpaceUser />
    </Structure>
</template>
