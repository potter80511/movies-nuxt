<template>
  <header id="header">
    <div class="h_wrap">
      <div class="logo">
        <nuxt-link
          to="/"
          class="navbarLink"
        >
          <span>My</span>
          <strong>IMDB</strong>
        </nuxt-link>
      </div>
      <div class="menu">
        <div class="main_nav desktop">
          <nuxt-link
            to="/"
          >
            HOME
          </nuxt-link>
          <nuxt-link
            to="/movies"
          >
            Movies
          </nuxt-link>
          <nuxt-link
            to="/series"
          >
            Series
          </nuxt-link>
        </div>
        <font-awesome-icon icon="bars" ref="menuBar" />
      </div>
    </div>
    <div class="mobile" ref="mobile">
      <div class="mobile_block" ref="mobile_block"></div>
      <div class="mobile_menu">
        <div class="main_nav">
          <nuxt-link
              to="/"
              class="navbarLink"
            >
              HOME
          </nuxt-link>
          <nuxt-link
            to="/movies"
            class="navbarLink"
          >
            Movies
          </nuxt-link>
          <nuxt-link
            to="/series"
            class="navbarLink"
          >
            Series
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    mounted() {
      if(document.body.clientWidth > 991) {
        document.addEventListener('scroll', () => {
          if(window.pageYOffset > 0) {
            document.getElementById('header').classList.add("onScrolled");
          } else {
            document.getElementById('header').classList.remove("onScrolled");
          }
        })
      }
      let mobileOn = false;
      this.$refs.menuBar.addEventListener('click', () => {
        mobileOn = !mobileOn;
        switch(mobileOn) {
          case true:
            this.$refs.mobile.classList.add("draw_in");
            break;
          case false:
            this.$refs.mobile.classList.remove("draw_in");
            break;
        }
      });
      this.$refs.mobile_block.addEventListener('click', () => {
        this.$refs.mobile.classList.remove("draw_in");
        mobileOn = false;
      });

      let navbarLink = document.getElementsByClassName('navbarLink')
      for(let i = 0; i < navbarLink.length; i++) {
        navbarLink[i].addEventListener('click', () => {
          this.$refs.mobile.classList.remove("draw_in");
          mobileOn = false;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/header.scss";
</style>
