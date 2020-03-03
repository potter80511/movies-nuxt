import Vuex from 'vuex';
import * as firebase from 'firebase';

const createStore = () => {
  return new Vuex.Store({
    state: {
      movies: [],
      series: [],
      currentFilm: null,
      allFilmsKeys: [],
    },
    mutations: { //更改狀態
      setLoadedMovies(state, payload) {
        state.movies = payload
      },
      setLoadedSeries(state, payload) {
        state.series = payload
      },
      setCurrentFilm(state, payload) {
        state.currentFilm = payload
      },
      setAllFilmsKeys(state, payload) {
        state.allFilmsKeys = payload
      },
    },
    actions: {
      loadedMovies({commit}) {
        firebase.database().ref('movies').orderByChild('type').equalTo('movies').once('value')
          .then((data) => {
            const movies = []
            const obj = data.val()

            for (let key in obj) {
              movies.push({
                id: key,
                area: obj[key].area,
                name: obj[key].name,
                brief: obj[key].brief,
                categories: obj[key].categories,
                cast: obj[key].cast,
                director: obj[key].director,
                wallpaper: obj[key].wallpaper,
                rates: obj[key].rates,
                related: obj[key].related,
                favorite: obj[key].favorite,
                my_rate: obj[key].my_rate,
                imdb_id: obj[key].imdb_id,
                tw_name: obj[key].tw_name,
                type: obj[key].type,
                list_banner: obj[key].list_banner,
                year: obj[key].year,
              })
            }
            // console.log(movies, 'store')
            commit('setLoadedMovies', movies)
          })
      },
      loadedSeries({commit}) {
        firebase.database().ref('movies').orderByChild('type').equalTo('series').once('value')
          .then((data) => {
            const series = []
            const obj = data.val()

            for (let key in obj) {
              series.push({
                id: key,
                name: obj[key].name,
                area: obj[key].area,
                brief: obj[key].brief,
                categories: obj[key].categories,
                cast: obj[key].cast,
                wallpaper: obj[key].wallpaper,
                rates: obj[key].rates,
                favorite: obj[key].favorite,
                my_rate: obj[key].my_rate,
                index_banner: obj[key].index_banner,
                banner: obj[key].banner,
                imdb_id: obj[key].imdb_id,
                tw_name: obj[key].tw_name,
                type: obj[key].type,
                list_banner: obj[key].list_banner,
                writers: obj[key].writers,
                year: obj[key].year,
              })
            }
            // console.log(series, 'store')
            commit('setLoadedSeries', series)
          })
      },
      loadedFilm({commit}, imdb_id) {
        firebase.database().ref('movies').orderByChild('imdb_id').equalTo(imdb_id).once('value')
          .then((data) => {
            const obj = data.val()
            const film_data = obj[Object.keys(obj)[0]]

            commit('setCurrentFilm', film_data)
          })
      },
      loadedAllFilmsKeys({commit}) {
        firebase.database().ref('movies').once('value')
          .then((data) => {
            const filmKeys = []
            const obj = data.val()

            for (let key in obj) {
              filmKeys.push(
                Number(key)
              )
            }
            commit('setAllFilmsKeys', filmKeys)
          })
      },
    },
    getters: {
      filterFavoriteMovies(state) {
        const filterData = state.movies.filter((o) => {
          return o.favorite === true
        });
        return filterData;
      },
      filterFavoriteSeries(state) {
        const filterData = state.series.filter((o) => {
          return o.favorite === true
        });
        return filterData;
      },
      filterIndexBanner(state) {
        const filterData = state.series.filter((o) => {
          // console.log(o.index_banner)
          return o.index_banner === true
        });
        const bannerArray = filterData.map((obj)=> {
          return obj.banner
        })
        return bannerArray;
      },
      moviesBanner(state) {
        const filterData = state.movies.filter((o) => {
          // console.log(o.list_banner)
          return o.list_banner !== undefined
        });
        const bannerArray = filterData.map((obj)=> {
          return obj.list_banner
        })
        return bannerArray;
      },
      seriesBanner(state) {
        const filterData = state.series.filter((o) => {
          // console.log(o.list_banner)
          return o.list_banner !== undefined
        });
        const bannerArray = filterData.map((obj)=> {
          return obj.list_banner
        })
        return bannerArray;
      },
      allFilmsKeys(state) {
        return state.allFilmsKeys;
      }
    }
  })
}

export default createStore;