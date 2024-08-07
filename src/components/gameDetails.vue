<template>
    <p>Title ID: {{ titleId }}</p><br>
    <p>Name: {{ gameName }}</p><br>
    <p>Local Shader Count: {{ localShaderCount }}</p>
    <RouterLink to="/">Go to Home</RouterLink>
</template>

<script>

export default{
    props: {
        titleId: String,
        gameName: String,
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