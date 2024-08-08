<template>
    <p>{{ receivedBytes }}/{{ totalBytes }}</p>
</template>

<script>
export default {
    props: {
        receivedBytes: Number,
        totalBytes: Number
    }
}
</script>