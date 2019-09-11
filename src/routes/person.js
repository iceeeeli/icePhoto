import Home from '../components/mainCom/home.vue'
import PerIndex from '../components/personal/myIndex/perIndex.vue'
import MyPhoto from '../components/personal/myIndex/myPhoto.vue'
import MyArt from '../components/personal/myIndex/myArt.vue'
import MyAct from '../components/personal/myIndex/myAct.vue'
import MyLike from '../components/personal/myIndex/myLike.vue'
import MyFocus from '../components/personal/myIndex/myFocus.vue'
import MyHidd from '../components/personal/myIndex/myHidd.vue'
import MyFans from '../components/personal/myIndex/myFans.vue'
import SetMess from '../components/personal/seting/setMess.vue'
import MyData from '../components/personal/seting/myData.vue'
import Seting from '../components/personal/seting/set.vue'
import BlackList from '../components/personal/seting/blackList.vue'
import NamePass from '../components/personal/seting/namePass.vue'
import OtherIndex from '../components/personal/otherIndex/otherIndex.vue'
import OtherPhoto from '../components/personal/otherIndex/otherPhoto.vue'
import OtherArt from '../components/personal/otherIndex/otherArt.vue'
import OtherAct from '../components/personal/otherIndex/otherAct.vue'
import OtherLike from '../components/personal/otherIndex/otherLike.vue'
import OtherFocus from '../components/personal/otherIndex/otherFocus.vue'
import OtherHidd from '../components/personal/otherIndex/otherHidd.vue'
import OtherFans from '../components/personal/otherIndex/otherFans.vue'
import SendIndex from '../components/personal/sendIndex.vue'
import SendArt from '../components/personal/sendArt.vue'
import SendPhoto from '../components/personal/sendPhoto.vue'



export default {
    path: '/home',
    name: 'HomeInfo',
    component: Home,
    children: [
        
        {

            path: 'myIndex',
            name: 'myIndex',
            component: PerIndex,
            redirect: '/home/myIndex/myphoto',
            children: [
                {
                    path: 'myphoto',
                    name: 'myphoto',
                    component: MyPhoto
                },
                {
                    path: 'myart',
                    name: 'myart',
                    component: MyArt
                },
                {
                    path: 'myact',
                    name: 'myact',
                    component: MyAct
                },
                {
                    path: 'mylike',
                    name: 'mylike',
                    component: MyLike
                },
                {
                    path: 'myhidd',
                    name: 'myhidd',
                    component: MyHidd
                },
                {
                    path: 'myfocus',
                    name: 'myfocus',
                    component: MyFocus
                },
                {
                    path: 'myfans',
                    name: 'myfans',
                    component: MyFans
                },
            ]
        },
        {

            path: 'otherIndex',
            name: 'otherIndex',
            component: OtherIndex,
            redirect: '/home/otherIndex/otherphoto',
            children: [
                {
                    path: 'otherphoto',
                    name: 'otherphoto',
                    component: OtherPhoto
                },
                {
                    path: 'otherart',
                    name: 'otherart',
                    component: OtherArt
                },
                {
                    path: 'otheract',
                    name: 'otheract',
                    component: OtherAct
                },
                {
                    path: 'otherlike',
                    name: 'otherlike',
                    component: OtherLike
                },
                {
                    path: 'otherhidd',
                    name: 'otherhidd',
                    component: OtherHidd
                },
                {
                    path: 'otherfocus',
                    name: 'otherfocus',
                    component: OtherFocus
                },
                {
                    path: 'otherfans',
                    name: 'otherfans',
                    component: OtherFans
                },
            ]
        },
        {
            path: 'setmess',
            name: 'setmess',
            component: SetMess,
            redirect: '/home/setmess/mydata',
            children: [
                {
                    path: 'mydata',
                    name: 'mydata',
                    component: MyData
                },
                {
                    path: 'namepass',
                    name: 'namepass',
                    component: NamePass
                },
                {
                    path: 'set',
                    name: 'set',
                    component: Seting
                },
                {
                    path: 'blacklist',
                    name: 'blacklist',
                    component: BlackList
                }
            ]

        }
    ]
}
