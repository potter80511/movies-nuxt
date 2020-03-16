<template>
  <b-modal
    id="new_film"
    modal-class="new_film"
    :title="`新增${filmsListType}`"
    ok-title="新增"
    cancel-title="取消"
    @ok="add_film_submit"
  >
    <div class="container">
      <div id="new_film_form">
        <div class="input-group">
          <label>劇名稱（原文）：</label>
          <input id="filmName" type="text" />
        </div>
        <div class="input-group">
          <label>劇名稱（中文）：</label>
          <input id="filmTwName" type="text" />
        </div>
        <div class="input-group" v-show="filmsListType === '影集'">
          <span
            :class="[endCheck ? isCheckedClass : '', 'endCheck-check label-check']"
            @click="endCheckHandler"
          >
          </span>
          <label>是否完結？</label>
        </div>
        <div class="input-group" v-show="filmsListType === '影集'">
          <label>首頁主圖連結：</label>
          <input id="indexBanner" type="text" />
        </div>
        <div class="input-group">
          <label>列表主圖連結：</label>
          <input id="listBanner" type="text" />
        </div>
        <div class="input-group" v-show="filmsListType === '電影'">
          <label>系列：</label>
          <input id="filmSeries" type="text" />
        </div>
        <div class="input-group">
          <span
            :class="[favoriteCheck ? isCheckedClass : '', 'favorite-check label-check']"
            @click="favoriteCheckHandler"
          >
          </span>
          <label>是否為最愛影劇？</label>
        </div>
        <div class="input-group">
          <label>IMDB 評分：</label>
          <input id="filmImdbRate" type="text" />
        </div>
        <div class="input-group film-area">
          <label>地區：</label>
          <div class="area-select">
            <select v-model="area">
              <option value="" selected hidden>請選擇</option>
              <option
                v-for="(area, i) in areaDatas"
                :value="area"
                :key="i"
              >{{area}}</option>
            </select>
            <font-awesome-icon icon="chevron-down" />
          </div>
        </div>
        <div class="input-group">
          <label>年份：</label>
          <input id="filmYear" type="text" />
        </div>
        <div class="input-group film-categories">
          <label>電影類型：</label>
          <div class="group">
            <div
              v-for="(categorieName, i) in categoriesName"
              :key="i"
            >
              <span
                :class="[categorieName.checked ? isCheckedClass : '', 'category-check label-check']"
                @click="categoiesCheckedHandler(categorieName.id)"
              >
              </span>
              <label>{{ categorieName.name }}</label>
            </div>
          </div>
        </div>
        <div class="input-group">
          <label>電影簡述：</label>
          <input id="filmBrief" type="textarea" />
        </div>
        <div class="input-group">
          <label>導演：</label>
          <input id="filmDirector" type="text" />
        </div>
        <div class="input-group cast">
          <div class="group">
            <label>演員</label>
            <font-awesome-icon icon="plus" @click="addCastHandler" />
          </div>
          <div v-if="castInputs.length > 0">
            <div
              v-for="(castInput, i) in castInputs"
              :key="i"
            >
              <input
                :id="`cast_${castInput.id}`"
                type="text"
                v-model="castInput.castName"
              />
              <font-awesome-icon icon="times" @click="deleteCastHandler(castInput.id, i)" />
            </div>
          </div>
        </div>
        <div class="input-group">
          <label>IMDB ID：</label>
          <input id="filmImdbId" type="text" />
        </div>
        <div class="input-group">
          <label>我的評分：</label>
          <input id="filmMyRate" type="text" />
        </div>
        <div class="input-group">
          <label>劇情大綱：</label>
          <input id="filmSummary" type="textarea" />
        </div>
        <div class="input-group">
          <label>預告ID：</label>
          <input id="filmTrailer" type="text" />
        </div>
        <div class="input-group">
          <label>海報連結：</label>
          <input id="filmWallpaper" type="text" />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>

