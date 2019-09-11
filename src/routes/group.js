import Home from '../components/mainCom/home.vue'
import Group from '../components/mainCom/group.vue'
import OneGroup from '../components/group/oneGroup.vue'
import GroupArt from '../components/group/fromGroupArt.vue'
import MyGroup from '../components/group/myGroup.vue'

export default{
        path: '/home',
        name:'HomeInfo',
        component: Home,
        children: [
                {
                        path: 'group',
                        name: 'group',
                        component: Group,
                },
                {
                        path: 'onegroup',
                        name: 'onegroup',
                        component: OneGroup,
                },
                {
                        path: 'groupart',
                        name: 'groupart',
                        component: GroupArt,
                },
        ]
}