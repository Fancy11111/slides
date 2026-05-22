<template>
    <footer class="text-black/70 dark:text-slate-200 absolute pb-1 pr-1 pl-1 pt-1 bottom-0 right-0 rounded-tl-2 bg-slate-400/30 dark:bg-slate-500/30">
        <template v-if="!['cover', 'end', 'quote', 'section'].includes($nav.currentLayout)">
            <SlideCurrentNo class="font-bold"></SlideCurrentNo> / <SlidesTotal class="font-bold"></SlidesTotal>
        </template>
    </footer>
</template>

<script setup>
</script>
