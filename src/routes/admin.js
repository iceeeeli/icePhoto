
import AdminIndex from '../admin/adminIndex.vue'
import Userlist from '../admin/userLists.vue'
import Advice from '../admin/advice.vue'
import ArtLists from '../admin/artLists.vue'
import ArtManager from '../admin/artManager.vue'
import GroupLists from '../admin/groupLists.vue'
import ImgIndex from '../admin/imgIndex.vue'
import ImgLists from '../admin/imgLists.vue'
import Notice from '../admin/notice.vue'
import TalkLists from '../admin/talkLists.vue' 
import ActIndex from '../admin/actIndex.vue'
import ActLists from '../admin/actLists.vue'
export default{
    path:'/',
    component:AdminIndex,
    children:[
        // {
        //     path:'adminlogin',
        //     name:'adminlogin',
        //     component:AdminLogin
        //  },
         {
           path:'adminIndex',
           name:'adminIndex',
           component:AdminIndex,
           children:[
            {
                path:'userlists',
                name:'userlists',
                component:Userlist
            },
            {
                path:'advice',
                name:'advice',
                component:Advice
            },
            {
                path:'artLists',
                name:'artLists',
                component:ArtLists
            },
            {
                path:'artManager',
                name:'artManager',
                component:ArtManager
            },
            {
                path:'groupLists',
                name:'groupLists',
                component:GroupLists
            },
            {
                path:'imgIndex',
                name:'imgIndex',
                component:ImgIndex
            },
            {
                path:'imgLists',
                name:'imgLists',
                component:ImgLists
            },
            {
                path:'notice',
                name:'notice',
                component:Notice
            },
            {
                path:'talkLists',
                name:'talkLists',
                component:TalkLists
            },
            {
                path:'actIndex',
                name:'actIndex',
                component:ActIndex
            },
            {
                path:'actLists',
                name:'actLists',
                component:ActLists
            }
           ]
         }
    ]
}