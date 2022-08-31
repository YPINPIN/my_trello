import { createStore } from 'vuex'
import Rails from "@rails/ujs"

const store = createStore({
  state: {
    lists: []
  },
  getters: {
    lists: state => state.lists
  },
  mutations: {
    UPDATE_LISTS(state, lists) {
      state.lists = lists;
    }
  },
  actions: {
    loadList({ commit }) {
      Rails.ajax({
        url: `/lists.json`,
        type: 'GET',
        dataType: 'json',
        success: resp => {
          commit('UPDATE_LISTS', resp);
        },
        error: err => {
          console.log(err)
        }
      })
    },
    moveList({ commit, state }, event) {
      let data = new FormData();
      data.append("list[position]", event.moved.newIndex + 1)

      Rails.ajax({
        // /lists/2/move
        url: `/lists/${state.lists[event.moved.newIndex].id}/move`,
        type: 'PUT',
        data,
        dataType: 'json'
      })
    }
  }
})

export default store;