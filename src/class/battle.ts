import { Abilities } from '../interfaces/abilities';
import { Characters } from "./characters";
import { Player } from "./player";
import { Enemies } from "./enemy";

import gameConfig from '../assets/data/characters.json'

export class Battle implements Abilities{

  audio = new Audio();

  //Players Settings
  private player:Player = new Player(0,'','',0,0,0,0,0,[0],[0],[0]);
  private enemy:Enemies = new Enemies(0,'','',0,0,0,0,0,[0],[0],[0]);
  private playerHp:number = 0;
  private enemyHp:number = 0;
  private playerLifebar:string = "0%";
  private enemyLifeBar:string = "0%";

  //Battle Settings
  private timer: number = 0;
  private timeBar:string = "100%";
  private turn:number = 0;
  private gameover:boolean = false;
  private finishAction:boolean = false;
  private battleLog:string = "";
  private criticalLog:string = "";
  private mpLoad:number = 1;
  private mpTurnCount:number = 0;

  //Dynamic
  private playerLog:string = '...';
  private enemyLog:string = '...';
  private playerSpellCard:boolean = false;
  isAtk:boolean = false;
  isSkill:boolean = false;
  isBlk:boolean = false;



  constructor(player:Player,enemy:Enemies,timer:number){
    this.timer = timer;
    this.player = player;
    this.enemy = enemy;
    this.playerHp = player.getHp();
    this.enemyHp = enemy.getHp();

    this.enemyLifeBar = this.enemyBar(this.enemy.getHp());
    this.playerLifebar = this.playerBar(this.player.getHp());
  }

  getPlayer():Player{
    return this.player;
  }
  setPlayer(player:Player):void{
    this.player = player;
  }

  getEnemy():Enemies{
    return this.enemy;
  }
  setEnemy(enemy:Enemies):void{
    this.enemy = enemy;
  }
  getPlayerLifeBar():string{
    return this.playerLifebar;
  }
  setPlayerLifeBar(value:string):void{
    this.playerLifebar = value;
  }
  getEnemyLifeBar():string{
    return this.enemyLifeBar;
  }
  setEnemyLifeBar(value:string):void{
    this.enemyLifeBar = value;
  }

  getTurn():number{
    return this.turn;
  }
  setTurn(turn:number):void{
    this.turn = turn;
  }
  getTimeBar():string{
    return this.timeBar;
  }
  setTimeBar(){}

  getGameOver():boolean{
    return this.gameover;
  }
  getPlayerLog():string{
    return this.playerLog;
  }
  setPlayerLog(log:string):void{
    this.playerLog = log;
  }
  getEnemyLog():string{
    return this.enemyLog;
  }
  setEnemyLog(log:string):void{
    this.enemyLog = log;
  }
  getPlayerSpellCard():boolean{
    return this.playerSpellCard;
  }
  setPlayerSpellCard(value:boolean):void{
    this.playerSpellCard = value;
  }
  getBattleLog():string{
    return this.battleLog;
  }
  setBattleLog(log:string):void{
    this.battleLog = log;
  }
  getCriticalLog():string{
    return this.criticalLog;
  }
  setCriticalLog(value:string):void{
    this.criticalLog = value;
  }
  getFinishAction():boolean{
    return this.finishAction;
  }
  setFinishAction(value:boolean):void{
    this.finishAction = value;
  }
  getMpLoad():number{
    return this.mpLoad;
  }

  getMpTurnCount():number{
    return this.mpTurnCount;
  }
  setMpTurnCount(count:number):void{
    this.mpTurnCount = count;
  }
  getIsAtk():boolean{
    return this.isAtk;
  }
  setIsAtk(value:boolean):void{
    this.isAtk = value;
  }
  getIsSkill():boolean{
    return this.isSkill;
  }
  setIsSkill(value:boolean):void{
    this.isSkill = value;
  }
  getIsBlk():boolean{
    return this.isBlk;
  }
  setIsBlk(value:boolean):void{
    this.isBlk = value;
  }
  setGameOver(value:boolean):void{
    this.gameover = value;
  }

  //Game
  startGame():void{
    this.initTurn();
  }

