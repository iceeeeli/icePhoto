import Home from '../components/mainCom/home.vue'
import QueryIndex from '../components/query/queryIndex.vue'
import ALL from '../components/query/allQuery.vue'
import PHOTO from '../components/query/photoQuery.vue'
import ART from '../components/query/artQuery.vue'
import ACT from '../components/query/actQuery.vue'
import GROUP from '../components/query/groupQuery.vue'
import TALK from '../components/query/talkQuery.vue'

export default {
    path: '/home',
    name: 'HomeInfo',
    component: Home,
    children: [
        {
            path:'queryIndex',
            name:'queryIndex',
            component:QueryIndex,
            redirect: '/home/queryIndex/all',
            children:[
                {
                    path:'all',
                    name:'all',
                    component:ALL
                },
                {
                    path:'photo',
                    name:'photo',
                    component:PHOTO
                },
                {
                    path:'art',
                    name:'art',
                    component:ART
                },
                {
                    path:'group',
                    name:'group',
                    component:GROUP
                },
                {
                    path:'talk',
                    name:'talk',
                    component:TALK
                },
                {
                    path:'act',
                    name:'act',
                    component:ACT
                }
            ]
        }
    ]
}
