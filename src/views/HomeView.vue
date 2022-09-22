<script setup>
import FlowTest from '@/components/FlowTest.vue'
</script>

<template>
    <main>
        <FlowTest></FlowTest>
    </main>
</template>

<style>
/* import the required styles */
@import "@braks/vue-flow/dist/style.css";

/* import the default theme (optional) */
@import "@braks/vue-flow/dist/theme-default.css";
    main {
        height: 800px;
    }
</style>
