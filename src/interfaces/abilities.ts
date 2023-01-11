import { Characters } from "../class/characters"

export interface Abilities {
  speedUp(character:Characters):void;
  heal(character:Characters, healPercent:number | null):void;
  lifeSteal(character1:Characters,character2:Characters):void;
  attackUp(character:Characters):void;
  darkBlade(speller:Characters,taker:Characters):void;
  fireBall(speller:Characters,taker:Characters):void;
  iceStone(speller:Characters, taker:Characters):void;
  defenseUp(speller:Characters):void;
  airStrike(speller:Characters, taker:Characters):void;
  hollyLight(speller:Characters, taker:Characters):void;
  slice(speller:Characters, taker:Characters):void;
  thunderWave(speller:Characters, taker:Characters):void;
  
}
