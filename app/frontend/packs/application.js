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


document.addEventListener("turbolinks:load", function (event) {
  let el = document.querySelector('#board');
  if (el) {
    const app = createApp({
      data() {
        return {
          lists: JSON.parse(el.dataset.lists)
        }
      },
      components: {
        List
      }
    });

    app.mount('#board');
  }
})
