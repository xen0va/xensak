<template>
    <div class="container">
        <div class="header">
            <RouterLink to="/" class="back-button"><i class="fa-solid fa-arrow-left"></i></RouterLink>
            <div class="game-title">
                <h1>{{ name }}</h1>
                <span class="game-code">{{titleId}}</span>
            </div>
        </div>
        <div class="content">
            <div class="left-panel">
                <img :src="iconUrl" alt="Game Cover" class="game-cover">
                <button>OPEN SAVE DIRECTORY</button>
            </div>
            <div class="right-panel">
                <div class="shaders-info">
                    <div class="shaders-header">
                        <span>Shaders</span>
                        <span class="threshold">Threshold <span class="threshold-value">100</span></span>
                    </div>
                    <div class="shaders-counter">
                        <div class="local-shaders">
                            <span>Local Shader Count</span>
                            <div class="shader-count">{{ localShaderCount }}</div>
                            <button class="shader-button" disabled>SHARE SHADERS</button>
                        </div>
                        <div class="cloud-shaders">
                            <span>Remote Shader Count</span>
                            <div class="shader-count">0</div>
                            <button @click="downloadShaders(titleId)" class="shader-button">DOWNLOAD SHADERS</button>
                        </div>
                    </div>
                </div>
                <button class="open-shader-btn">CLEAR SHADER CACHE</button>
                <button class="open-shader-btn">OPEN SHADER CACHE DIRECTORY</button>
            </div>
        </div>
    </div>
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
    methods: {
        async downloadShaders(titleId) {
            await window.electronAPI.downloadShaderCache(titleId)
            this.localShaderCount = await window.electronAPI.getShaderCount(this.titleId);
        }
    }
}
</script>
<style>
    body {
    background-color: #1e1e1e;
    color: #ffffff;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 900px;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
    background-color: #2a2a2a;
}

.header {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #333;
    position: relative;
}

.back-button {
    background-color: #444;
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    flex: 0 0 auto;
    z-index: 2;
}

.game-title {
    flex: 1 1 auto;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
}

.game-title h1 {
    margin: 0;
    font-size: 1.2rem;
}

.game-code {
    font-size: 0.9rem;
    color: #aaa;
}

.content {
    display: flex;
    padding: 20px;
}

.left-panel, .right-panel {
    flex: 1;
    padding: 10px;
}

.game-cover {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
}

.left-panel button {
    width: 100%;
    padding: 15px;
    margin-bottom: 10px;
    background-color: #444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
}

.right-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.shaders-info {
    background-color: #333;
    padding: 20px;
    border-radius: 8px;
}

.shaders-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.threshold {
    font-size: 0.9rem;
}

.shader-count {
    font-size: 1.5rem;
    text-align: center;
    margin: 10px 0;
    background-color: #444;
    padding: 10px;
    border-radius: 5px;
}

.local-shaders, .cloud-shaders {
    text-align: center;
}

.cloud-shaders {
    padding-top: 1.5em;
}

.right-panel .shader-button {
    width: 100%;
    padding: 10px;
    background-color: #555;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.right-panel .shader-button[disabled] {
    background-color: #666;
    cursor: not-allowed;
}

.open-shader-btn {
    width: 100%;
    padding: 15px;
    margin-bottom: 10px;
    background-color: #444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
}

img {
    max-width: 410px;
}

</style>