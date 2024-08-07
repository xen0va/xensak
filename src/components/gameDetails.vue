<template>
    <img style="max-width: 256px;" :src="iconUrl">
    <p>Title ID: {{ titleId }}</p><br>
    <p>Name: {{ name }}</p><br>
    <p>Local Shader Count: {{ localShaderCount }}</p>
    <RouterLink to="/">Go to Home</RouterLink>
</template>

<script>

export default{
    props: {
        titleId: String,
        name: String,
        iconUrl: String,
        dataPath: String
    },
    data() {
        return {
            localShaderCount: 0
        }
    },
    async created() {
        this.localShaderCount = await window.electronAPI.getShaderCount(this.titleId);
        console.log(response);
    },
}
</script>