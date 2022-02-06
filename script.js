let app = Vue.createApp({
  data () {
    return {
      tabAny: true,
      setup: null,
      delivery: null,
      joke: null,
      currSetup: true,
      tennantImage: true,
      rotActive: false
    }
  },
  mounted () {
    this.sendQuery()
  },
  methods: {
    switchTab (status) {
      this.tabAny = status
      this.tennantImage = status
      this.sendQuery()
    },
    switchToDelivery () {
      this.rotActive = !this.rotActive
      if (this.currSetup) {
        this.currSetup = false
      } else {
        this.setup = ""
        this.currSetup = true
        this.sendQuery()
      }
    },
    async sendQuery () {
      let url = ''
      if (this.tabAny) {
        url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=twopart'
      } else {
        url = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=twopart'
      }
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setup = data.setup
          this.delivery = data.delivery
          this.joke = this.setup
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
})

app.mount("#app")