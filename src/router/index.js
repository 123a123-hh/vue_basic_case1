import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/main.vue'
import welcome from '../components/welcome.vue'
import userM from '../components/userM.vue'
import about from '../components/about.vue'
import adM from '../components/adM.vue'
import centerM from '../components/centerM.vue'
import powerM from '../components/power/powerM.vue'
import roleM from '../components/roleM.vue'
import wordM from '../components/wordM.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/mainpage' },
  {
    path: '/mainpage',
    component: Main,
    redirect: '/mainpage/1',
    children: [
      { path: '/mainpage/welcome', component: welcome },
      { path: '/mainpage/1', component: userM },
      { path: '/mainpage/2', component: powerM },
      { path: '/mainpage/3', component: roleM },
      { path: '/mainpage/4', component: centerM },
      { path: '/mainpage/5', component: adM },
      { path: '/mainpage/6', component: wordM },
      { path: '/mainpage/7', component: about }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
