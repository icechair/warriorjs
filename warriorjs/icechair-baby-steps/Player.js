const isInjured = warrior => warrior.health() < 20
class Player {
  playTurn(warrior) {
    // Cool code goes here.
    const feel = warrior.feel()
    if (!feel.isEmpty()) {
      warrior.attack()
    } else if (isInjured(warrior)) {
      warrior.rest()
    } else {
      warrior.walk()
    }
  }
}
