<template>
    <div id="main-content">
        <div id="container" class="grid-container">
            <div v-for="game in gameList" :key="game.titleId" class="grid-item" @click="goToDetails(game.id, game.name)">
                <img :src="game.iconUrl"> 
            {{ game.name }}
        </div>
        </div>
    </div>
</template>
  
<script lang="ts">

import { eShopTitleMeta } from '../types';
import { store } from '../store';

export default {
  data() {
    return {
      gameList: [],
    };
  },

  async created() {
    console.log("created function")
    console.log(store.gameList.length)

    if(store.gameList.length == 0) {
      console.log("loading game list")
      store.gameList = await this.createLibrary()
    }
    this.gameList = store.gameList
    console.log(this.gameList)
  },

  methods: {
    goToDetails(titleId:string, gameName:string) {
        console.log(titleId, gameName)
        this.$router.push({name:'gameDetails', params: {titleId, gameName}})
    },
    async createLibrary() {
      let titleIdList = await window.electronAPI.fetchGameList();
      titleIdList = titleIdList.filter((id: string) => id !== "0000000000000000");

      const gameList: eShopTitleMeta[] = await Promise.all(titleIdList.map(async (i:String) => window.electronAPI.getTitleMeta(i)))

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
      grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
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
      margin-top: 10px;
      font-size: 14px;
    }

    #navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 60px;
      height: 100%;
      background-color: #222;
      overflow-x: hidden;
      transition: width 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1;
    }

    #navbar.expanded {
      width: 200px;
    }

    .hamburger {
      font-size: 30px;
      color: white;
      padding: 10px;
      cursor: pointer;
      margin-bottom: 20px;
      text-align: center;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-item {
      width: 100%;
      padding: 15px;
      text-align: center;
      color: white;
      display: flex;
      align-items: center;
      justify-content: start;
      /* Align items to the start */
    }

    .nav-item:hover {
      background-color: #575757;
    }

    .icon {
      font-size: 24px;
      margin-left: 10px;
      flex-shrink: 0;
      /* Prevent icons from shrinking */
    }

    .nav-title {
      margin-left: 10px;
      display: none;
      white-space: nowrap;
      /* Prevent text wrapping */
    }

    #navbar.expanded .nav-title {
      display: inline;
    }

    .settings {
      margin-top: auto;
      width: 100%;
      border-top: 1px solid #575757;
    }
</style>