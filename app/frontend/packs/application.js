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

document.addEventListener("turbolinks:load", function (event) {
  let el = document.querySelector('#board');
  if (el) {
    const app = createApp({
      data() {
        return {
          lists: []
        }
      },
      components: {
        List,
        draggable
      },
      methods: {
        listMoved(event) {
          console.log(event)

          let data = new FormData();
          data.append("list[position]", event.moved.newIndex + 1)

          Rails.ajax({
            // /lists/2/move
            url: `/lists/${this.lists[event.moved.newIndex].id}/move`,
            type: 'PUT',
            data,
            dataType: 'json',
            success: resp => {
              console.log(resp)
            },
            error: err => {
              console.log(err)
            }
          })
        }
      },
      beforeMount() {
        Rails.ajax({
          url: `/lists.json`,
          type: 'GET',
          dataType: 'json',
          success: resp => {
            this.lists = resp;
          },
          error: err => {
            console.log(err)
          }
        })
      }
    });

    app.mount('#board');
  }
})
