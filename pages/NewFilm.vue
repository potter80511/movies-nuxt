<template>
  <div id="new_film">
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
        <div class="input-group">
          <label>劇種類：</label>
          <input id="filmType" type="text" />
        </div>
        <div class="input-group">
          <span
            :class="[favoriteCheck ? isCheckedClass : '', 'favorite-check']"
            @click="favoriteCheckHandler"
          >
          </span>
          <label>是否為最愛影劇？</label>
        </div>
        <div class="input-group">
          <label>IMDB 評分：</label>
          <input id="filmImdbRate" type="text" />
        </div>
        <div class="input-group">
          <label>地區：</label>
          <input id="filmArea" type="text" />
        </div>
        <div class="input-group">
          <label>年份：</label>
          <input id="filmYear" type="text" />
        </div>
        <div class="input-group">
          <label>電影簡述：</label>
          <input id="filmBrief" type="textarea" />
        </div>
        <div class="input-group">
          <label>導演：</label>
          <input id="filmDirector" type="text" />
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
        <div class="submit">
          <!-- <input type="submit" value="新增" @click="add_film" /> -->
          <button @click="add_film">新增</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  data () {
    return {
      maxKey: 0,
      nextKey: 0,
      favoriteCheck: false,
      isCheckedClass: 'is-checked',
    }
  },
  created() {
    this.$store.dispatch('loadedAllFilmsKeys')
  },
  mounted() {
    // console.log('060', Number('060'))
    // console.log(this.$store.getters.allFilmsKeys)
  },
  computed: {
    allFilmsKeys() {
      return this.$store.getters.allFilmsKeys
    }
  },
  watch: {
    allFilmsKeys(keys) {
      if(keys) {
        keys.forEach(item => {
          this.maxKey = item > this.maxKey ? item : this.maxKey
        });
        this.nextKey = this.maxKey + 1;
        if (this.nextKey < 100) {
          this.nextKey = "0" + String(this.nextKey)
        }
      }
    }
  },
  methods: {
    favoriteCheckHandler() {
      this.favoriteCheck = !this.favoriteCheck;
    },
    add_film() {
      const nextKey = this.nextKey;

      let name = document.getElementById("filmName").value;
      let twName = document.getElementById("filmTwName").value;
      let favorite = this.favoriteCheck;
      let type = document.getElementById("filmType").value;
      let imdbRate = document.getElementById("filmImdbRate").value;
      let area = document.getElementById("filmArea").value;
      let brief = document.getElementById("filmBrief").value;
      let director = document.getElementById("filmDirector").value;
      let imdbId = document.getElementById("filmImdbId").value;
      let myRate = document.getElementById("filmMyRate").value;
      let summary = document.getElementById("filmSummary").value;
      let trailer = document.getElementById("filmTrailer").value;
      let wallpaper = document.getElementById("filmWallpaper").value;
      let year = document.getElementById("filmYear").value;
      // console.log(favorite)

      firebase.database().ref(`movies/${nextKey}`).set({
        area: area,
        brief: brief,
        director: director,
        imdb_id: imdbId,
        name: name,
        rates: Number(imdbRate),
        favorite: favorite,
        tw_name: twName,
        type,
        my_rate: Number(myRate),
        summary,
        trailer,
        wallpaper,
        year: Number(year),
      }).then(() => {
        alert('success');
      }).catch(() => {
        alert('error');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  #new_film {
    margin-top: 130px;
    #new_film_form {
      .input-group {
        .favorite-check {
          width: 22px;
          height: 22px;
          display: inline-block;
          background: #555;
          border: 1px solid #111;
          border-radius: 2px;
          margin-right: 10px;
          cursor: pointer;
          transition: all .3s;
          &:before {
            content: '';
            display: block;
            border: solid #fff;
            border-width: 2px 0 0 2px;
            width: 8px;
            height: 14px;
            transform: rotate(225deg) translate(-5px, 3px);
            opacity: 0;
            transition: all .3s;
          }
          &.is-checked {
            background: #333;
            border-color: #d0a554;
            &:before {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
