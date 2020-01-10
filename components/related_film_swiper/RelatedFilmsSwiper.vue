<template>
  <swiper
    :options="relatedSwiperOpitons"
    v-if="relatedData.length > 0"
  >
    <swiper-slide
      v-for="(related, i) in relatedData"
      :key="i"
      class="item">
      <img :src="related.wallpaper" />
      <a :href="'/film_details/' + related.imdb_id">
        <span>{{related.tw_name}}</span>
      </a>
    </swiper-slide>
    <div class="swiper-button-prev swiper-button" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button" slot="button-next"></div>
  </swiper>
</template>

<script>
  export default {
    props: {
      relatedData: {
        type: Array,
      },
      blockClass: {
        type: String,
      }
    },
    data() {
      return {
        relatedSwiperOpitons: {
          slidesPerView: 6,
          spaceBetween: 30,
          speed: 800,
          // autoplay: {
          //   delay: 4000,
          //   disableOnInteraction: false,
          // },
          breakpoints: {
            1199: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
          },
          navigation: {
            nextEl: '.' + this.blockClass + ' .swiper-button-next',
            prevEl: '.' + this.blockClass + ' .swiper-button-prev',
          }
        },
      }
    }
  }
</script>