export default {
  props: {
    filmsListType: {
      type: String,
    },
    add_film: {
      type: Function,
    },
  },
  data () {
    return {
      favoriteCheck: false,
      endCheck: false,
      isCheckedClass: 'is-checked',
      areaDatas: [
        '美國',
        '英國',
        '韓國',
        '泰國',
        '日本',
        '印度',
        '西班牙'
      ],
      castInputs: [],
      categoriesName: [
        {
          id: '01',
          name: '動作',
          checked: false,
        },
        {
          id: '02',
          name: '犯罪',
          checked: false,
        },
        {
          id: '03',
          name: '愛情',
          checked: false,
        },
        {
          id: '04',
          name: '科幻',
          checked: false,
        },
        {
          id: '05',
          name: '驚悚',
          checked: false,
        },
        {
          id: '06',
          name: '恐怖',
          checked: false,
        },
        {
          id: '07',
          name: '劇情',
          checked: false,
        },
        {
          id: '08',
          name: '喜劇',
          checked: false,
        },
        {
          id: '09',
          name: '家庭',
          checked: false,
        },
        {
          id: '10',
          name: '戰爭',
          checked: false,
        },
        {
          id: '11',
          name: '傳記',
          checked: false,
        },
        {
          id: '12',
          name: '動畫',
          checked: false,
        },
        {
          id: '13',
          name: '音樂',
          checked: false,
        },
        {
          id: '14',
          name: '奇幻',
          checked: false,
        },
        {
          id: '15',
          name: '溫馨',
          checked: false,
        },
      ],
    }
  },
  methods: {
    addCastHandler() {
      const castInputs = this.castInputs;
      const castInputId = castInputs.length + 1;
      castInputs.push({
        id: castInputId
      });
    },
    deleteCastHandler(id, inputIndex) {
      const castInputs = this.castInputs;
      castInputs.splice(inputIndex, 1);
      castInputs.forEach((item, index) => {
        item.id = index + 1;
      });
    },
    endCheckHandler() {
      this.endCheck = !this.endCheck;
    },
    favoriteCheckHandler() {
      this.favoriteCheck = !this.favoriteCheck;
    },
    categoiesCheckedHandler(id) {
      const categoriesName = this.categoriesName;
      categoriesName.forEach(item => {
        if(item.id === id) {
          item.checked = !item.checked
        }
      });
    },
    add_film_submit() {
      const {
        area,
        filmsListType,
        castInputs,
        categoriesName,
      } = this;

      let name = document.getElementById("filmName").value;
      let twName = document.getElementById("filmTwName").value;
      const stll = !this.endCheck;
      let favorite = this.favoriteCheck;

      let indexBannerLink = "";
      indexBannerLink = filmsListType === '影集' ? document.getElementById("indexBanner").value : "";
      const listBannerLink = document.getElementById("listBanner").value;

      let related = document.getElementById("filmSeries").value;
      let imdbRate = document.getElementById("filmImdbRate").value;
      let brief = document.getElementById("filmBrief").value;
      let director = document.getElementById("filmDirector").value;

      let castNameArray = [];
      castInputs.forEach((item, index) => {  // 先做出[{01: a}, {02: b}]
        let keyName = 0;
        if (index < 9) {
          keyName = '0' + (index + 1);
        } else {
          keyName = index + 1;
        }
        castNameArray.push({
          [keyName]: item.castName
        });
      });
      const filmCasts = castNameArray.reduce((result, item) => { // 再轉成{01:a, 02:b}
        const key = Object.keys(item)[0]; // key name 01, 02, ...
        result[key] = item[key];
        return result;
      }, {});
      // result是前一個（初始為空物件{}），item是當前
      // 原本長這樣[{01: a}, {02: b}]
      // 第一次 Object.keys(item) = ['01']，所以const key = '01'
      // result 原本是 {}，result['01'] = item['01']就是 a ，所以就變成{'01': a,}
      // 第二次 Object.keys(item) = ['02']，所以const key = '02'
      // result 原本是 {'01': a,}，result['02'] = item['02']就是 b ，所以就變成{'01': a,'02': b,}

      let imdbId = document.getElementById("filmImdbId").value;
      let myRate = document.getElementById("filmMyRate").value;
      let summary = document.getElementById("filmSummary").value;
      let trailer = document.getElementById("filmTrailer").value;

      const type = filmsListType === '影集' ? 'series' : 'movies';

      let wallpaper = document.getElementById("filmWallpaper").value;
      let year = document.getElementById("filmYear").value;

      const checkedCategories = categoriesName.filter(item => ( // 先篩選被勾選的
        item.checked === true
      )).map(item => { //再組出[{01: name1}, {02: name2}]
        const id = item.id;
        return {
          [id]: item.name,
        }
      });
      const filmCategories = checkedCategories.reduce((result, item) => { // 再轉成{01:name1, 02:name2}
        const key = Object.keys(item)[0]; // key name 01, 02, ...
        result[key] = item[key];
        return result;
      }, {});
      // console.log(area);

      const newFilmData = {
        area,
        brief: brief,
        cast: filmCasts,
        categories: filmCategories,
        director,
        imdb_id: imdbId,
        index_banner: indexBannerLink,
        list_banner: listBannerLink,
        name,
        rates: Number(imdbRate),
        related,
        favorite,
        tw_name: twName,
        type,
        my_rate: Number(myRate),
        stll,
        summary,
        trailer,
        wallpaper,
        year: Number(year),
      };

      this.$emit('add_film_submit', newFilmData);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/new_film.scss";
</style>