  resetActionClass():void{
    this.setIsAtk(false);
    this.setIsBlk(false);
    this.setIsSkill(false);
  }


  initTurn():void{
    let seconds = this.timer * 10;
    console.log("INIT");
    this.setTurn(this.getTurn() + 1);
    this.resetActionClass();

    this.player.setAction(0);
    this.player.setAbilityId(0);
    this.player.setDefPoints(0);

    this.playerLifebar = this.playerBar(this.player.getHp());
    this.enemyLifeBar = this.enemyBar(this.enemy.getHp());

    this.finishAction = false;

    this.checkScore();

    if(!this.gameover){
      this.setBattleLog("Turn Phase")
      this.startTimer(seconds)
    }else
    this.setBattleLog("Game Over")

  }

  private startTimer(seconds:number):number{

    if(seconds > 0 && !this.getFinishAction()){
      setTimeout(() => {

        let percent = ((seconds / 10)*100) / this.timer;

        this.timeBar = percent + "%";


        seconds--;

        return this.startTimer(seconds);
    }, 100);
  }else{
    this.processBattle();
    this.setFinishAction(true);

  }


  return seconds;
  }

  //Enemy Settings
  enemyAction(value:number):number{
    switch(value){
      case 1:
        this.player.takeDmg(this.enemy.attack());
        this.displayLog(`${this.enemy.getName()} attacked you`);
        this.setPlayerLifeBar(this.playerBar(this.player.getHp()));

        break;
      case 2:
        console.log("Time to SPELL!")
        this.enemySpell(this.enemySelectSpell());
        break;
    }
    return this.player.getHp();

  }
  displayPlayerLog(log:string):void{
    this.setPlayerLog(log);
    setTimeout(() => {
      log = "..."
      this.setPlayerLog(log);

    }, 3 * 1000);
  }
  displayCriticalLog(log:string):void{
    this.setCriticalLog(log);
    setTimeout(() => {
      this.setCriticalLog("");

    }, 3000);
  }
  displayLog(log:string):void{
    this.setEnemyLog(log)
    setTimeout(() => {
      log = "...";
      this.setEnemyLog(log);

    }, 3 * 1000);

  }
  enemySelectSpell():number{
    let abilities = this.enemy.getAbilities();
    let ability = Math.floor(Math.random() * abilities.length);
    return abilities[ability];
  }

