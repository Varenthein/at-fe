import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

const apiUrl = 'https://cors-anywhere.herokuapp.com/https://ta-ebookrental-be.herokuapp.com'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    titles: [],
    items: [],
    rents: []
  },
  mutations: {
    updateState (state, { key, val }) {
      state[key] = val
    },
    removeListElem (state, { list, id }) {
      state[list] = state[list].filter(item => item.id !== id)
    },
    addListElem (state, { list, data }) {
      state[list].push(data)
    },
    updateListElem (state, { list, id, data }) {
      state[list] = state[list].map(item => item.id === id ? data : item)
    }
  },
  actions: {
    async login ({ commit }, { login, password }) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.post(`${apiUrl}/user/login`, { login, password })

          if (resp.data === -1) reject(new Error('Login failed'))
          else {
            commit('updateState', { key: 'userId', val: resp.data })
            resolve()
          }
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async register ({ commit }, { login, password }) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.post(`${apiUrl}/user/register`, { login, password })
          if (resp.data.new) resolve()
          else if (resp.data.id) reject(new Error('This user already exist!'))
          else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async fetchTitles ({ state, commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.get(`${apiUrl}/titles/?userId=${state.userId}`)
          commit('updateState', { key: 'titles', val: resp.data })
          resolve()
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async removeTitleRequest ({ state, commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.delete(`${apiUrl}/titles/?userId=${state.userId}&id=${id}`, { body: { userId: state.userId, id } })
          if (resp.data) {
            commit('removeListElem', { list: 'titles', id })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error('You can\'t remove titles with copies!'))
        }
      })
    },

    async addTitleRequest ({ state, commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.post(`${apiUrl}/titles/`, { userId: state.userId, ...data })
          if (resp.data) {
            commit('addListElem', { list: 'titles', data: { ...data, id: resp.data } })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async updateTitleRequest ({ state, commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.put(`${apiUrl}/titles/`, { userId: state.userId, ...data })
          if (resp.data) {
            commit('updateListElem', { list: 'titles', id: data.id, data: { ...resp.data } })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async fetchItems ({ state, commit }, titleId) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!state.userId) return false
          const resp = await Axios.get(`${apiUrl}/items/?userId=${state.userId}&titleId=${titleId}`)
          commit('updateState', { key: 'items', val: resp.data })
          resolve()
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async removeItemRequest ({ state, commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.delete(`${apiUrl}/items/?userId=${state.userId}&id=${id}`)
          if (resp.data) {
            commit('removeListElem', { list: 'items', id })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error('You can\'t remove copy with the rents history!'))
        }
      })
    },

    async addItemRequest ({ state, commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const { titleId, purchaseDate, status } = data
          const resp = await Axios.post(`${apiUrl}/items/`, { userId: state.userId, titleId, purchaseDate })
          if (resp.data) {
            commit('addListElem', { list: 'items', data: { purchaseDate, status, id: resp.data } })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async updateItemRequest ({ state, commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.put(`${apiUrl}/items/`, { userId: state.userId, id: data.id, purchaseDate: data.purchaseDate })
          if (resp.data) {
            commit('updateListElem', { list: 'items', id: data.id, data: { ...data, ...resp.data } })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async fetchRents ({ state, commit }, titleId) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.get(`${apiUrl}/rents/?userId=${state.userId}&itemId=${titleId}`)
          commit('updateState', { key: 'rents', val: resp.data })
          resolve()
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async removeRentRequest ({ state, commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await Axios.delete(`${apiUrl}/rents/?userId=${state.userId}&id=${id}`)
          if (resp.data) {
            commit('removeListElem', { list: 'rents', id })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async addRentRequest ({ state, commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const { itemId, rentDate, customerName } = data
          const resp = await Axios.post(`${apiUrl}/rents/`, { userId: state.userId, itemId, rentDate, customerName })
          if (resp.data) {
            commit('addListElem', { list: 'rents', data: { ...data, id: resp.data } })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    },

    async updateRentRequest ({ state, commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const { id, customerName, rentDate, expirationDate } = data
          const resp = await Axios.put(`${apiUrl}/rents/`, { userId: state.userId, id, customerName, rentDate, expirationDate })
          if (resp.data) {
            commit('updateListElem', { list: 'rents', id: data.id, data: { ...resp.data } })
            resolve()
          } else reject(new Error('Something went wrong...'))
        } catch (err) {
          reject(new Error(err.message))
        }
      })
    }

  }

})
