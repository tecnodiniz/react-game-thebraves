import { Characters } from "./characters";
import gameConfig from '../assets/data/characters.json'

export class Enemies extends Characters {
  enemyActions:number[] = [];

  selectAction():number{
    let action = Math.floor(Math.random() * this.enemyActions.length);
    console.log(action)
    return this.enemyActions[action];
  }
  constructor(
    id:number,
    name:string,
    profile:string,
    hp:number,
    mp:number,
    atk:number,
    def:number,
    spd:number,
    abilities:number[],
    weakness:number[],
    resistence:number[]
    ){
      super(
        id,
        name,
        profile,
        hp,
        mp,
        atk,
        def,
        spd,
        abilities,
        weakness,
        resistence
        );
    const enemy = gameConfig.enemies.find(enemy => enemy.id === id);
    if(enemy)
      this.enemyActions = enemy.actions
    }

}
