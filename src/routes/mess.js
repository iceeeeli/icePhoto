import Home from '../components/mainCom/home.vue'
import Message from '../components/personal/message/messages.vue'
import HuDong from '../components/personal/message/hudong.vue'
import System from '../components/personal/message/system.vue'
import Argue from '../components/personal/message/argue.vue'
import Like from '../components/personal/message/like.vue'
import Support from '../components/personal/message/support.vue'
import Hidd from '../components/personal/message/hidd.vue'
import SiXin from '../components/personal/message/sixin.vue'
import Notice from '../components/personal/message/notice.vue'
import Noticemess from '../components/personal/message/noticeinfo.vue'

export default{
    path: '/home',
     name:'HomeInfo',
     component: Home,
    children:[
        {
            path: 'mess',
            name: 'mess',
            component:Message,
            redirect:'/home/mess/hudong/argue',
            children:[
                {
                    path: 'hudong',
                    name: 'hudong',
                    component: HuDong,
                    redirect:'/home/mess/hudong/argue',
                    children:[
                        {
                            path: 'argue',
                            name: 'argue',
                            component: Argue
                        },
                        {
                            path: 'like',
                            name: 'like',
                            component: Like
                        },
                        {
                            path: 'support',
                            name: 'support',
                            component:Support
                        },
                        {
                            path: 'hidd',
                            name: 'hidd',
                            component:Hidd
                        }
                    ]
                },
                {
                    path: 'system',
                    name: 'system',
                    component: System,
                    redirect:'/home/mess/system/sixin',
                    children:[
                        {
                            path:'sixin',
                            name: 'sixin',
                            component: SiXin
                        },
                        {
                            path: 'notice',
                            name: 'notice',
                            component: Notice
                        },
                        {
                            path: 'noticeinfo',
                            name: 'noticeinfo',
                            component: Noticemess
                        }
                    ]
                }
            ]
        }
    ]
}