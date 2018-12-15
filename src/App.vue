<template>
  <v-app>
    <v-toolbar app>
      <v-spacer />
      <v-toolbar-title class="headline text-uppercase font-weight-bold">
        <span class="rainbow">Colour memory</span>
      </v-toolbar-title>
      <v-spacer />
      <span class="headline">Your score: <span class="font-weight-bold">{{score}}</span></span>
      <v-spacer></v-spacer>
      

    </v-toolbar>

    <v-content class="mt-4">
      <Board />
    </v-content>
    <v-dialog v-model="dialog" persistent max-width="290">
      
      <v-card>
        <v-card-title class="headline">Game over</v-card-title>
        <v-card-text>Your final score was {{score}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="resetGame">Play again</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style>
.rainbow {
    background: red;
    background: -webkit-linear-gradient(left, orange , red, green, cyan, blue, violet);
    background: -o-linear-gradient(right, orange, red, green, cyan, blue, violet);
    background: -moz-linear-gradient(right, orange, red, green, cyan, blue, violet);
    background: linear-gradient(to right, orange , red, green, cyan, blue, violet);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>

<script>
import Board from './components/Board'
import store from './store/index'

export default {
  name: 'App',
  store,
  components: {
    Board
  },
  methods: {
    resetGame() {
      this.$store.commit('resetGame')
    }
  },
  computed: {
    score () {
      return this.$store.state.score
    },
    dialog () {
      return this.$store.getters.gameOver
    }
  }
}
</script>
