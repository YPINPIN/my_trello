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
    },
    REPLACE_CARD(state, card) {
      let list_index = state.lists.findIndex(list => list.id == card.list_id);
      let card_index = state.lists[list_index].cards.findIndex(item => item.id == card.id);
      state.lists[list_index].cards.splice(card_index, 1, card);
    },
    ADD_LIST(state, list) {
      state.lists.push(list);
    },
    REMOVE_LIST(state, removeList) {
      let list_index = state.lists.findIndex(list => list.id == removeList.id);
      state.lists.splice(list_index, 1);
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
    },
    updateCard({ commit }, { id, name }) {
      let data = new FormData();
      data.append("card[name]", name)

      Rails.ajax({
        // /cards/2
        url: `/cards/${id}`,
        type: 'PUT',
        data,
        dataType: 'json',
        error: err => {
          console.log(err)
        }
      })
    },
    createList({ commit }, list_name) {
      let data = new FormData();
      data.append("list[name]", list_name)

      Rails.ajax({
        // /lists
        url: `/lists`,
        type: 'POST',
        data,
        dataType: 'json',
        error: err => {
          console.log(err)
        }
      })
    },
    removeList({ commit }, list_id) {
      Rails.ajax({
        // /lists
        url: `/lists/${list_id}`,
        type: 'DELETE',
        dataType: 'json',
        error: err => {
          console.log(err)
        }
      })
    }
  }
})

export default store;