<template>
    <span class="hover:underline" @mouseover="showPortal()" @mouseleave="hidePortal()">
        <slot />
        <div class="w-[80%]" v-show="displayingPortal" v-if="targetRoute !== null">
            <SlideWrapper  
                :clicksContext="createFixedClicks(targetRoute, 99999)"
                :route="targetRoute"
                :render-context="$renderContext"
                class="scale-[80%] mx-auto !left-auto !inset-x-auto !inset-y-0 !inset-0"
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
