const balls = {
  state: {
    balls: [{
      show: false
    }, {
      show: false
    }, {
      show: false
    }, {
      show: false
    }, {
      show: false
    }],
    dropBall: []
  },
  mutations: {
    changeShow (state, {index, isShow, el}) {
      state.balls[index].show = isShow
      state.balls[index].el = el
    },
    changeDropBall (state, ball) {
      state.dropBall.push(ball)
    }
  }
}

export default balls
