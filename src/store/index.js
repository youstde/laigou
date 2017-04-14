import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource)

const state = {
  appKey: '',
  adTag: '',
  currentTab: '',
  popupShow: false,
  isWeiXin: false,
  wxIos: false,
  wxAndroid: false,
  isShowNotice: false,
  isHiddenNav: false,
  nav: {
    status: true,
    number: 0,
    data: []
  },
  channel: {
    data: {}
  },
  category: {
    data: {}
  },
  topic: {
    data: {}
  }
};

const getters = {
  appKey: state => state.appKey,
  adTag: state => state.adTag,
  currentTab: state => state.currentTab,
  popupShow: state => state.popupShow,
  nav: state => state.nav,
  channel: state => state.channel,
  category: state => state.category,
  topic: state=> state.topic,
  isWeiXin: state => state.isWeiXin,
  isHiddenNav: state => state.isHiddenNav
};

const mutations =  {
  setAppKey (state, appKey) {
    state.appKey = appKey;
  },
  setAdTag (state, adTag) {
    state.adTag = adTag;
  },
  setCurrentTab (state, tab) {
    state.currentTab = tab;
  },
  setPopupShow (state, status) {
    state.popupShow = status;
  },
  setNavStatus (state, status) {
    state.nav.status =  status;
  },
  setNavData (state, data) {
    state.nav.data = data;
  },
  setChannelData (state, data) {
    state.channel.data = data;
  },
  setNavNumber (state, number) {
    state.nav.number = number;
  },
  SET_ISWEIXIN(state, payload){
    state.isWeiXin = payload.iswx
  },
  SET_IS_SHOW_NOTICE(state, payload){
    state.isShowNotice = payload.iswx
  },
  SET_IS_HIDDEN_NAV(state, payload){
    state.isHiddenNav = payload;
  },
};

const actions = {
  setIsWeiXin({commit}, iswx){
    commit('SET_ISWEIXIN', {iswx: iswx});
  },
  setIsShowNotice({commit}, iswx){
    commit('SET_IS_SHOW_NOTICE', {iswx: iswx});
  },
  setIsHiddenNav({commit}, isHidden){
    commit('SET_IS_HIDDEN_NAV', isHidden);
  },
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
