import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import '../scripts'
import '../styles'

const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

Rails.start()
Turbolinks.start()
ActiveStorage.start()

// vue.js

import { createApp } from 'vue/dist/vue.esm-bundler'
import List from 'components/list';
import draggable from 'vuedraggable';
import store from 'stores/list';
import { mapGetters, mapActions } from 'vuex'

document.addEventListener("turbolinks:load", function (event) {
  let el = document.querySelector('#board');
  if (el) {
    const app = createApp({
      computed: {
        // ...mapGetters(['lists'])
        lists: {
          get() {
            return this.$store.state.lists;
          },
          set(value) {
            this.$store.commit('UPDATE_LISTS', value)
          }
        }
      },
      components: {
        List,
        draggable
      },
      methods: {
        ...mapActions(['loadList', 'moveList']),
      },
      beforeMount() {
        this.loadList();
      }
    });

    app.use(store)

    app.mount('#board');
  }
})
