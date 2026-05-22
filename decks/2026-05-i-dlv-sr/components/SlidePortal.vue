<template>
    <span class="hover:underline relative block-inline" @mouseover="showPortal()" @mouseleave="hidePortal()">
        <slot />
        <div class="absolute top-[20%] left-[20%] -translate-x-100 -translate-y-40 w-[80vw] h-[80vh]" v-show="displayingPortal" v-if="targetRoute !== null">
            <SlideWrapper  
                :clicksContext="createFixedClicks(targetRoute, 99999)"
                :route="targetRoute"
                :render-context="$renderContext"
                class="relative scale-[80%] "
            >
        </SlideWrapper>
    </div>
    </span>
    
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useSlideContext, useNav } from "@slidev/client"
import SlideWrapper from "@slidev/client/internals/SlideWrapper.vue"
import {createFixedClicks } from "@slidev/client/composables/useClicks.ts"

const props = defineProps({
    target: {
        type: String,
    }
})

const {slides} = useNav();


const targetRoute = computed(() => {
    const found = slides.value.filter((s) => {
        console.log(s.meta?.slide);
        return s.meta?.slide?.frontmatter?.id === props.target
    });
    console.log(found);
    if(found.length === 1) {
        console.log(found)
        return found[0]
    }
    return null 
});

const displayingPortal = ref(false);

function showPortal() {
    displayingPortal.value = true;
}


function hidePortal() {
    setTimeout(() => {displayingPortal.value = false;}, 5000);
}

const { $slidev } = useSlideContext();

</script>

<style scoped>

</style>
