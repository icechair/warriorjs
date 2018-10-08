const isInjured = warrior => warrior.health() < 20
const isSerious = warrior => warrior.health() < 12
const tookDamage = (warrior, prev) => warrior.health() < prev
class Player {
  flip() {
    this.direction = this.direction === 'backward' ? 'forward' : 'backward'
  }
  feelAround(warrior) {
    const feel = warrior.feel(this.direction)
    if (feel.isUnit()) {
      const unit = feel.getUnit()
      if (unit.isBound()) {
        return 'rescue'
      }
      if (unit.isEnemy()) {
        return 'attack'
      }
    }
    if (feel.isWall()) {
      this.flip()
    }
    return 'walk'
  }
  playTurn(warrior) {
    // Cool code goes here.
    this.health = this.health || warrior.health()
    this.direction = this.direction || 'backward'
    const feel = warrior.feel()
    let action = this.feelAround(warrior)
    if (action == 'walk') {
      if (isInjured(warrior)) {
        if (tookDamage(warrior, this.health)) {
          if (isSerious(warrior)) {
            this.direction = 'backward'
          } else {
            this.direction = 'forward'
          }
        } else {
          action = 'rest'
        }
      }
    }
    warrior[action](this.direction)
    this.health = warrior.health()
  }
}
