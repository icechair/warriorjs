class Player {
  playTurn(warrior) {
    // Cool code goes here.
    const feel = warrior.feel()
    if (!feel.isEmpty()) {
      warrior.attack()
    } else {
      warrior.walk()
    }
  }
}
