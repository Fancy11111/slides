<template>
    <footer class="text-black/70 dark:text-slate-200 absolute bottom-[10px] right-[10px]">
        <template v-if="!['cover', 'end', 'quote', 'section'].includes($nav.currentLayout)">
            <SlideCurrentNo></SlideCurrentNo> / <SlidesTotal></SlidesTotal>
        </template>
    </footer>
</template>

<script setup>
</script>