  playerSpell(value:number):void{
    switch(value){
      case 1:
        this.speedUp(this.player);
        this.displayPlayerLog(`${this.player.getName()} speed up`);
        break;
      case 2:
        this.heal(this.player,0);
        this.displayPlayerLog(`${this.player.getName()} healed`);

        break;
      case 3:
        this.lifeSteal(this.player,this.enemy);
        this.displayPlayerLog(`${this.player.getName()} liched hp`);

        break;
      case 4:
        this.attackUp(this.player);
        this.displayPlayerLog(`${this.player.getName()} attack up`);
        break;
      case 5:
        this.darkBlade(this.player,this.enemy);
        this.displayPlayerLog(`${this.player.getName()} used Dark Blade`);
        break;
      case 6:
        this.fireBall(this.player,this.enemy);
        this.displayPlayerLog(`${this.player.getName()} used Fire Ball`);
        break;
      case 7:
        this.iceStone(this.player,this.enemy);
        this.displayPlayerLog(`${this.player.getName()} used Ice Stone`)
        break;
      case 8:
        this.defenseUp(this.player);
        this.displayPlayerLog(`${this.player.getName()} Defense Up`);
        console.log("Player"+this.player.getDef())

        break;
      case 9:
        this.airStrike(this.player,this.enemy);
        this.displayPlayerLog(`${this.player.getName()} used Air Strike`);
        break;
      case 10:
        this.hollyLight(this.player,this.enemy);
        this.displayPlayerLog(`${this.player.getName()} used Holly Light`);
        break;
      case 11:
        this.slice(this.player,this.enemy);
        this.displayPlayerLog(`${this.player.getName()} used Slice`);
        break;
      case 12:
        this.thunderWave(this.player,this.enemy);
        this.displayPlayerLog(`${this.player.getName()} used Thunder Wave`);
        break;

    }
  }
  enemySpell(value:number):void{
    switch(value){
      case 1:
        this.speedUp(this.enemy);
        this.displayLog(`${this.enemy.getName()} speed up`);
        break;
      case 2:
        this.heal(this.enemy,0);
        this.displayLog(`${this.enemy.getName()} healed`);

        break;
      case 3:
        this.lifeSteal(this.enemy,this.player);
        this.displayLog(`${this.enemy.getName()} liched hp`);

        break;
      case 4:
        this.attackUp(this.enemy);
        this.displayLog(`${this.enemy.getName()} attack up`);
        break;
      case 5:
        this.darkBlade(this.enemy,this.player);
        this.displayLog(`${this.enemy.getName()} used Dark Blade`);
        break;
      case 6:
        this.fireBall(this.enemy,this.player);
        this.displayLog(`${this.enemy.getName()} used Fire Ball`);
        break;
      case 7:
        this.iceStone(this.enemy,this.player);
        this.displayLog(`${this.enemy.getName()} used Ice Stone`);
        break;
      case 8:
        this.defenseUp(this.enemy);
        this.displayLog(`${this.enemy.getName()} defense up`);
        console.log("Enemy "+this.enemy.getDef());
        break;
      case 9:
        this.airStrike(this.enemy,this.player);
        this.displayLog(`${this.enemy.getName()} used Air Strike`);
        break;
      case 10:
        this.hollyLight(this.enemy,this.player);
        this.displayLog(`${this.enemy.getName()} used Holly Light`);
        break;
      case 11:
        this.slice(this.enemy,this.player);
        this.displayLog(`${this.enemy.getName()} used Slice`);
        break;
      case 12:
        this.thunderWave(this.enemy,this.player);
        this.displayLog(`${this.enemy.getName()} used Thunder Wave`);
        break;
    }

  }

  //Player Settings
  playerAction(action:number):number{
    switch(action){
      case 1:
        this.enemy.takeDmg(this.player.attack());
        this.setEnemyLifeBar(this.enemyBar(this.enemy.getHp()));
        this.displayPlayerLog(`Well Done`)
        break;
      case 2:
        this.playerSpell(this.player.getAbilityId());
        break;
      case 3:
        this.displayPlayerLog(`Blocked ${this.player.getDefPoints()}% damage `)
        break;
    }
    return this.enemy.getHp();
  }

  //Actions
  playerAtk():void{
    this.cursorSong2();
    this.resetActionClass();
    this.setIsAtk(true);

    this.player.setAction(1);
    this.setPlayerLog(`Hit oppentent with ${this.player.getAtk()} points`);
  }
  playerSelectSpell():void{
    this.cursorSong2();
    this.resetActionClass();
    this.setIsSkill(true);

    this.player.setAction(2);
    this.playerSpellCard = true;
  }
  playerBlock():void{
    this.cursorSong2();
    this.resetActionClass();
    this.setIsBlk(true);

    this.player.setAction(3);
    this.player.setDefPoints(10);
    this.setPlayerLog(`Defending`);
  }
  playerSpellClick(id:number,description:string):void{
    if(this.player.checkMp(id)){
      this.cursorSong2();
      this.player.setAbilityId(id);
      this.setPlayerLog(description);
      this.setPlayerSpellCard(false);
    }else{
      this.setPlayerLog("NO MP");
      this.errorSong();

    }


  }
  endTurn():void{
    this.cursorSong4();
    this.setFinishAction(true);
  }

  //Players Life bar
  private playerBar(value:number):string{
    let hp = (value * 100)/this.playerHp;
    if(hp < 0)
    hp = 0;

    return hp+'%';
  }
  private enemyBar(value:number):string{
    let hp = (value * 100)/this.enemyHp;
    if(hp < 0)
    hp = 0;

    return hp+'%';
  }

  //Interface Abilities

    speedUp(character: Characters): void {
      let spd = character.getSpd();
      let mp = character.getMp();

      const speedUp = gameConfig.abilities.find(ability => ability.id === 1);
      if(speedUp){
        character.setMp(mp - speedUp.cost)
        character.setSpd(spd + 1);
      }
    }

