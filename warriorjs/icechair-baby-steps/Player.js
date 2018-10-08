const isInjured = warrior => warrior.health() < 20
const tookDamage = (warrior, prev) => warrior.health() < prev
class Player {
  playTurn(warrior) {
    // Cool code goes here.
    this.health = this.health || warrior.health()
    const feel = warrior.feel()
    if (feel.isUnit()) {
      const unit = feel.getUnit()
      if (unit.isBound()) {
        warrior.rescue()
      } else {
        warrior.attack()
      }
    } else if (isInjured(warrior) && !tookDamage(warrior, this.health)) {
      warrior.rest()
    } else {
      warrior.walk()
    }
    this.health = warrior.health()
  }
}
