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
      console.log(isShow)
      state.balls[index].show = isShow
      state.balls[index].el = el
      console.log(state.dropBall)
      console.log(state.balls)
    },
    changeDropBall (state, ball) {
      state.dropBall.push(ball)
    },
    changeDropBallShow (state, isShow) {
      state.dropBall.push(ball)
    }
  },
  actions: {
    // DROP ({commit, state}, el) {
    //   state.balls.forEach((ele, i) => {
    //     if (!ele.show) {
    //       commit('changeShow', { index: i, isShow: true })
    //       commit('changeDropBall', ele)
    //       return
    //     }
    //   })
    // }
  }
}

export default balls
