const isInjured = warrior => warrior.health() < 20
const isSerious = warrior => warrior.health() < 12
const tookDamage = (warrior, prev) => warrior.health() < prev
class Player {
  flip() {
    this.direction = this.direction === 'backward' ? 'forward' : 'backward'
  }
  lookAround(warrior) {
    const look = warrior.look(this.direction)
    const spaces = look
      .map((space, distance) => [space, distance])
      .filter(([space]) => !space.isEmpty())
    const [space, distance] = spaces[0] || []
    if (space) {
      if (space.isUnit()) {
        const unit = space.getUnit()
        if (unit.isBound() && distance < 1) {
          return 'rescue'
        }
        if (unit.isEnemy()) {
          return 'shoot'
        }
      }
      if (space.isWall() && distance < 1) {
        delete this.direction
        return 'pivot'
      }
    }
    return 'walk'
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
      delete this.direction
      return 'pivot'
    }
    return 'walk'
  }
  playTurn(warrior) {
    // Cool code goes here.
    this.health = this.health || warrior.health()
    const feel = warrior.feel()
    let action = this.lookAround(warrior)
    if (action == 'walk') {
      if (isInjured(warrior)) {
        if (tookDamage(warrior, this.health)) {
          if (isSerious(warrior)) {
            this.direction = 'backward'
          } else {
            delete this.direction
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
