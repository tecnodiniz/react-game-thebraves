import gameConfig from '../assets/data/characters.json'



export class Characters {

  private id:number = 0;
  private name:string = "";
  private profile:string = "";
  private hp:number = 0;
  private mp:number = 0;
  private atk:number = 0;
  private def:number = 0;
  private spd:number = 0;
  private abilities:number[] = [0];
  private weakness:number[] = [0];
  private resistence:number[] = [0];

  private ability:AbilityModel[] = [];

  //battle
  private action:number = 0;
  private atkPoints:number = 0;
  private defPoints:number = 0;
  private abilityId:number = 0;

  constructor(id:number,
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

                this.id = id;
                this.name = name;
                this.profile = profile;
                this.hp = hp;
                this.mp = mp;
                this.atk = atk;
                this.def = def;
                this.spd = spd;
                this.abilities = abilities;
                this.weakness = weakness;
                this.resistence = resistence;

    this.setAbilitiesModel();
  }

  //getters and setters
  getName():string{
    return this.name;
  }
  setName(name:string):void{
    this.name = name;
  }
  getProfile():string{
    return this.profile;
  }
  setProfile(profile:string){
    this.profile = profile;
  }
  getHp():number{
    return this.hp;
  }
  setHp(value:number):void{
    this.hp = value;
  }
  getMp():number{
    return this.mp;
  }
  setMp(value:number):void{
    this.mp = value;
  }
  getAtk():number{
    return this.atk;
  }
  setAtk(value:number):void{
    this.atk = value;
  }
  getDef():number{
    return this.def;
  }
  setDef(value:number):void{
    this.def = value;
  }
  getSpd():number{
    return this.spd;
  }
  setSpd(value:number):void{
    this.spd = value;
  }
  getAbilities():number[]{
    return this.abilities;
  }
  setAbilities(value:number[]):void{
    this.abilities = value;
  }
  getAbilityId():number{
    return this.abilityId;
  }
  setAbilityId(id:number):void{
    this.abilityId = id;
  }
  getAction():number{
    return this.action;
  }
  setAction(value:number):void{
    this.action = value;
  }
  getAtkPoints():number{
    return this.atkPoints;
  }
  setAtkPoints(value:number):void{
    this.atkPoints = value;
  }
  getDefPoints():number{
    return this.defPoints;
  }
  setDefPoints(value:number):void{
    this.defPoints = value;
  }
  getWeakness():number[]{
    return this.weakness;
  }
  setWeakness(value:number[]):void{
    this.weakness = value;
  }
  getReistence():number[]{
    return this.resistence;
  }
  setResistence(value:number[]):void{
    this.resistence = value;
  }

  attack():number{
    let atk = this.atkPoints + this.atk
    return atk;
  }
  //Actions
  takeDmg(dmg:number){
    let def = this.defPoints + this.getDef();
    let life:number = this.getHp();
    console.log("defended "+def)

    if(def !== 0){
      let blockedDmg = dmg - ((dmg * def) / 100)
      life -= blockedDmg;
      console.log(blockedDmg);
    }else
    life -= dmg;

    if(dmg > 0 && dmg < 50)
    this.hitSong();
    else
    this.strongHit();


    this.setHp(Math.floor(life));


    if(this.getHp() < 0)
    this.setHp(0);
  }

  checkMp(id:number):boolean{
    var result = false
    const ability = gameConfig.abilities.find(ability => ability.id ===id)
    if(ability){
      if(this.getMp()>= ability.cost){
        result = true;
      }
      else
      result = false;
    }
    return result;
  }

  //Aux methods
  getInfo():void{
    console.log(`
    name:${this.getName()}\n
    profile:${this.getProfile()}\n
    hp:${this.getHp()}\n
    mp:${this.getMp()}\n
    atk:${this.getAtk()}\n
    def:${this.getDef()}\n
    spd:${this.getSpd()}\n
    abilities:${this.getAbilitiesName()}\n
    weakness:${this.getWeaknessName()} \n

    `)

  }
  getAbilitiesName():string[]{
    const abilities:number[] = this.getAbilities();
    const result:string[] = [];
    for(let i = 0 ; i <= abilities.length; i++){
      let ability = gameConfig.abilities.find(value => value.id === abilities[i])
      if(ability)
      result.push(ability.name);
    }
    return result;

  }
  getWeaknessName():string[]{
    const abilities:number[] = this.getWeakness();

    const result:string[] = [];
    for(let i = 0 ; i <= abilities.length; i++){
      let ability = gameConfig.abilities.find(value => value.id === abilities[i])
      if(ability)
      result.push(ability.name);
    }
    return result;

  }
  getAbilitiesModel():AbilityModel[]{
    return this.ability;
  }
  setAbilitiesModel(){

    const abilities:number[] = this.getAbilities();

    for(let i = 0 ; i < abilities.length; i++){
      let ap = gameConfig.abilities.find(value => value.id === abilities[i])
      if(ap){
        this.ability.push(ap)
      }
    }
    return this.ability;
  }

  //songs
  hitSong(){
    let audio = new Audio();
    audio.src = "../../assets/audio/UI songs/hit11.mp3.flac";
    audio.load();
    audio.play();
  }
  strongHit(){
    let audio = new Audio();
    audio.src = "../../assets/audio/UI songs/hit01.mp3.flac";
    audio.load();
    audio.play();
  }

}

class AbilityModel{
  id:number = 0;
  name:string = '';
  cost:number = 0;
  description:string = '';
}