  heal(character: Characters, healPercent:number | null): void {
    var healPoints:number = 45;

    if(healPercent !== 0 && healPercent != null)
    healPoints += (healPoints * healPercent) / 100;

    const heal = gameConfig.abilities.find(ability => ability.id === 2);

    if(heal){
        let life = character.getHp() + healPoints;

        let mp = character.getMp();
        character.setMp(mp - heal.cost);
        character.setHp(life);

        if(character.getHp() > 100)
          character.setHp(100);

    }
  }
  lifeSteal(character1: Characters, character2:Characters): void {
    const lifesteal = gameConfig.abilities.find(ability => ability.id === 3);
    if(lifesteal){
      let hpChar1 = character1.getHp() + 15;
      let hpChar2 = character2.getHp() - 15;
      if(hpChar1 > 100)
      hpChar1 = 100;

      let mp = character1.getMp();
      character1.setMp(mp - lifesteal.cost);

      character1.setHp(hpChar1);
      character2.setHp(hpChar2);
    }
  }
  attackUp(character: Characters): void {
    const attackUp = gameConfig.abilities.find(ability => ability.id === 4);
    if(attackUp){
      let atk = character.getAtk();
      let mp = character.getMp();
      character.setMp(mp - attackUp.cost)
      character.setAtk(atk + 10);
    }

  }
  darkBlade(speller: Characters,taker:Characters): void {
    let dmg = 45;
    let mp = speller.getMp();
    const darkBlade = gameConfig.abilities.find(ability => ability.id === 5);

    if(darkBlade){
      this.checkDamage(darkBlade.id,dmg,taker)
      speller.setMp(mp - darkBlade.cost);

      taker.takeDmg(dmg);
    }
  }
  fireBall(speller: Characters,taker:Characters): void {
    let dmg = 40;
    let mp = speller.getMp();

    const fireBall = gameConfig.abilities.find(ability => ability.id === 6);

    if(fireBall){
      dmg = this.checkDamage(fireBall.id,dmg,taker);

      speller.setMp(mp - fireBall.cost);
      taker.takeDmg(dmg);
    }

  }

  iceStone(speller: Characters, taker: Characters): void {
    let dmg = 25;
    let mp = speller.getMp();
    const iceStone = gameConfig.abilities.find(ability => ability.id === 7);

    if(iceStone){
      this.checkDamage(iceStone.id,dmg,taker)
      speller.setMp(mp - iceStone.cost);
      taker.takeDmg(dmg);
      taker.setSpd(taker.getSpd() - 1);
    }

  }
  defenseUp(speller: Characters): void {
    const defenseUp = gameConfig.abilities.find(ability => ability.id === 8);
    if(defenseUp){
      let def = speller.getDef();
      let mp = speller.getMp();
      speller.setMp(mp - defenseUp.cost)
      speller.setDef(def + 15);
    }
  }
  airStrike(speller: Characters, taker: Characters): void {
    let dmg = 40;
    let mp = speller.getMp();

    const airStrike = gameConfig.abilities.find(ability => ability.id === 9);

    if(airStrike){
      this.checkDamage(airStrike.id,dmg,taker)
      speller.setMp(mp - airStrike.cost);
      taker.takeDmg(dmg);
    }
  }
  hollyLight(speller: Characters, taker: Characters): void {
    let dmg = 40;
    let mp = speller.getMp();

    const hollyLight = gameConfig.abilities.find(ability => ability.id === 10);

    if(hollyLight){
      this.checkDamage(hollyLight.id,dmg,taker)
      speller.setMp(mp - hollyLight.cost);
      taker.takeDmg(dmg);
    }

  }
  slice(speller: Characters, taker: Characters): void {
    let dmg = 20;
    dmg += ((speller.getSpd() * 10) * dmg) / 100;
    console.log(dmg);

    let mp = speller.getMp();

    const slice = gameConfig.abilities.find(ability => ability.id === 10);

    if(slice){
      this.checkDamage(slice.id,dmg,taker)

      speller.setMp(mp - slice.cost);
      taker.takeDmg(dmg);
    }

  }
  thunderWave(speller: Characters,taker:Characters): void {
    let dmg = 40;
    let mp = speller.getMp();

    const thunderWave = gameConfig.abilities.find(ability => ability.id === 12);

    if(thunderWave){
      dmg = this.checkDamage(thunderWave.id,dmg,taker);
      speller.setMp(mp - thunderWave.cost);
      taker.takeDmg(dmg);
    }

  }

