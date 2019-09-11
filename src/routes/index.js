
import Home from '../components/mainCom/home.vue'
import Text from '../components/mainCom/text.vue'
import HomeMain from '../components/mainCom/homeMain.vue'
import HText from '../components/homeMainInfo/text.vue'
import Focus from '../components/mainCom/focus.vue'
import PhotoShow from '../components/homeMainInfo/photoShow.vue'
import PhotoInfo from '../components/photoInfo/photoInfo.vue'
import HomeIndex from '../components/mainCom/homeIndex.vue'
import Activity from '../components/mainCom/activity.vue'
import ActInfo from '../components/actInfo/actInfo.vue'

import Talk from '../components/talk/talkIndex.vue'
import MyTalk from '../components/talk/create.vue'
import OneTalk from '../components/talk/oneTalk/oneTalkIndex.vue'
import TalkCon from '../components/talk/oneTalk/oneTalk.vue'
import Find from '../components/mainCom/findIndex.vue'
import Tabs from '../components/find/tabs.vue'
import OneTabs from '../components/find/oneTabs.vue'
import Photographer from '../components/find/photographer.vue'
import Teach from '../components/find/teach.vue'
import Cramer from '../components/find/cramer.vue'
import Vip from '../components/more/vip.vue'
import VipForm from '../components/more/vipForm.vue'
import Cooper from '../components/more/cooperate.vue'
import Problem from '../components/more/problem.vue'
import About from '../components/more/aboutUs.vue'
import Persons from './person'
import Groups from './group'
import Mess from './mess'
import Admin from './admin'
import Query from './query'
import SendIndex from '../components/personal/sendIndex.vue'
import SendArt from '../components/personal/sendArt.vue'
import SendPhoto from '../components/personal/sendPhoto.vue'


export default [
  Persons,
  Groups,
  Mess,
  Query,
  {
    path: '/',
    component: Home,
    name: 'HOME',
    redirect: '/home/homeIndex',
  },
  {
    path: '/home',
    name: 'HomeInfo',
    component: Home,
    children: [
      {
        path: 'sendindex',
        name: 'sendindex',
        component: SendIndex,
        children: [
          {
            path: 'sendphoto',
            name: 'sendphoto',
            component: SendPhoto
          },
          {
            path: 'sendphoto/:act',
            name: 'sendphoto1',
            component: SendPhoto
          },
          {
            path: 'sendart',
            name: 'sendart',
            component: SendArt
          },
          {
            path: 'sendart/:talk',
            name: 'sendart1',
            component: SendArt
          },
        ]
      },
      {
        path: 'focus',
        name: 'focus',
        component: Focus
      },
      {
        path: 'homemain',
        name: 'homemain',
        redirect: '/home/homemain/photoShow',
        component: HomeMain,

        children: [
          {
            path: 'text',
            name: 'homeText',
            component: HText
          },
          {
            path: 'photoShow',
            name: 'photoShow',
            component: PhotoShow
          },
        ]
      },
      {
        path: 'homeIndex',
        component: HomeIndex
      },
      {
        path: 'text',
        component: Text
      },
      {
        path: 'activity',
        name: 'activity',
        component: Activity
      },
      {
        path: 'actinfo',
        name: 'actinfo',
        component: ActInfo

      },
      {
        path: 'talk',
        name: 'talk',
        component: Talk
      },
      {
        path: 'mytalk',
        name: 'mytalk',
        component: MyTalk
      },
      {
        path: 'onetalk',
        name: 'onetalk',
        component: OneTalk
      },
      {
        path: 'talkcon',
        name: 'talkcon',
        component: TalkCon
      },
      {
        path: 'find',
        name: 'find',
        redirect: '/home/find/tabs',
        component: Find,
        children: [
          {
            path: 'tabs',
            name: 'tabs',
            component: Tabs
          },
          {
            path: 'onetabs',
            name: 'onetabs',
            component: OneTabs
          },
          {
            path: 'photographer',
            name: 'photographer',
            component: Photographer
          },
          {
            path: 'teach',
            name: 'teach',
            component: Teach
          },
          {
            path: 'cramer',
            name: 'cramer',
            component: Cramer
          },
        ]
      },
      {
        path: 'vip',
        name: 'vip',
        component: Vip
      },
      {
        path: 'vipform',
        name: 'vipfrom',
        component: VipForm
      },
      {
        path: 'cooper',
        name: 'cooper',
        component: Cooper
      },
      {
        path: 'problem',
        name: 'problem',
        component: Problem
      },
      {
        path: 'about',
        name: 'about',
        component: About
      }
    ]
  },
  {
    path: '/photoInfo',
    name: 'photoInfo',
    component: PhotoInfo
  },
  Admin,
]
