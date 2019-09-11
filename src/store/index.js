import Vue from 'vue';
import Vuex from 'vuex';
import Group from './group'
import Notice from './notice'
import Userlists from './users'
import Query from './query'
Vue.use(Vuex);

const state = {
    Group,
    Notice,
    Userlists,
    Query,
    user: [],
    showfoot: true,
    login: false,
    imgLists: [
        { id: 1, creatime: '2019.04.01', src: ['img/风格1/人像/2.jpg', 'img/风格1/人像/3.jpg', 'img/风格1/人像/4.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 2, creatime: '2019.04.02', src: ['img/风格1/人像/5.jpg', 'img/风格1/人像/6.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 3, creatime: '2019.04.03', src: ['img/风格1/人像/1.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 4, creatime: '2019.04.04', src: ['img/风格1/人像/7.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 5, creatime: '2019.04.05', src: ['img/风格1/人像/8.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 6, creatime: '2019.04.06', src: ['img/风格1/人像/9.jpg', 'img/风格1/人像/10.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 7, creatime: '2019.04.07', src: ['img/风格1/人像/10.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 8, creatime: '2019.04.08', src: ['img/风格1/人像/11.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 9, creatime: '2019.04.09', src: ['img/风格1/人像/12.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 10, creatime: '2019.04.10', src: ['img/风格1/人像/13.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 11, creatime: '2019.04.11', src: ['img/风格1/人像/15.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 12, creatime: '2019.04.12', src: ['img/风格1/人像/16.jpg', 'img/风格1/人像/17.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '1111', content: '1111', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 13, creatime: '2019.04.13', src: ['img/风格1/人像/18.jpg'], author: 'img/风格1/儿童/4.jpg', name: '002', title: '1111', content: '1111', act: '', tags: ['人像'], belike: 100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 14, creatime: '2019.04.14', src: ['img/风格1/儿童/14.jpg'], author: 'img/风格1/儿童/4.jpg', name: '002', title: '儿童摄影', content: '儿童摄影', act: '', tags: ['儿童'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 100 },
        { id: 15, creatime: '2019.04.15', src: ['img/风格1/儿童/3.jpg', 'img/风格1/儿童/2.jpg', 'img/风格1/儿童/4.jpg'], author: 'img/风格1/儿童/4.jpg', name: '002', title: '儿童摄影', content: '儿童摄影', act: '', tags: ['儿童'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 100 },
        { id: 16, creatime: '2019.04.16', src: ['img/风格1/儿童/7.jpg', 'img/风格1/儿童/5.jpg', 'img/风格1/儿童/6.jpg'], author: 'img/风格1/儿童/4.jpg', name: '002', title: '儿童摄影', content: '儿童摄影', act: '', tags: ['儿童'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 100 },
        { id: 17, creatime: '2019.04.17', src: ['img/风格1/儿童/8.jpg', 'img/风格1/儿童/9.jpg'], author: 'img/风格1/儿童/4.jpg', name: '002', title: '儿童摄影', content: '儿童摄影', act: '', tags: ['儿童'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 100 },
        { id: 18, creatime: '2019.04.18', src: ['img/风格1/儿童/12.jpg', 'img/风格1/儿童/10.jpg'], author: 'img/风格1/儿童/4.jpg', name: '002', title: '儿童摄影', content: '儿童摄影', act: '', tags: ['儿童'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 100 },
        { id: 19, creatime: '2019.04.19', src: ['img/风格1/儿童/13.jpg', 'img/风格1/儿童/11.jpg'], author: 'img/风格1/儿童/4.jpg', name: '002', title: '儿童摄影', content: '儿童摄影', act: '', tags: ['儿童'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 100 },
        { id: 20, creatime: '2019.04.20', src: ['img/风格1/儿童/1.jpg'], author: 'img/风格1/儿童/4.jpg', name: '002', title: '儿童摄影', content: '儿童摄影', act: '', tags: ['儿童'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 100 },
        { id: 21, creatime: '2019.04.21', src: ['img/风格1/城市/1.jpg', 'img/风格1/城市/4.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 22, creatime: '2019.04.22', src: ['img/风格1/风光/5.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 23, creatime: '2019.04.23', src: ['img/风格1/城市/5.jpg', 'img/风格1/城市/7.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 24, creatime: '2019.04.24', src: ['img/风格1/城市/9.jpg', 'img/风格1/城市/8.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 25, creatime: '2019.04.25', src: ['img/风格1/城市/about.jpg', 'img/风格1/城市/backgroundphoto.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 26, creatime: '2019.04.26', src: ['img/风格1/城市/3.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 27, creatime: '2019.04.27', src: ['img/风格1/风光/1.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 28, creatime: '2019.04.28', src: ['img/风格1/风光/2.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 29, creatime: '2019.04.29', src: ['img/风格1/风光/3.jpg', 'img/风格1/风光/4.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 30, creatime: '2019.04.30', src: ['img/风格1/自然/1.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 31, creatime: '2019.05.01', src: ['img/风格1/风光/6.jpg'], author: 'img/风格1/风光/1.jpg', name: '003', title: '风光摄影', content: '风光摄影', act: '', tags: ['风光'], belike: 100, behide: 20, like: true, hide: true, tag: "风光", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 32, creatime: '2019.05.02', src: ['img/风格1/纪实/2.jpg', 'img/风格1/纪实/4.jpg'], author: 'img/风格1/纪实/5.jpg', name: '004', title: '人文摄影', content: '人文摄影', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 33, creatime: '2019.05.03', src: ['img/风格1/纪实/3.jpg'], author: 'img/风格1/纪实/5.jpg', name: '004', title: '人文摄影', content: '人文摄影', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 34, creatime: '2019.05.04', src: ['img/风格1/纪实/5.jpg'], author: 'img/风格1/纪实/5.jpg', name: '004', title: '人文摄影', content: '人文摄影', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 35, creatime: '2019.05.05', src: ['img/风格1/纪实/6.jpg'], author: 'img/风格1/纪实/5.jpg', name: '004', title: '人文摄影', content: '人文摄影', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 36, creatime: '2019.05.06', src: ['img/风格1/建筑/1.jpg', 'img/风格1/建筑/3.jpg'], author: 'img/风格1/纪实/5.jpg', name: '004', title: '人文摄影', content: '人文摄影', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 37, creatime: '2019.05.07', src: ['img/风格1/建筑/4.jpg', 'img/风格1/建筑/5.jpg'], author: 'img/风格1/纪实/5.jpg', name: '004', title: '人文摄影', content: '人文摄影', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 38, creatime: '2019.05.08', src: ['img/风格1/建筑/8.jpg', 'img/风格1/建筑/6.jpg'], author: 'img/风格1/纪实/5.jpg', name: '004', title: '人文摄影', content: '人文摄影', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 39, creatime: '2019.05.09', src: ['img/风格1/建筑/7.jpg'], author: 'img/风格1/纪实/5.jpg', name: '004', title: '人文摄影', content: '人文摄影', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 40, creatime: '2019.05.02', src: ['img/风格1/街拍/1.jpg',], author: 'img/风格1/街拍/5.jpg', name: '005', title: '街头摄影', content: '街头摄影', act: '', tags: ['街头'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 41, creatime: '2019.05.03', src: ['img/风格1/街拍/2.jpg'], author: 'img/风格1/街拍/5.jpg', name: '005', title: '街头摄影', content: '街头摄影', act: '', tags: ['街头'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 42, creatime: '2019.05.04', src: ['img/风格1/街拍/3.jpg'], author: 'img/风格1/街拍/5.jpg', name: '005', title: '街头摄影', content: '街头摄影', act: '', tags: ['街头'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 43, creatime: '2019.05.05', src: ['img/风格1/街拍/4.jpg'], author: 'img/风格1/街拍/5.jpg', name: '005', title: '街头摄影', content: '街头摄影', act: '', tags: ['街头'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 44, creatime: '2019.05.06', src: ['img/风格1/街拍/5.jpg'], author: 'img/风格1/街拍/5.jpg', name: '005', title: '街头摄影', content: '街头摄影', act: '', tags: ['街头'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 45, creatime: '2019.05.07', src: ['img/风格1/街拍/6.jpg'], author: 'img/风格1/街拍/5.jpg', name: '005', title: '街头摄影', content: '街头摄影', act: '', tags: ['街头'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 46, creatime: '2019.05.08', src: ['img/风格1/街拍/7.jpg'], author: 'img/风格1/街拍/5.jpg', name: '005', title: '街头摄影', content: '街头摄影', act: '', tags: ['街头'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 47, creatime: '2019.05.09', src: ['img/风格1/街拍/8.jpg'], author: 'img/风格1/街拍/5.jpg', name: '005', title: '街头摄影', content: '街头摄影', act: '', tags: ['街头'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 48, creatime: '2019.05.02', src: ['img/风格1/旅行/1.jpg',], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 49, creatime: '2019.05.03', src: ['img/风格1/旅行/2.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 50, creatime: '2019.05.04', src: ['img/风格1/旅行/3.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 51, creatime: '2019.05.05', src: ['img/风格1/旅行/4.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 52, creatime: '2019.05.06', src: ['img/风格1/旅行/5.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 53, creatime: '2019.05.07', src: ['img/风格1/旅行/6.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 54, creatime: '2019.05.08', src: ['img/风格1/旅行/7.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 55, creatime: '2019.05.09', src: ['img/风格1/旅行/8.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 56, creatime: '2019.05.06', src: ['img/风格1/旅行/9.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 57, creatime: '2019.05.07', src: ['img/风格1/旅行/10.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 58, creatime: '2019.05.08', src: ['img/风格1/旅行/11.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 59, creatime: '2019.05.09', src: ['img/风格1/旅行/12.jpg'], author: 'img/风格1/旅行/5.jpg', name: '006', title: '旅行摄影', content: '旅行摄影', act: '', tags: ['旅行'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 48, creatime: '2019.05.02', src: ['img/风格1/美食/1.jpg', 'img/风格1/美食/2.jpg', 'img/风格1/美食/3.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '美食', content: '美食', act: '', tags: ['美食'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 49, creatime: '2019.05.03', src: ['img/风格1/少女/1.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '少女', content: '少女', act: '', tags: ['少女'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 50, creatime: '2019.05.04', src: ['img/风格1/少女/2.jpg', 'img/风格1/少女/3.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '少女', content: '少女', act: '', tags: ['少女'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 51, creatime: '2019.05.05', src: ['img/风格1/少女/4.jpg', 'img/风格1/少女/5.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '少女', content: '少女', act: '', tags: ['少女'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 52, creatime: '2019.05.06', src: ['img/风格1/少女/6.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '少女', content: '少女', act: '', tags: ['少女'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 53, creatime: '2019.05.07', src: ['img/风格1/少女/7.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '少女', content: '少女', act: '', tags: ['少女'], belike: 100, behide: 20, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 54, creatime: '2019.05.08', src: ['img/风格1/少女/8.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '少女', content: '少女', act: '', tags: ['少女'], belike: 100, behide: 20, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 55, creatime: '2019.05.09', src: ['img/风格1/少女/9.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '少女', content: '少女', act: '', tags: ['少女'], belike: 100, behide: 20, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 56, creatime: '2019.05.06', src: ['img/风格1/男生/2.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '男生', content: '男生', act: '', tags: ['男生'], belike: 100, behide: 20, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 57, creatime: '2019.05.07', src: ['img/风格1/男生/3.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '男生', content: '男生', act: '', tags: ['男生'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 58, creatime: '2019.05.08', src: ['img/风格1/人文/4.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '人文', content: '人文', act: '', tags: ['人文'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 59, creatime: '2019.05.09', src: ['img/风格1/自然/2.jpg'], author: 'img/风格1/少女/1.jpg', name: 'ice', title: '自然', content: '自然', act: '', tags: ['自然'], belike: 100, behide: 20, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 60, creatime: '2019.05.02', src: ['img/风格1/夜景/1.jpg', 'img/风格1/夜景/2.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 61, creatime: '2019.05.03', src: ['img/风格1/夜景/8.jpg', 'img/风格1/夜景/3.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 62, creatime: '2019.05.04', src: ['img/风格1/夜景/9.jpg', 'img/风格1/夜景/4.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 63, creatime: '2019.05.05', src: ['img/风格1/夜景/10.jpg', 'img/风格1/夜景/5.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 64, creatime: '2019.05.06', src: ['img/风格1/夜景/11.jpg', 'img/风格1/夜景/6.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 65, creatime: '2019.05.07', src: ['img/风格1/夜景/12.jpg', 'img/风格1/夜景/7.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 66, creatime: '2019.05.08', src: ['img/风格/情绪/1.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '情绪', content: '情绪', act: '', tags: ['情绪'], belike: 100, behide: 20, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 67, creatime: '2019.05.09', src: ['img/风格/情绪/2.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '情绪', content: '情绪', act: '', tags: ['情绪'], belike: 100, behide: 20, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 68, creatime: '2019.05.06', src: ['img/风格/情绪/3.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '情绪', content: '情绪', act: '', tags: ['情绪'], belike: 100, behide: 20, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 69, creatime: '2019.05.07', src: ['img/风格/情绪/5.jpg', 'img/风格/情绪/4.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '情绪', content: '情绪', act: '', tags: ['情绪'], belike: 100, behide: 20, like: true, hide: true, tag: "人像", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 70, creatime: '2019.05.08', src: ['img/风格/日系/1.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 71, creatime: '2019.05.09', src: ['img/风格/日系/2.jpg', 'img/风格/日系/3.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 72, creatime: '2019.05.08', src: ['img/风格/日系/6.jpg', 'img/风格/日系/4.jpg', 'img/风格/日系/5.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 73, creatime: '2019.05.09', src: ['img/风格/日系/7.jpg', 'img/风格/日系/8.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 74, creatime: '2019.05.02', src: ['img/风格/色彩/2.jpg', 'img/风格/色彩/3.jpg', 'img/风格/色彩/4.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 75, creatime: '2019.05.03', src: ['img/风格/色彩/5.jpg', 'img/风格/色彩/6.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "人文", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 76, creatime: '2019.05.04', src: ['img/风格/色彩/7.jpg', 'img/风格/色彩/8.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 77, creatime: '2019.05.05', src: ['img/风格/时尚/1.jpg',], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 78, creatime: '2019.05.06', src: ['img/风格/时尚/3.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 79, creatime: '2019.05.07', src: ['img/风格/唯美/1.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '夜景', content: '夜景', act: '', tags: ['夜景'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 80, creatime: '2019.05.08', src: ['img/风格/唯美/3.jpg', 'img/风格/唯美/2.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '情绪', content: '情绪', act: '', tags: ['情绪'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 81, creatime: '2019.05.09', src: ['img/风格/唯美/4.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '情绪', content: '情绪', act: '', tags: ['情绪'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 82, creatime: '2019.05.06', src: ['img/风格/唯美/5.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '情绪', content: '情绪', act: '', tags: ['情绪'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 83, creatime: '2019.05.07', src: ['img/风格/唯美/6.jpg', 'img/风格/唯美/7.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '情绪', content: '情绪', act: '', tags: ['情绪'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 84, creatime: '2019.05.08', src: ['img/风格/唯美/8.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 85, creatime: '2019.05.09', src: ['img/风格/抓拍/4.jpg', 'img/风格/抓拍/2.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 86, creatime: '2019.05.08', src: ['img/风格/抓拍/3.jpg', 'img/风格/抓拍/5.jpg', 'img/风格/日系/5.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        { id: 87, creatime: '2019.05.09', src: ['img/风格/抓拍/8.jpg', 'img/风格/抓拍/7.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
    ],
    imgTag: [],
    imgList: '',
    sendImgList: { id: '', src: [], author: 'img/1.jpg', name: 'ice', belike: 0, behide: 0, like: true, hide: true, tag: 1, arguelist: [], arguelength: 0 },
    src: [],
    photo: true,
    ifart: true,
    arts: [
        { id: 100, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴1', photo: 'img/风格/抓拍/7.jpg', src: ['img/风格/抓拍/7.jpg'], desc: '记录生活点点滴滴1', context: '记录生活点点滴滴1', author: 'img/风格1/人像/1.jpg', name: '001', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['后期修图'], arguelist: [], arguelength: 0, talk: '佳能摄影', ifargue: false },
        { id: 200, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴2', photo: 'img/风格/抓拍/8.jpg', src: ['img/风格/抓拍/8.jpg'], desc: '记录生活点点滴滴2', context: '记录生活点点滴滴2', author: 'img/风格1/人像/1.jpg', name: '001', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['后期修图'], arguelist: [], arguelength: 0, talk: '佳能摄影', ifargue: false },
        { id: 300, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴3', photo: 'img/风格/抓拍/5.jpg', src: ['img/风格/抓拍/5.jpg'], desc: '记录生活点点滴滴3', context: '记录生活点点滴滴3', author: 'img/风格1/人像/1.jpg', name: '001', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '佳能摄影', ifargue: false },
        { id: 400, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴4', photo: 'img/风格/唯美/8.jpg', src: ['img/风格/唯美/8.jpg'], desc: '记录生活点点滴滴4', context: '记录生活点点滴滴4', author: 'img/风格1/人像/1.jpg', name: '001', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '佳能摄影', ifargue: false },
        { id: 500, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴5', photo: 'img/风格/唯美/7.jpg', src: ['img/风格/唯美/7.jpg'], desc: '记录生活点点滴滴5', context: '记录生活点点滴滴5', author: 'img/风格1/儿童/4.jpg', name: '002', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '手机摄影', ifargue: false },
        { id: 600, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴6', photo: 'img/风格/唯美/6.jpg', src: ['img/风格/唯美/6.jpg'], desc: '记录生活点点滴滴6', context: '记录生活点点滴滴6', author: 'img/风格1/儿童/4.jpg', name: '002', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '手机摄影', ifargue: false },
        { id: 700, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴7', photo: 'img/风格/唯美/5.jpg', src: ['img/风格/唯美/5.jpg'], desc: '记录生活点点滴滴7', context: '记录生活点点滴滴7', author: 'img/风格1/儿童/4.jpg', name: '002', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '手机摄影', ifargue: false },
        { id: 800, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴8', photo: 'img/风格/唯美/4.jpg', src: ['img/风格/唯美/4.jpg'], desc: '记录生活点点滴滴8', context: '记录生活点点滴滴8', author: 'img/风格1/儿童/4.jpg', name: '002', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '手机摄影', ifargue: false },
        { id: 900, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴9', photo: 'img/风格/唯美/3.jpg', src: ['img/风格/唯美/3.jpg'], desc: '记录生活点点滴滴9', context: '记录生活点点滴滴9', author: 'img/风格1/风光/1.jpg', name: '003', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
        { id: 101, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴10', photo: 'img/风格/唯美/2.jpg', src: ['img/风格/唯美/2.jpg'], desc: '记录生活点点滴滴10', context: '记录生活点点滴滴10', author: 'img/风格1/风光/1.jpg', name: '003', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
        { id: 102, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴11', photo: 'img/风格/唯美/1.jpg', src: ['img/风格/唯美/1.jpg'], desc: '记录生活点点滴滴11', context: '记录生活点点滴滴11', author: 'img/风格1/风光/1.jpg', name: '003', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
        { id: 103, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴12', photo: 'img/风格/时尚/3.jpg', src: ['img/风格/时尚/3.jpg'], desc: '记录生活点点滴滴12', context: '记录生活点点滴滴12', author: 'img/风格1/风光/1.jpg', name: '003', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
        { id: 104, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴13', photo: 'img/风格/时尚/1.jpg', src: ['img/风格/时尚/1.jpg'], desc: '记录生活点点滴滴13', context: '记录生活点点滴滴13', author: 'img/风格1/纪实/5.jpg', name: '004', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '索尼摄影', ifargue: false },
        { id: 105, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴14', photo: 'img/风格/色彩/8.jpg', src: ['img/风格/色彩/8.jpg'], desc: '记录生活点点滴滴14', context: '记录生活点点滴滴14', author: 'img/风格1/纪实/5.jpg', name: '004', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '索尼摄影', ifargue: false },
        { id: 106, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴15', photo: 'img/风格/色彩/.jpg', src: ['img/风格/色彩/7.jpg'], desc: '记录生活点点滴滴15', context: '记录生活点点滴滴15', author: 'img/风格1/纪实/5.jpg', name: '004', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '索尼摄影', ifargue: false },
        { id: 107, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴16', photo: 'img/风格/色彩/6.jpg', src: ['img/风格/色彩/6.jpg'], desc: '记录生活点点滴滴16', context: '记录生活点点滴滴16', author: 'img/风格1/纪实/5.jpg', name: '004', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '索尼摄影', ifargue: false },
        { id: 108, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴17', photo: 'img/风格/日系/1.jpg', src: ['img/风格/日系/1.jpg'], desc: '记录生活点点滴滴17', context: '记录生活点点滴滴17', author: 'img/风格1/街拍/5.jpg', name: '005', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['后期修图'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
        { id: 209, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴18', photo: 'img/风格/日系/2.jpg', src: ['img/风格/日系/2.jpg'], desc: '记录生活点点滴滴18', context: '记录生活点点滴滴18', author: 'img/风格1/街拍/5.jpg', name: '005', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['后期修图'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
        { id: 301, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴19', photo: 'img/风格/日系/3.jpg', src: ['img/风格/日系/3.jpg'], desc: '记录生活点点滴滴19', context: '记录生活点点滴滴19', author: 'img/风格1/街拍/5.jpg', name: '005', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
        { id: 402, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴20', photo: 'img/风格/日系/4.jpg', src: ['img/风格/日系/4.jpg'], desc: '记录生活点点滴滴20', context: '记录生活点点滴滴20', author: 'img/风格1/街拍/5.jpg', name: '005', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
        { id: 503, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴21', photo: 'img/风格/日系/5.jpg', src: ['img/风格/日系/5.jpg'], desc: '记录生活点点滴滴21', context: '记录生活点点滴滴21', author: 'img/风格1/旅行/5.jpg', name: '006', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '人像约拍', ifargue: false },
        { id: 604, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴22', photo: 'img/风格/日系/6.jpg', src: ['img/风格/日系/6.jpg'], desc: '记录生活点点滴滴22', context: '记录生活点点滴滴22', author: 'img/风格1/旅行/5.jpg', name: '006', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '人像约拍', ifargue: false },
        { id: 705, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴23', photo: 'img/风格/日系/7.jpg', src: ['img/风格/日系/7.jpg'], desc: '记录生活点点滴滴23', context: '记录生活点点滴滴23', author: 'img/风格1/旅行/5.jpg', name: '006', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '人像约拍', ifargue: false },
        { id: 806, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴24', photo: 'img/风格/日系/8.jpg', src: ['img/风格/日系/8.jpg'], desc: '记录生活点点滴滴24', context: '记录生活点点滴滴24', author: 'img/风格1/旅行/5.jpg', name: '006', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '人像约拍', ifargue: false },
        { id: 110, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴25', photo: 'img/风格1/夜景/1.jpg', src: ['img/风格1/夜景/1.jpg'], desc: '记录生活点点滴滴25', context: '记录生活点点滴滴25', author: 'img/风格1/少女/1.jpg', name: 'ice', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '单反和手机的比较', ifargue: false },
        { id: 220, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴26', photo: 'img/风格1/夜景/2.jpg', src: ['img/风格1/夜景/2.jpg'], desc: '记录生活点点滴滴26', context: '记录生活点点滴滴26', author: 'img/风格1/少女/1.jpg', name: 'ice', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '单反和手机的比较', ifargue: false },
        { id: 330, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴27', photo: 'img/风格1/夜景/3.jpg', src: ['img/风格1/夜景/3.jpg'], desc: '记录生活点点滴滴27', context: '记录生活点点滴滴27', author: 'img/风格1/少女/1.jpg', name: 'ice', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '单反和手机的比较', ifargue: false },
        { id: 440, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴28', photo: 'img/风格1/夜景/4.jpg', src: ['img/风格1/夜景/4.jpg'], desc: '记录生活点点滴滴28', context: '记录生活点点滴滴4', author: 'img/风格1/少女/1.jpg', name: 'ice', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '单反和手机的比较', ifargue: false },
    ],
    artindex: '',
    art: '',
    artimg: '',
    artTitle: '',
    creatime: '',
    argueLists: [],
    argue: [],
    mylike: [],
    myhide: [],
    actLists: [
        { id: '1', creatime: '2019-05-01', endtime: '2019-06-04', title: '人像摄影大赛', photo: 'img/风格/日系/2.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励100元', state: '进行中', 
        imglists: [
            { id: 1, creatime: '2019.04.01', src: ['img/风格1/人像/2.jpg', 'img/风格1/人像/3.jpg', 'img/风格1/人像/4.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '人像摄影大赛', tags: ['人像'], belike:100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
            { id: 2, creatime: '2019.04.02', src: ['img/风格1/人像/5.jpg', 'img/风格1/人像/6.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '人像摄影大赛', tags: ['人像'], belike:100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
            { id: 3, creatime: '2019.04.03', src: ['img/风格1/人像/1.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '人像摄影大赛', tags: ['人像'], belike:100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
            { id: 4, creatime: '2019.04.04', src: ['img/风格1/人像/7.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '人像摄影', content: '人像摄影', act: '人像摄影大赛', tags: ['人像'], belike:100, behide: 10, like: true, hide: true, tag: "推荐", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
            ], hot: '推荐' },
        { id: '2', creatime: '2019-05-04', endtime: '2019-06-04', title: '人文摄影大赛', photo: 'img/风格/唯美/7.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励110元', state: '进行中', 
        imglists: [
            { id: 84, creatime: '2019.05.08', src: ['img/风格/唯美/8.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '人文摄影大赛', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "精选", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
            { id: 85, creatime: '2019.05.09', src: ['img/风格/抓拍/4.jpg','img/风格/抓拍/2.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '人文摄影大赛', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
            { id: 86, creatime: '2019.05.08', src: ['img/风格/抓拍/3.jpg','img/风格/抓拍/5.jpg','img/风格/日系/5.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '人文摄影大赛', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
            { id: 87, creatime: '2019.05.09', src: ['img/风格/抓拍/8.jpg','img/风格/抓拍/7.jpg'], author: 'img/风格1/人像/1.jpg', name: '001', title: '日系', content: '日系', act: '人文摄影大赛', tags: ['日系'], belike: 100, behide: 20, like: true, hide: true, tag: "最新", arguelist: [], arguelength: 0, ifargue: false, read: 200 },
        ], hot: '推荐' },
        { id: '3', creatime: '2019-05-04', endtime: '2019-06-04', title: '自然摄影大赛', photo: 'img/风格1/自然/1.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励200元', state: '进行中', imglists: [], hot: '推荐' },
        { id: '4', creatime: '2019-05-04', endtime: '2019-06-04', title: '风光摄影大赛', photo: 'img/风格1/风光/3.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励300元', state: '进行中', imglists: [], hot: '推荐' },
        { id: '5', creatime: '2019-05-04', endtime: '2019-06-04', title: '宠物摄影大赛', photo: 'img/风格/抓拍/1.png', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励400元', state: '进行中', imglists: [], hot: '推荐' },
        { id: '6', creatime: '2019-05-04', endtime: '2019-04-04', title: '静物摄影大赛', photo: 'img/风格1/静物/1.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励500元', state: '已结束', imglists: [], hot: '推荐' },
        { id: '7', creatime: '2019-05-04', endtime: '2019-04-04', title: '黑白摄影大赛', photo: 'img/风格/黑白/2.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励600元', state: '已结束', imglists: [], hot: '不推荐' },
        { id: '8', creatime: '2019-05-04', endtime: '2019-04-04', title: '街头摄影大赛', photo: 'img/风格1/纪实/3.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励700元', state: '已结束', imglists: [], hot: '不推荐' },
        { id: '9', creatime: '2019-05-04', endtime: '2019-04-04', title: '建筑摄影大赛', photo: 'img/风格1/建筑/1.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励800元', state: '已结束', imglists: [], hot: '不推荐' },
        { id: '10', creatime: '2019-05-04', endtime: '2019-06-04', title: '儿童摄影大赛', photo: 'img/风格1/儿童/1.jpg', desc: '寻找身边的美', author: '佳能官方', intro: '一起来寻找身边的美。奖励800元', state: '进行中', imglists: [], hot: '推荐' },],
    myact: [],
    tabphotos: [],
    talks: [
        {
            creatime: '2019.05.04', author: '001', title: '佳能摄影', intro: '发表佳能摄影内容', tag: '佳能', photo: 'img/风格1/城市/1.jpg', read: 0,
            arts: [
                { id: 100, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴1', photo: 'img/风格/抓拍/7.jpg', src: ['img/风格/抓拍/7.jpg'], desc: '记录生活点点滴滴1', context: '记录生活点点滴滴1', author: 'img/风格1/人像/1.jpg', name: '001', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['后期修图'], arguelist: [], arguelength: 0, talk: '佳能摄影', ifargue: false },
                { id: 200, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴2', photo: 'img/风格/抓拍/8.jpg', src: ['img/风格/抓拍/8.jpg'], desc: '记录生活点点滴滴2', context: '记录生活点点滴滴2', author: 'img/风格1/人像/1.jpg', name: '001', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['后期修图'], arguelist: [], arguelength: 0, talk: '佳能摄影', ifargue: false },
                { id: 300, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴3', photo: 'img/风格/抓拍/5.jpg', src: ['img/风格/抓拍/5.jpg'], desc: '记录生活点点滴滴3', context: '记录生活点点滴滴3', author: 'img/风格1/人像/1.jpg', name: '001', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '佳能摄影', ifargue: false },
                { id: 400, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴4', photo: 'img/风格/唯美/8.jpg', src: ['img/风格/唯美/8.jpg'], desc: '记录生活点点滴滴4', context: '记录生活点点滴滴4', author: 'img/风格1/人像/1.jpg', name: '001', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '佳能摄影', ifargue: false },
            ]
        },
        {
            creatime: '2019.05.05', author: '002', title: '手机摄影', intro: '发表手机摄影内容', tag: '手机', photo: 'img/风格1/儿童/1.jpg', read: 100, arts: [
                { id: 500, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴5', photo: 'img/风格/唯美/7.jpg', src: ['img/风格/唯美/7.jpg'], desc: '记录生活点点滴滴5', context: '记录生活点点滴滴5', author: 'img/风格1/儿童/4.jpg', name: '002', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '手机摄影', ifargue: false },
                { id: 600, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴6', photo: 'img/风格/唯美/6.jpg', src: ['img/风格/唯美/6.jpg'], desc: '记录生活点点滴滴6', context: '记录生活点点滴滴6', author: 'img/风格1/儿童/4.jpg', name: '002', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '手机摄影', ifargue: false },
                { id: 700, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴7', photo: 'img/风格/唯美/5.jpg', src: ['img/风格/唯美/5.jpg'], desc: '记录生活点点滴滴7', context: '记录生活点点滴滴7', author: 'img/风格1/儿童/4.jpg', name: '002', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '手机摄影', ifargue: false },
                { id: 800, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴8', photo: 'img/风格/唯美/4.jpg', src: ['img/风格/唯美/4.jpg'], desc: '记录生活点点滴滴8', context: '记录生活点点滴滴8', author: 'img/风格1/儿童/4.jpg', name: '002', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '手机摄影', ifargue: false },
            ]
        },
        {
            creatime: '2019.05.06', author: '003', title: '尼康摄影', intro: '发表尼康摄影内容', tag: '尼康', photo: 'img/风格1/少女/1.jpg', read: 10, arts: [
                { id: 900, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴9', photo: 'img/风格/唯美/3.jpg', src: ['img/风格/唯美/3.jpg'], desc: '记录生活点点滴滴9', context: '记录生活点点滴滴9', author: 'img/风格1/风光/1.jpg', name: '003', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 101, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴10', photo: 'img/风格/唯美/2.jpg', src: ['img/风格/唯美/2.jpg'], desc: '记录生活点点滴滴10', context: '记录生活点点滴滴10', author: 'img/风格1/风光/1.jpg', name: '003', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 102, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴11', photo: 'img/风格/唯美/1.jpg', src: ['img/风格/唯美/1.jpg'], desc: '记录生活点点滴滴11', context: '记录生活点点滴滴11', author: 'img/风格1/风光/1.jpg', name: '003', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 103, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴12', photo: 'img/风格/时尚/3.jpg', src: ['img/风格/时尚/3.jpg'], desc: '记录生活点点滴滴12', context: '记录生活点点滴滴12', author: 'img/风格1/风光/1.jpg', name: '003', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
           ]
        },
        {
            creatime: '2019.05.06', author: '004', title: '广州摄影', intro: '发表广州摄影内容', tag: '广州', photo: 'img/风格/日系/4.jpg', read: 10, arts: [
                { id: 104, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴13', photo: 'img/风格/时尚/1.jpg', src: ['img/风格/时尚/1.jpg'], desc: '记录生活点点滴滴13', context: '记录生活点点滴滴13', author: 'img/风格1/纪实/5.jpg', name: '004', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
                { id: 105, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴14', photo: 'img/风格/色彩/8.jpg', src: ['img/风格/色彩/8.jpg'], desc: '记录生活点点滴滴14', context: '记录生活点点滴滴14', author: 'img/风格1/纪实/5.jpg', name: '004', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['拍摄技巧'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
                { id: 106, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴15', photo: 'img/风格/色彩/.jpg', src: ['img/风格/色彩/7.jpg'], desc: '记录生活点点滴滴15', context: '记录生活点点滴滴15', author: 'img/风格1/纪实/5.jpg', name: '004', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
                { id: 107, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴16', photo: 'img/风格/色彩/6.jpg', src: ['img/风格/色彩/6.jpg'], desc: '记录生活点点滴滴16', context: '记录生活点点滴滴16', author: 'img/风格1/纪实/5.jpg', name: '004', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['手机拍照'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
                { id: 108, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴17', photo: 'img/风格/日系/1.jpg', src: ['img/风格/日系/1.jpg'], desc: '记录生活点点滴滴17', context: '记录生活点点滴滴17', author: 'img/风格1/街拍/5.jpg', name: '005', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['后期修图'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
                { id: 209, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴18', photo: 'img/风格/日系/2.jpg', src: ['img/风格/日系/2.jpg'], desc: '记录生活点点滴滴18', context: '记录生活点点滴滴18', author: 'img/风格1/街拍/5.jpg', name: '005', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['后期修图'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
                { id: 301, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴19', photo: 'img/风格/日系/3.jpg', src: ['img/风格/日系/3.jpg'], desc: '记录生活点点滴滴19', context: '记录生活点点滴滴19', author: 'img/风格1/街拍/5.jpg', name: '005', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
                { id: 402, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴20', photo: 'img/风格/日系/4.jpg', src: ['img/风格/日系/4.jpg'], desc: '记录生活点点滴滴20', context: '记录生活点点滴滴20', author: 'img/风格1/街拍/5.jpg', name: '005', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '广州摄影', ifargue: false },
           ]           
        },
        {
            creatime: '2019.05.06', author: '005', title: '人像约拍', intro: '发表人像约拍内容', tag: '人像约拍', photo: 'img/风格/唯美/3.jpg', read: 10, arts: [
                { id: 900, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴9', photo: 'img/风格/唯美/3.jpg', src: ['img/风格/唯美/3.jpg'], desc: '记录生活点点滴滴9', context: '记录生活点点滴滴9', author: 'img/风格1/风光/1.jpg', name: '003', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 101, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴10', photo: 'img/风格/唯美/2.jpg', src: ['img/风格/唯美/2.jpg'], desc: '记录生活点点滴滴10', context: '记录生活点点滴滴10', author: 'img/风格1/风光/1.jpg', name: '003', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 102, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴11', photo: 'img/风格/唯美/1.jpg', src: ['img/风格/唯美/1.jpg'], desc: '记录生活点点滴滴11', context: '记录生活点点滴滴11', author: 'img/风格1/风光/1.jpg', name: '003', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 103, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴12', photo: 'img/风格/时尚/3.jpg', src: ['img/风格/时尚/3.jpg'], desc: '记录生活点点滴滴12', context: '记录生活点点滴滴12', author: 'img/风格1/风光/1.jpg', name: '003', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
           ]           
        },
        {
            creatime: '2019.05.06', author: '006', title: '单反和手机的比较', intro: '发表单反和手机的比较内容', tag: '单反和手机', photo: 'img/风格/唯美/3.jpg', read: 10, arts: [
                { id: 900, art: true, creatime: '2019/06/02', title: '记录生活点点滴滴9', photo: 'img/风格/唯美/3.jpg', src: ['img/风格/唯美/3.jpg'], desc: '记录生活点点滴滴9', context: '记录生活点点滴滴9', author: 'img/风格1/风光/1.jpg', name: '003', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 101, art: true, creatime: '2019/06/03', title: '记录生活点点滴滴10', photo: 'img/风格/唯美/2.jpg', src: ['img/风格/唯美/2.jpg'], desc: '记录生活点点滴滴10', context: '记录生活点点滴滴10', author: 'img/风格1/风光/1.jpg', name: '003', read: 100, belike: 10, behide: 10, like: true, hide: true, tag: ['器材应用'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 102, art: true, creatime: '2019/05/04', title: '记录生活点点滴滴11', photo: 'img/风格/唯美/1.jpg', src: ['img/风格/唯美/1.jpg'], desc: '记录生活点点滴滴11', context: '记录生活点点滴滴11', author: 'img/风格1/风光/1.jpg', name: '003', read: 180, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
                { id: 103, art: true, creatime: '2019/05/05', title: '记录生活点点滴滴12', photo: 'img/风格/时尚/3.jpg', src: ['img/风格/时尚/3.jpg'], desc: '记录生活点点滴滴12', context: '记录生活点点滴滴12', author: 'img/风格1/风光/1.jpg', name: '003', read: 70, belike: 10, behide: 10, like: true, hide: true, tag: ['人像'], arguelist: [], arguelength: 0, talk: '尼康摄影', ifargue: false },
           ]           
        },

    ],
    talk: '',
    myfocusdyinfo: []
    //其他属性...
}
const getters = {
    isShow(state) {
        return state.showfoot;
    },
    isLogin(state) {
        return state.login
    },
}
const mutations = {
    createUser(state,u){
        var usermess={
            userid: '', creatime: '', username: '', realname: '', sex: '', birth: '', intro: '', city: '', address: '', postcode: '', qq: '', phone: '',type:'',
            IDcard: '', email: '', touxaing: 'img/unlogin.png', bcgphoto: 'img/about1.jpg', ifnotice: true, ifvip: 'NO', 
            myphoto:[], 
            myart: [], 
            myact: [], mylike: [],moneyupload:true,focusupload:true,
            myhide: [], myfocus: [], myfans: [], backs: [], sixins: []
        }
        usermess.userid=u.userid
        usermess.username=u.username
        var date=new Date()
        var str=date.toLocaleDateString();
        usermess.creatime=str
        state.Userlists.userMessages.push(usermess)
        console.log( state.Userlists.userMessages)
    },
    usermessage(state, user) {//获取登录信息
        state.user.push(user)
    },
    hidefoot(state) {//隐藏底部
        state.showfoot = false;
    },
    showfoot(state) {//显示底部
        state.showfoot = true;
    },
    login(state) {//显示登录
        state.login = true;
    },
    logout(state) {//退出
        state.login = false;
    },
    imgTag(state, id) {//社区页面获取不同类别图片
        state.imgTag = []
        state.imgLists.forEach(item => {
            if (item.tag === id) {
                state.imgTag.push(item)
            }
        });
    },
    imglist(state, id) {
        var result = state.imgLists.some(item => {
            if (item.id === id) {
                state.imgList = item
                return true
            }
        })
        if (result) {
        }
    },
    like(state, id) {//点赞图片
        state.imgLists.some(item => {
            if (item.id === id) {
                item.like = false
                item.belike++
                state.Userlists.userMessages.some(el => {
                    if (el.username == state.user[0].username) {
                        el.mylike.unshift(item)
                        el.myphoto.some(al=>{
                            if(al.id==id){
                                al.like=false
                                al.belike++
                            }
                        })
                    }
                })
                return true
            }
        })
        if(state.myfocusdyinfo.length!=0){
            state.myfocusdyinfo.some(cl=>{
                if(cl.id==id){
                    cl.like=false
                    cl.belike++
                }
            })
        }
    },
    unlike(state, id) {//取消点赞图片
        state.imgLists.some(item => {
            if (item.id === id) {
                item.like = true
                item.belike--
                state.Userlists.userMessages.some(el => {
                    if (el.username == state.user[0].username) {
                        el.myphoto.some(al=>{
                            if(al.id==id){
                                al.like=true
                                al.belike--
                            }
                        })
                    }
                })
                return true
            }
        })
        if(state.myfocusdyinfo.length!=0){
            state.myfocusdyinfo.some(cl=>{
                if(cl.id==id){
                    cl.like=true
                    cl.belike--
                }
            })
        }
    },
    hide(state, id) {//收藏图片
        state.imgLists.some(item => {
            if (item.id === id) {
                item.hide = false
                item.behide++
                state.Userlists.userMessages.some(el => {
                    if (el.username == state.user[0].username) {
                        el.myhide.unshift(item)
                        el.myphoto.some(al=>{
                            if(al.id==id){
                                al.hide=false
                                al.behide++
                            }
                        })
                    }
                })
                return true
            }
        })
        if(state.myfocusdyinfo.length!=0){
            state.myfocusdyinfo.some(cl=>{
                if(cl.id==id){
                    cl.hide=false
                    cl.behide++
                }
            })
        }
    },
    unhide(state, id) {//取消收藏图片
        state.imgLists.some(item => {
            if (item.id === id) {
                item.hide = true
                item.behide--
                state.Userlists.userMessages.some(el => {
                    if (el.username == state.user[0].username) {
                        el.myphoto.some(al=>{
                            if(al.id==id){
                                al.hide=true
                                al.behide--
                            }
                        })
                    }
                })
                return true
            }
        })
        if(state.myfocusdyinfo.length!=0){
            state.myfocusdyinfo.some(cl=>{
                if(cl.id==id){
                    cl.hide=true
                    cl.behide--
                }
            })
        }
    },
    artlike(state, id) {//喜欢文章
        state.arts.some(item => {
            if (item.id === id) {
                item.like = false
                item.belike++
                state.Userlists.userMessages.some(el => {
                    if (el.username == state.user[0].username) {
                        el.mylike.unshift(item)
                        el.myart.some(al=>{
                            if(al.id==id){
                                al.like=false
                                al.belike++
                            }
                        })
                    }
                })
                return true
            }
        })
        if(state.myfocusdyinfo.length!=0){
            state.myfocusdyinfo.some(cl=>{
                if(cl.id==id){
                    cl.like=false
                    cl.belike++
                }
            })
        }
    },
    artread(state, id) {//增加文章阅读量
        state.arts.some(item => {
            if (item.id === id) {
                item.read++
                return true
            }
        })
    },
    artunlike(state, id) {//不喜欢文章
        state.arts.some(item => {
            if (item.id === id) {
                item.like = true
                item.belike--
                state.Userlists.userMessages.some(el => {
                    if (el.username == state.user[0].username) {
                        el.myart.some(al=>{
                            if(al.id==id){
                                al.like=true
                                al.belike--
                            }
                        })
                    }
                })
                return true
            }
        })
        if(state.myfocusdyinfo.length!=0){
            state.myfocusdyinfo.some(cl=>{
                if(cl.id==id){
                    cl.like=true
                    cl.belike--
                }
            })
        }
    },
    arthide(state, id) {//收藏文章
        state.arts.some(item => {
            if (item.id === id) {
                item.hide = false
                item.behide++
                state.Userlists.userMessages.some(el => {
                    if (el.username == state.user[0].username) {
                        el.myart.some(al=>{
                            if(al.id==id){
                                al.hide=false
                                al.behide++
                            }
                        })
                    }
                })
                return true
            }
        })
        if(state.myfocusdyinfo.length!=0){
            state.myfocusdyinfo.some(cl=>{
                if(cl.id==id){
                    cl.hide=false
                    cl.behide++
                }
            })
        }
    },
    artunhide(state, id) {//不收藏文章
        state.arts.some(item => {
            if (item.id === id) {
                item.hide = true
                item.behide--
                state.Userlists.userMessages.some(el => {
                    if (el.username == state.user[0].username) {
                        el.myart.some(al=>{
                            if(al.id==id){
                                al.hide=true
                                al.behide--
                            }
                        })
                    }
                })
                return true
            }
        })
        if(state.myfocusdyinfo.length!=0){
            state.myfocusdyinfo.some(cl=>{
                if(cl.id==id){
                    cl.hide=true
                    cl.behide--
                }
            })
        }
    },
    sendImgList(state, srcl) {//获取上传的图片
        state.src.push(srcl)
    },
    addImg(state, form) {//发送图片动态
        let date = new Date();
        let strDate = date
            .toLocaleString()
            .replace(/[年月]/g, "-")
            .replace(/[日上下午]/g, "");
        var j = {
            id: '', creatime: '', src: [],
            author: 'img/1.jpg', name: 'ice',
            title: '', content: '', act: '', tags: [], belike: 0, behide: 0, like: true, hide: true, read: 0, tag: "最新", arguelist: [], arguelength: 0, arguelist: [], arguelength: 0, ifargue: false
        }
        j.id = Date.now()
        j.creatime = strDate
        j.src = state.src
        j.name = state.user[0].username
        state.Userlists.userMessages.some(el=>{
            if(el.username==j.name){
                j.author = el.touxaing
            }
        })
        j.title = form.title
        j.content = form.desc
        j.act = form.act
        j.tags = form.tag
        state.imgLists.unshift(j)
        state.actLists.some(el => {
            if (el.title == form.act) {
                el.imglists.unshift(j)
                state.Userlists.userMessages.some(al => {
                    if (al.username == j.name) {
                        al.myact.unshift(el)
                    }
                })
            }
        })
        state.Group.groups.forEach(el => {
            if (el.name == form.group) {
                el.Dyinfo.unshift(j)
            }
        })
        state.Userlists.userMessages.some(el => {
            if (el.username == j.name) {
                el.myphoto.unshift(j)
            }
        })
        state.src = []
    },
    sendphoto(state) {//发送页面是发送图片时
        state.photo = true
        state.ifart = false
    },
    addphotoarguelist(state, argue) {//添加图片评论
        state.imgLists.some(item => {
            if (item.id == argue.id) {
                item.arguelist = argue.lists.concat(item.arguelist)
                item.arguelength = item.arguelist.length
            }
        })
    },
    addgrouparguelist(state, argue) {//添加图片评论到小组动态
        state.Group.groups.forEach(el => {
            if (el.creatime == argue.group) {
                el.Dyinfo.some(item => {
                    if (item.id == argue.id) {
                        item.arguelist = argue.lists.concat(item.arguelist)
                        item.arguelength = item.arguelist.length
                    }
                })
            }
        })
    },
    photoread(state, id) {//增加图片阅读量
        state.imgLists.some(item => {
            if (item.id === id) {
                item.read++
                return true
            }
        })
    },
    sendart(state) {//发送页面是发文章时
        state.photo = false
        state.ifart = true
    },
    addart(state, art) {//获取发送文章页面的表单信息
        state.art = art.content
        state.artTitle = art.title
    },
    artimg(state, src) {//获取发送文章的版图
        state.artimg = src
    },
    addartlist(state, form) {//发布文章
        let date = new Date();
        let strDate = date
            .toLocaleString()
            .replace(/[年月]/g, "-")
            .replace(/[日上下午]/g, "");
        var a = { id: '', art: true, creatime: '', title: '', photo: '', src: [], desc: '', context: '', author: '', name: '', read: 0, belike: 0, behide: 0, like: true, hide: true, tag: [], arguelist: [], arguelength: 0, talk: '' }
        a.id = Date.now()
        a.creatime = strDate
        a.title = state.artTitle
        a.photo = state.artimg
        a.src.push(state.artimg)
        a.desc = form.desc
        a.context = state.art
        a.name = state.user[0].username
        state.Userlists.userMessages.some(el=>{
            if(el.username==a.name){
                a.author = el.touxaing
            }
        })
        a.tag = form.tag
        a.talk = form.talk
        state.talks.some(el => {
            if (el.title == form.talk) {
                el.arts.unshift(a)
            }
        })
        state.Group.groups.forEach(el => {
            if (el.name == form.group) {
                el.Dyinfo.unshift(a)
            }
        })
        state.Userlists.userMessages.some(el => {
            if (el.username == a.name) {
                el.myart.unshift(a)
            }
        })
        state.arts.unshift(a)
        state.artTitle = ''
        state.art = ''
        state.artimg = ''
    },
    addarguelist(state, argue) {//添加文章评论
        state.arts.some(item => {
            if (item.id == argue.id) {
                item.arguelist = argue.lists.concat(item.arguelist)
                item.arguelength = item.arguelist.length
            }
        })
    },
    getart(state, id) {//获取文章详情
        state.arts.some(item => {
            if (item.id = id) {
                state.artindex = item
                return
            }
        })
    },
    gettabsimg(state, tab) {//获取标签图片
        state.tabphotos = []
        state.imgLists.forEach(el => {
            if (el.tags.includes(tab)) {
                state.tabphotos.push(el)
            }
        })
    },
    addtalk(state, form) {//添加话题
        var talk = {
            creatime: '', author: '', title: '', intro: '', tag: '', photo: '', read: 0,
            arts: []
        }
        talk.creatime = Date.now()
        talk.author = state.user[0].username
        talk.title = form.title
        talk.intro = form.intro
        talk.tag = form.tag
        talk.photo = state.artimg
        state.talk = talk
        state.talks.unshift(talk)
        state.artimg = ''
    },
    removeGroupUser(state, user) {//移除小组成员
        state.Group.groups.forEach(el => {
            if (el.creatime == user.id) {
                el.user.splice(el.user.indexOf(user.per), 1)
                console.log(el)
            }

        })
    },
    updateusername(state, user) {//编辑群名片
        state.Group.groups.forEach(el => {
            if (el.creatime == user.id) {
                el.user.some(al => {
                    if (al.userid == user.perid) {
                        al.name = user.name
                        console.log(al)
                    }
                })
            }
        })
    },
    setadmin(state, user) {//设置管理员
        state.Group.groups.forEach(el => {
            if (el.creatime == user.id) {
                el.user.some(al => {
                    if (al.userid == user.perid) {
                        al.type = "管理员"
                        el.admin.push(al)
                        console.log(el)
                    }
                })
            }
        })
    },
    updateGroupMess(state, mess) {//更改小组信息
        state.Group.groups.forEach(el => {
            if (el.creatime == mess.id) {
                el.name = mess.name
                el.intro = mess.intro
                el.city = mess.city
                el.tab = mess.tab
                el.photo = mess.src
            }
        })
    },
    sendtell(state, tell) {//小组发送通知
        state.Group.groups.some(el => {
            if (el.creatime == tell.id) {
                el.tell = tell.content
                el.user.forEach(al => {
                    if (al.iftell) {
                        var n = { creatime: '', fromid: el.creatime, userid: al.userid, name: al.name, city: al.city, toid: al.name, content: tell.content, intro: '群公告', type: '群通知', sontype: '群公告', ifread: false }
                        let date = new Date();
                        let strDate = date
                            .toLocaleString()
                            .replace(/[年月]/g, "-")
                            .replace(/[日上下午]/g, "");
                        n.creatime = strDate
                        state.Notice.notices.unshift(n)
                    }
                })
            }

        })
    },
    iftell(state, tell) {//修改是否接受群通知
        state.Group.groups.some(el => {
            if (el.creatime == tell.id) {
                el.iftell = tell.telled
            }
        })
    },
    delGroup(state, user) {//退出群
        state.Group.groups.some(el => {
            if (el.creatime == user.id) {
                el.user.splice(el.user.indexOf(user.deluser), 1)
            }
        })
    },
    delGroupAdmin(state, user) {//管理员退出群
        state.Group.groups.some(el => {
            if (el.creatime == user.id) {
                el.admin.splice(el.user.indexOf(user.deluser), 1)
            }
        })
    },
    updateCreater(state, user) {//转让群主
        state.Group.groups.some(el => {
            if (el.creatime == user.id) {
                el.admin.some(al => {
                    if (al.name == user.admin.name) {
                        al.type = "群主"
                    } else if (al.name == user.oldadmin.name) {
                        al.type = "管理员"
                    }

                })
                el.user.some(al => {
                    if (al.name == user.admin.name) {
                        al.type = "群主"
                    } else if (al.name == user.oldadmin.name) {
                        al.type = "管理员"
                    }
                })
            }
        })
    },
    delcreater(state, user) {//群主退出
        state.Group.groups.some(el => {
            if (el.creatime == user.id) {
                el.admin.some(al => {
                    if (al.name == user.admin.name) {
                        el.admin.splice(el.admin.indexOf(al), 1)
                    }
                })
                el.user.some(al => {
                    if (al.name == user.admin.name) {
                        el.user.splice(el.admin.indexOf(al), 1)
                    }
                })
            }
        })
    },
    addGroup(state, user) {//加入小组
        let date = new Date();
        let strDate = date
            .toLocaleString()
            .replace(/[年月]/g, "-")
            .replace(/[日上下午]/g, "");
        var u = { intotime: '', userid: '', touxaing: '', name: '', city: '', intro: '', type: '成员', iftell: true }
        u.intotime = strDate
        u.userid = user.id
        state.Userlists.userlists.some(el => {
            if (el.name == user.id) {
                u.touxaing = el.touxaing
                u.name = el.name
                u.city = el.city
                u.intro = el.intro
            }
        })
        state.Group.groups.some(gl => {
            if (gl.creatime == user.groupid) {
                gl.user.push(u)
            }
        })
    },
    addNoticeFromGroup(state, list) {//发送申请通知给群主
        state.Notice.notices.unshift(list)
    },
    getMyNotices(state, userid) {//获取我的通知，已经被改
        state.Notice.mynotices = []
        state.Notice.notices.forEach(el => {
            if (el.toid == userid) {
                state.Notice.mynotices.push(el)
            }
        })
    },
    getMySystemNotices1(state, userid) {//获取我的通知新版
        state.Notice.mynotices1.system.Notice = []
        state.Notice.mynotices1.system.sixinNotice = []
        state.Notice.mynotices1.hudong.argueNotice = []
        state.Notice.mynotices1.hudong.hideNotice = []
        state.Notice.mynotices1.hudong.support = []
        state.Notice.mynotices1.hudong.likeNotice = []
        state.Notice.mynotices1.length = { argue: 0, like: 0, support: 0, hide: 0, sixin: 0, notice: 0 },
            state.Notice.notices.forEach(el => {
                if (el.toid == userid && (el.type == "系统通知" || el.type == "群通知")) {
                    if (!el.ifread) {
                        state.Notice.mynotices1.length.notice += 1
                    }
                    state.Notice.mynotices1.system.Notice.push(el)
                    console.log(el)
                } else if (el.toid == userid && el.type == "私信") {
                    if (!el.ifread) {
                        state.Notice.mynotices1.length.sixin += 1
                    }
                    state.Notice.mynotices1.system.sixinNotice.push(el)
                    console.log(el)
                } else if (el.toid == userid && el.type == "评论") {
                    if (!el.ifread) {
                        state.Notice.mynotices1.length.argue += 1
                    }
                    state.Notice.mynotices1.hudong.argueNotice.push(el)
                } else if (el.toid == userid && el.type == "收藏") {
                    if (!el.ifread) {
                        state.Notice.mynotices1.length.hide += 1
                    }
                    state.Notice.mynotices1.hudong.hideNotice.push(el)
                } else if (el.toid == userid && el.type == "支持") {
                    if (!el.ifread) {
                        state.Notice.mynotices1.length.support += 1
                    }
                    state.Notice.mynotices1.hudong.support.push(el)
                } else if (el.toid == userid && el.type == "喜欢") {
                    if (!el.ifread) {
                        state.Notice.mynotices1.length.like += 1
                    }
                    state.Notice.mynotices1.hudong.likeNotice.push(el)
                }
            })
    },
    setOneGroup(state, groupinfo) {//设置小组详情
        state.Group.oneGroup = groupinfo
    },
    clearOneGroup(state) {//清空上面设置
        state.Group.oneGroup = ''
    },
    addAct(state, act) {//添加活动，管理
        state.actLists.unshift(act)
    },
    addTalkFromAdmin(state, art) {//添加话题，管理
        state.talks.unshift(art)
    },
    addNoticeFromAdmin(state, notice) {//发布通知，管理
        state.Notice.notices.unshift(notice)
    },
    updateImgTagFromAdmin(state, img) {//更改图片类别，管理
        state.imgLists[img.i].tag = img.tag
    },
    imgToIndexFromAdmin(state, img) {//推荐图片到首页，管理
        state.imgLists.splice(img.i, 1)
        state.imgLists.unshift(img.list)
        
    },
    createGroup(state, form) {//创建小组
        state.Group.groups.unshift(form)
    },
    checkAdvice(state, i) {//是否回复意见，管理
        state.Notice.advices[i].ifcheck = true
    },
    sendAdviceFromUser(state, advice) {//发布意见
        state.Notice.advices.unshift(advice)
    },
    setSixin(state, s) {//设置私信
        state.Userlists.sixin = s
    },
    clearSixin(state) {//设置私信
        state.Userlists.sixin = null
    },
    sendSixin(state, s) {//发送私信
        state.Userlists.userMessages.some(el => {
            if (s.toid == el.username) {
                el.sixins.unshift(s.mess)
            }
        })
    },
    sendSixinNotice(state, n) {//发送私信通知
        state.Notice.notices.unshift(n)
    },
    sendArgueNotice(state, n) {//发送评论通知
        state.Notice.notices.unshift(n)
    },
    sendSupportNotice(state, n) {//发送打赏通知
        state.Notice.notices.unshift(n)
    },
    readNotice(state, read) {//是否已阅读过通知
        if (read.type == "system") {
            state.Notice.mynotices1.system.Notice.some(el => {
                if (el.creatime == read.id) {
                    el.ifread = true
                    state.Notice.mynotices1.length.notice--
                    var i = state.Notice.notices.indexOf(el)
                    state.Notice.notices[i].ifread = true
                }
            })
        } else if (read.type == "sixin") {
            state.Notice.mynotices1.system.sixinNotice.some(el => {
                if (el.creatime == read.id) {
                    el.ifread = true
                    state.Notice.mynotices1.length.sixin--
                    var i = state.Notice.notices.indexOf(el)
                    state.Notice.notices[i].ifread = true
                }
            })
        } else if (read.type == "argue") {
            state.Notice.mynotices1.hudong.argueNotice.some(el => {
                if (el.creatime == read.id) {
                    el.ifread = true
                    state.Notice.mynotices1.length.argue--
                    var i = state.Notice.notices.indexOf(el)
                    state.Notice.notices[i].ifread = true
                }
            })
        } else if (read.type == "like") {
            state.Notice.mynotices1.hudong.likeNotice.some(el => {
                if (el.creatime == read.id) {
                    el.ifread = true
                    state.Notice.mynotices1.length.like--
                    var i = state.Notice.notices.indexOf(el)
                    state.Notice.notices[i].ifread = true
                }
            })
        } else if (read.type == "hide") {
            state.Notice.mynotices1.hudong.hideNotice.some(el => {
                if (el.creatime == read.id) {
                    el.ifread = true
                    state.Notice.mynotices1.length.hide--
                    var i = state.Notice.notices.indexOf(el)
                    state.Notice.notices[i].ifread = true
                }
            })
        } else {
            state.Notice.mynotices1.hudong.support.some(el => {
                if (el.creatime == read.id) {
                    el.ifread = true
                    state.Notice.mynotices1.length.support--
                    var i = state.Notice.notices.indexOf(el)
                    state.Notice.notices[i].ifread = true
                }
            })
        }
    },
    getUserMess(state, id) {
        state.Userlists.oneUserMess = null
        state.Userlists.userMessages.some(el => {
            if (el.userid == id) {
                state.Userlists.oneUserMess = el
            }
        })
    },
    getMyMess(state, id) {
        state.Userlists.otherUserMess = null
        state.Userlists.userMessages.some(el => {
            if (el.userid == id) {
                state.Userlists.otherUserMess = el
            }
        })
    },
    getUserMess1(state, name) {
        state.Userlists.oneUserMess = null
        state.Userlists.userMessages.some(el => {
            if (el.username == name) {
                state.Userlists.oneUserMess = el
            }
        })
    },
    updateBcg(state, img) {
        state.Userlists.userMessages.some(el => {
            if (el.userid == img.id) {
                el.bcgphoto = img.photo
                state.Userlists.oneUserMess = el
                console.log(el)
            }
        })
    },
    nofocusUser(state, f) {
        state.Userlists.userMessages.some(el => {
            if (el.userid == f.id) {
                el.myfocus.splice(el.myfocus.indexOf(f.list), 1)
            }
        })
        state.Userlists.userMessages.some(el => {
            if (el.username == f.mylist.username) {
                el.myfans.splice(el.myfans.indexOf(f.mylist), 1)
            }
        })
    },
    setLocalIndex(state) {
        state.Userlists.local = false
    },
    focusUser(state, f) {
        state.Userlists.userMessages.forEach(el => {
            if (el.userid == f.id) {
                el.myfocus.unshift(f.list)
                el.myfocus = el.myfocus.slice(0, el.myfocus.length - 1)
            }
        })
        state.Userlists.userMessages.some(al => {
            if (al.userid == f.list.userid) {
                al.myfans.unshift(f.mylist)
                al.myfans = al.myfans.slice(0, al.myfans.length - 1)
            }
        })
    },
    queryAuthor(state, name) {
        state.Userlists.usercard = null
        state.Userlists.userMessages.some(el => {
            if (el.username == name) {
                state.Userlists.usercard = el
            }
        })
    },
    updateTouxiang(state, l) {
        state.Userlists.userMessages.some(el => {
            if (el.userid == l.id) {
                el.touxaing = l.photo
            }
        })
    },
    getNotice(state, n) {
        state.Userlists.userMessages.some(el => {
            if (el.userid == n) {
                el.ifnotice = !el.ifnotice
            }
        })
    },
    moneyUpload(state, n) {
        state.Userlists.userMessages.some(el => {
            if (el.userid == n) {
                el.moneyupload = !el.moneyupload
            }
        })
    },
    focusUpload(state, n) {
        state.Userlists.userMessages.some(el => {
            if (el.userid == n) {
                el.focusupload = !el.focusupload
            }
        })
    },
    ifFocusAuthor(state, u) {
        state.Userlists.userMessages.some(el => {
            if (el.userid == u.userid) {
                el.myfocus.some(al => {
                    if (al.userid == u.myid) {
                        state.Userlists.uploadImg = true
                    }
                })
            }
        })
    },
    backUser(state, l) {
        state.Userlists.userMessages.some(el => {
            if (el.userid == l.userid) {
                el.backs.unshift(l.list)
            }
        })
    },
    getInfo(state, i) {
        state.Query.queryInfo = i
        state.Query.queryPhoto = []
        state.Query.queryArt = []
        state.Query.queryAct = []
        state.Query.queryTalk = []
        state.Query.queryGroup = []
        state.Query.queryUser = []
        state.imgLists.some(el => {
            if (el.title.indexOf(i) != -1) {
                state.Query.queryPhoto.push(el)
            }
        })
        state.arts.some(el => {
            if (el.title.indexOf(i) != -1) {
                state.Query.queryArt.push(el)
            }
        })
        state.actLists.some(el => {
            if (el.title.indexOf(i) != -1) {
                state.Query.queryAct.push(el)
            }
        })
        state.talks.some(el => {
            if (el.title.indexOf(i) != -1) {
                state.Query.queryTalk.push(el)
            }
        })
        state.Group.groups.some(el => {
            if (el.name.indexOf(i) != -1) {
                state.Query.queryGroup.push(el)
            }
        })
        state.Userlists.userMessages.some(el => {
            if (el.username.indexOf(i) != -1) {
                state.Query.queryUser.push(el)
            }
        })
    },
    getMyFocusDyinfo(state, id) {
        console.log("获取我的关注")
        state.myfocusdyinfo=[]
        state.Userlists.userMessages.some(el => {
            if (el.userid == id) {
                el.myfocus.forEach(al => {
               
                    state.Userlists.userMessages.some(cl => {
                        if (cl.userid == al.userid) {
                            var nm = []
                            nm = cl.myphoto
                            nm = nm.concat(cl.myart)
                            state.myfocusdyinfo=nm
                        }
                    })
                })
            }
        })
        state.myfocusdyinfo.sort((a, b) => { return b.id - a.id })
    },
    setVip(state,u){
        state.Userlists.userMessages.some(el=>{
            if(el.userid==u){
                el.ifvip="VIP"
            }
        })
    }
}
const actions = {
    hideFoot(context) {
        context.commit('hide');
    },
    showFoot(context) {
        context.commit('show');
    },
    loginUser(context) {
        context.commit('login');
    },
    logoutUser(context) {
        context.commit('logout');
    },
    addImgList(context, form) {
        context.commit('addImg', form)
    },
    addArtList(context, form) {
        context.commit('addartlist', form)
    },
    addTalkList(context, form) {
        context.commit('addtalk', form)
    },
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;