  checkDamage(abilityId:number, dmg:number,taker:Characters):number{
    const weakness = taker.getWeakness().find(ability => ability === abilityId);
    const resistence = taker.getReistence().find(ability => ability === abilityId);

    if(weakness){
      dmg += ((dmg * 50) / 100)
      this.displayCriticalLog(`${taker.getName()} received critical damage`);
      console.log(abilityId);

    }
    if(resistence){
      dmg -= ((dmg * 50) / 100)
      this.displayCriticalLog(`${taker.getName()} received less damage`);
    }
    return dmg;
  }

  //Processing Battle
  processBattle(){
    this.setBattleLog("Processing...");

    setTimeout(() => {
      if(this.player.getSpd() > this.enemy.getSpd()){

        if(this.playerAction(this.player.getAction()) <= 0)
        this.initTurn();
        else{
          this.enemyAction(this.enemy.selectAction());
          this.initTurn();
        }
      }else if(this.player.getSpd() < this.enemy.getSpd()){
        if(this.enemyAction(this.enemy.selectAction()) <= 0)
        this.initTurn();
        else{
            this.playerAction(this.player.getAction())
            this.initTurn();
        }

      }else{
        this.enemyAction(this.enemy.selectAction());
        this.playerAction(this.player.getAction());
        this.initTurn();
      }
      this.setMpTurnCount(this.getMpTurnCount() + 1);
      this.mpCharge(this.getMpTurnCount());

    }, 2 * 1000);
  }

  checkScore():void{
    if(this.player.getSpd() === this.enemy.getSpd() && this.player.getHp() <= 0 && this.enemy.getHp() <= 0){
      this.gameover = true;
      this.setPlayerLog("Draw!")
    }
    else
    if(this.player.getHp() <= 0){
      this.gameover = true;
      this.audio.pause();
      this.setCriticalLog("YOU LOSE");
    }else
    if(this.enemy.getHp() <= 0){
      this.gameover = true;
      this.setCriticalLog("YOU WIN!");
      this.audio.pause();
      this.victorySong();


    }
  }
  mpCharge(mpTurnCount:number):void{
    if(mpTurnCount === 3){
      let mpPoints = this.getMpLoad();
      let pMp = this.player.getMp();
      let eMp = this.enemy.getMp();
      this.player.setMp(pMp + mpPoints);
      this.enemy.setMp(eMp + mpPoints);

      this.setMpTurnCount(0);

    }

  }

  //Songs
  cursorSong(){
    let audio = new Audio();
    audio.src = "../../assets/audio/UI songs/Cursor.wav"
    audio.load();
    audio.play();
  }
  cursorSong2(){
    let audio = new Audio();
    audio.src = "../../assets/audio/UI songs/Menu1A.wav"
    audio.load();
    audio.play();
  }
  cursorSong3(){
    let audio = new Audio();
    audio.src = "../../assets/audio/UI songs/Menu1B.wav"
    audio.load();
    audio.play();
  }
  cursorSong4(){
    let audio = new Audio();
    audio.src = "../../assets/audio/UI songs/Equip.wav"
    audio.load();
    audio.play();
  }
  errorSong(){
    let audio = new Audio();
    audio.src = "../../assets/audio/UI songs/Error.wav"
    audio.load();
    audio.play();

  }
  victorySong(){
    let audio = new Audio();
    audio.src = "../../assets/audio/win-song.ogg"
    audio.load();
    audio.play();

  }
  battleSong(){
    this.audio = new Audio();
    this.audio.src = "../../assets/audio/battleTheme.mp3"
    this.audio.load();
    return this.audio;
  }



}
