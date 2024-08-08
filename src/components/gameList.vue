<template>
    <div id="main-content">
        <div id="container" class="grid-container">
            <div v-for="game in gameList" :key="game.titleId" class="grid-item" @click="goToDetails(game.id, game.name, game.iconUrl)">
                <img v-if="(game.iconUrl !== '')" :src="game.iconUrl"> 
                <img v-else src="../static/assets/images/default.png">
                <p>{{ game.name }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import { store } from '../store';

export default {
  data() {
    return {
      gameList: [],
    };
  },

  async created() {
    //Checks length of stored game list, if 0 then refreshes the library
    if(store.gameList.length == 0) {
      store.gameList = await this.createLibrary()
    }
    this.gameList = store.gameList
  },

  methods: {
    goToDetails(titleId, name, iconUrl) {
        this.$router.push({name:'gameDetails', params: {titleId, name, iconUrl}})
    },
    async createLibrary() {
      let titleIdList = await window.electronAPI.fetchGameList();
      titleIdList = titleIdList.filter((id) => id !== "0000000000000000");

      const gameList = await Promise.all(titleIdList.map(async (i) => window.electronAPI.getTitleMeta(i)))

      return gameList
    }
  }

};
  
</script>
<style scoped>
    #main-content {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 20px;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
      gap: 20px;
      padding: 20px;
      max-width: 1200px;
      width: 100%;
    }

    .grid-item {
      cursor: pointer;
      background-color: #444;
      padding: 10px;
      border-radius: 10px;
      text-align: center;
      transition-duration: 0.5s;
    }

    .grid-item:hover {
      box-shadow: 0px 5px 10px #1f1f1f;
      transition-duration: 0.5s;
    }

    .grid-item img {
      width: 100%;
      border-radius: 10px;
    }

    .grid-item p {
      margin-top: 20px;
      font-size: 14px;
    }
</style>