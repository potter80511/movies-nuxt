const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/MyImdb/',
    extendRoutes (routes) {
      routes.push({name: 'movies', path: '/movies', component: '~/pages/Films.vue'})
      routes.push({name: 'series', path: '/series', component: '~/pages/Films.vue'})
    }
  }
} : {
  router: {
    extendRoutes (routes) {
      routes.push({name: 'movies', path: '/movies', component: '~/pages/Films.vue'})
      routes.push({name: 'series', path: '/series', component: '~/pages/Films.vue'})
    }
  },
}

export default {
  mode: 'universal',
  ...routerBase,
  /*
  ** Headers of the page
  */
  head: {
    title: 'My IMDB',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: "swiper/dist/css/swiper.css" }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/font-awesome'},
    {src: '~/plugins/firebase'},
    {src: '~/plugins/helper'},
    {src: '~/plugins/vue-swiper', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome',
  ],
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      },
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
}
