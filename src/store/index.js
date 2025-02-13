import Vue from "vue";
import Vuex from "vuex";
import PlayerService from "@/services/PlayerService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: "",
    loading: true,
    team: [],
    pick: "1",
    netADP: "1",
    adpGroup: [],
    selectedPlayer: "",
  },
  getters: {
    playerLength: (state) => {
      return state.players.length;
    },
    getPlayers: (state) => {
      return state.players;
    },
    isLoading: (state) => {
      return state.loading;
    },
    showTeam: (state) => {
      return state.team;
    },
    showPick: (state) => {
      return state.pick;
    },
    showNetADP: (state) => {
      return state.netADP;
    },
    showAdpGroup: (state) => {
      return state.adpGroup;
    },
    selectedPlayer: (state) => {
      return state.selectedPlayer;
    },
  },
  mutations: {
    //update players in the store
    SET_PLAYERS(state, payload) {
      state.players = payload;
    },
    //update loading
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    //update netADP value
    SET_NETADP(state, payload) {
      state.netADP = payload;
    },
    //add player to team array
    ADD_ADP_TO_GROUP(state, payload) {
      state.adpGroup.push(payload);
    },
    //add player to team array
    ADD_PLAYER(state, payload) {
      state.team.push(payload);
    },
    INCREASE_PICK(state) {
      state.pick++;
    },
    //update netADP value
    SET_SELECTEDPLAYER(state, payload) {
      state.selectedPlayer = payload;
    },
  },
  actions: {
    fetchPlayers({ commit }) {
      PlayerService.getPlayers()
        .then((response) => {
          commit("SET_PLAYERS", response.data);
          commit("SET_LOADING", false);
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    setLoading({ commit }, payload) {
      commit("SET_LOADING", payload);
    },
    addPlayer({ commit }, payload) {
      commit("ADD_PLAYER", payload);
    },
    removePlayer({ commit, state }, player) {
      let remList = state.players.filter((singlePlayer) => {
        return singlePlayer.PlayerID !== player.PlayerID;
      });
      console.log("added", remList);
      commit("SET_PLAYERS", remList);
    },
    increasePick({ commit }) {
      commit("INCREASE_PICK");
    },
    setNetADP({ commit }, payload) {
      commit("SET_NETADP", payload);
    },
    setSelectedPlayer({ commit }, payload) {
      commit("SET_SELECTEDPLAYER", payload);
    },
    addADP({ commit }, payload) {
      const newAdp = parseFloat(payload);
      commit("ADD_ADP_TO_GROUP", newAdp);
    },
  },
  modules: {},
});
