<script setup>
    defineProps({
        titleId: String,
        gameName: String,
        dataPath: String
    })
</script>

<template>
    <p>{{ titleId }}</p>
    <p>{{ gameName }}</p>
    <RouterLink to="/">Go to Home</RouterLink>
</template>

