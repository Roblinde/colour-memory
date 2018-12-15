<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex
              v-for="(card, index) in cards"
              :key="index"
              xs3
              d-flex
            >
              <Card @click.native="flipCard(index)" :color="card.color" :flipped="card.flipped"  :claimed="card.claimed" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :color="colorValue"
      :timeout=1500
      :top=true
      :right=true
    >
      {{snackbarText}}
    </v-snackbar>
  </v-layout>
</template>

<script>
import Card from './Card'
export default {
  components: {
    Card
  },
  data () {
    return {
      snackbar:false,
      snackbarText: '',
      colorValue: 'success',
      clickable: true
    }
  },
  computed: {
    cards () {
      return this.$store.state.cards
    }
  },
  methods:  { 
    flipCard(index)  {
      if(!this.clickable){
        return
      }
      this.$store.commit('flipCard', index)
      this.claimPairs()
    },
    claimPairs () {
      let flippedCards = this.$store.getters.flippedCards
      if(flippedCards.length === 2 && flippedCards[0].color === flippedCards[1].color){
        this.clickable = false
        setTimeout( () => { 
          this.$store.commit('updateScore', 2)
          this.$store.commit('claimCards')
          this.$store.commit('flipCards')
          this.snackbar = true
          this.snackbarText = "You found a pair!"
          this.colorValue = 'success'
          this.clickable = true
        }
        ,600)
        
      }
      else if(flippedCards.length === 2) {
        this.clickable = false
        setTimeout( () => { 
          this.$store.commit('updateScore', -1)
          this.$store.commit('flipCards')
          this.snackbar = true
          this.snackbarText = "That's not a pair!"
          this.colorValue = 'error'
          this.clickable = true
        }
        ,600)
      }
    }
  }
}
</script>