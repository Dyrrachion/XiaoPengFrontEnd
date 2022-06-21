import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import register from "../components/register";
import mainNav from "../components/mainNav";
import docStudy from "../components/docStudy"
import selfPractise from "../components/selfPractise"
import aiPractise from "../components/aiPractise"
import userInfo from "../components/userInfo"
import selfPractiseResult from "../components/selfPractiseResult";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/main',
      name: 'main',
      component: mainNav,
      children: [
        {
          path: '/docStudy',
          name: 'docStudy',
          component: docStudy
        },
        {
          path: '/selfPractise',
          name: 'selfPractise',
          component: selfPractise
        },
        {
          path: '/aiPractise',
          name: 'aiPractise',
          component: aiPractise
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          component: userInfo
        },
        {
          path: '/selfPractiseResult',
          name: 'selfPractiseResult',
          component: selfPractiseResult
        }
      ]
    },
  ]
})
