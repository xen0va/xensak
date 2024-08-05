<template>
    <div id="main-content">
        <div id="container" class="grid-container">
            <div v-for="game in games" :key="game.titleId" class="grid-item" @click="goToDetails(game.titleId, game.gameName)">
                <img src="../static/assets/images/parl.png">
            {{ game.gameName }}
        </div>
        </div>
    </div>
</template>
  
<script>

export default {
  data() {
    return {
      games: {},
    };
  },
  async created() {
    this.games = await window.electronAPI.fetchGameList();
  },
  methods: {
    goToDetails(titleId, gameName) {
        console.log(titleId, gameName)
        this.$router.push({name:'gameDetails', params: {titleId, gameName}})
    }
  }

};
  
</script>