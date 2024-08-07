import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../../App.vue'
import gameDetails from '../components/gameDetails.vue'
import gameList from '../components/gameList.vue'


const routes = [
    {path: '/', name: 'home', component: gameList},
    {path: '/game/:titleId:name:iconUrl', name: 'gameDetails', component: gameDetails, props: true}
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})