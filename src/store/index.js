import Vuex from 'vuex'

const colors = ['pink', 'pink', 
                'purple', 'purple', 
                'indigo', 'indigo', 
                'green', 'green', 
                'orange', 'orange', 
                'brown', 'brown',
                'yellow', 'yellow',
                'red', 'red']

const shuffleArray = (array) => {
   let currentIndex = array.length, temp, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

let initialState = () => ({
    score: 0,
    cards: shuffleArray(colors.map(c => ({ color:c, claimed: false, flipped: false })))
})

const store = new Vuex.Store({
    state: initialState,
    mutations: {
      updateScore (state, n) {
        state.score +=n
        if(state.score < 0){
            state.score = 0
        }
      },
      flipCard (state, index) {
          let card = state.cards[index]
          if(card.claimed)
          {
              return;
          }
          card.flipped = true
      },
      flipCards (state) {
        state.cards.filter(card => card.flipped).map(c => c.flipped = false)
      },
      claimCards (state) {
        state.cards.filter(card => card.flipped).map(c => c.claimed = true)
      },
      resetGame (state) {
          const reset = initialState()
          Object.keys(reset).forEach(key => {
            state[key] = reset[key]
          })
      }
    },
    getters: {
      flippedCards: state => {
        return state.cards.filter(card => card.flipped && !card.claimed)
      },
      gameOver: state => {
          return state.cards.every(card => card.claimed)
      }
    }
  })

  export default store