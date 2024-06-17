// const adventurer = {
//   name: "Robin",
//   health: 10,
//   inventory: ['sword', 'potion', 'artifact'],
//   companion: {
//     name: 'leo',
//     type: 'cat',
//     companion: {
//       name: "frank",
//       type: 'flea',
//       inventory: ['sunglasses','hat']
//     }
//   },
//   roll (mod = 0) {
//     const result = Math.floor(Math.random() * 20) + 1 + mod;
//     console.log(`${this.name} rolled a ${result}.`)
//   }
// }

//adventurer.roll()

//PArt 2
class Character  {
  constructor (name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
  //  console.log(`${this.name} rolled a ${result}.`)
    return result
  }
  static MAX_HEALTH = 100;

}

class Adventurer extends Character {
  constructor (name,role) {
    super(name);
    if (!Adventurer.isValidRole(role)) {
      throw new Error(`Invalid role: ${role}. Valid roles are: ${Adventurer.ROLES.join(', ')}`);
    }
    this.role = role;
    this.inventory.push('bedroll', '50 gold coins')
  }
  scout() {
    console.log(`${this.name} is scouting ahead...`)
    super.roll();
  }
  static ROLES = ['Fighter', 'Healer', 'Assasin'];


  static isValidRole(role) {
    return Adventurer.ROLES.includes(role);
  }

  static getRoles() {
    return Adventurer.ROLES
  }

  duel(enemy)  {
    console.log(`${this.name} is dueling with ${enemy.name}`)
    while (this.health >= 50 && enemy.health >= 50) {
      let myRoll = this.roll()
      let enemyRoll = enemy.roll()
      if (myRoll > enemyRoll){
        enemy.health -= 1
        console.log(`${this.name} dealt 1 damage: ${this.name} has ${this.health} health and ${enemy.name} has ${enemy.health} health`)
      } else if (myRoll < enemyRoll){
        this.health -= 1
        console.log(`${enemy.name} dealt 1 damage: ${this.name} has ${this.health} health and ${enemy.name} has ${enemy.health} health`)
      }
      //adding healer spells
      if (this.role === 'Healer') {
        this.healParty();
      }

      if(enemy.role == 'Healer') {
        enemy.healParty();
      }

      //adding fighter for both user and enemy
      if (this.role === "Fighter") {
        this.criticalHit(enemy);
      }
      if (enemy.role === 'Fighter') {
       // console.log(`${enemy.name} is about to use criticalHit on ${this.name}`);
        enemy.criticalHit(this);
        //console.log(`${enemy.name} has health: ${enemy.health}`);
      } 

      //adding assasin attacks 
      if (this.role === "Assasin") {
        this.sneakAttack(enemy)
      }

      if (enemy.role === "Assasin") {
        enemy.sneakAttack(this)
      }

    }    

    if (this.health > 50 && enemy.health < 50) {
      console.log(`${this.name} wins the duel!`);
    } else if (enemy.health > 50 && this.health < 50){
      console.log(`${enemy.name} wins the duel!`);
    }
  } 
}




class Companion extends Character {
  constructor (name,type) {
    super(name);
    this.type = type;
  }
}

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  generateHealer(name) {
    const newHealer = new Healer(name);
    this.adventurers.push(newHealer);
    return newHealer;
  }

  generateFighter(name) {
    const newFighter = new Fighter(name);
    this.adventurers.push(newFighter);
    return newFighter
  }

  generateAssasin(name) {
    const newAssasin = new Assasin(name);
    this.adventurers.push(newAssasin);
    return newAssasin
  }

  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

class Healer extends Adventurer {
  constructor(name) {
    super(name, 'Healer')
  }
  healParty() {
    const rollResult = this.roll()
    if (rollResult >= 17) {
      const heal = 4;
      this.health = Math.min(this.health + heal, Character.MAX_HEALTH);
      console.log(`${this.name} used spell: Heal Party and gained 5 health. Current health: ${this.health}`);
    }
  }
}

class Fighter extends Adventurer {
  constructor(name) {
    super(name, 'Fighter')
  }
  criticalHit(enemy) {
    const rollResult = this.roll();
    if (rollResult >= 12) {
      const crit = 2;
      enemy.health -= crit;
      console.log(`${this.name} landed a critical strike on ${enemy.name}, dealing an extra 2 damage!`);
    } 
  }
}

class Assasin extends Adventurer {
  constructor (name) {
    super(name, "Assasin")
  }
  sneakAttack(enemy) {
    const rollResult = this.roll();
    if (rollResult >= 19) {
      const hit = 7;
      enemy.health -= hit;
      console.log(`${this.name} landed a sneak attack on ${enemy.name}, dealing 10 damage!`)
    }
  }

}


const healers = new AdventurerFactory("Healer")
const robin = healers.generateHealer("Robin")

const fighters = new AdventurerFactory('Fighter')
const alice = fighters.generateFighter("Alice")
const tony = fighters.generateFighter("Tony")

const assasin = new AdventurerFactory("Assasin")
const johnny = assasin.generateAssasin("Johnny")


//const robin = new Adventurer('Robin');
robin.inventory = ['sword','artifact','potion']
robin.companion = new Companion('Leo')
robin.companion.type = 'Cat';
robin.companion.companion = new Companion('frank')
robin.companion.companion.type = 'Flea'
robin.companion.companion.inventory = ["small hat", "sunglasses"];


//robin.roll()
//robin.companion.roll()


//tony.duel(robin)

johnny.duel(robin)


//robin.duel(alice)
