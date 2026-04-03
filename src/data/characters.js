import { CANON_ROSTER } from "./canonRoster.js";

export const ROLES = [
  { key:"cap", label:"Captain",      icon:"⚓", col:"#C8960C", desc:"Crew leader & strongest fighter" },
  { key:"vic", label:"Vice Captain", icon:"🗺️", col:"#4A5568", desc:"Commands when Captain is absent" },
  { key:"tnk", label:"Tank",         icon:"🛡️", col:"#2471A3", desc:"Frontline shield, absorbs damage" },
  { key:"hel", label:"Healer",       icon:"💊", col:"#27AE60", desc:"Doctor keeping the crew alive" },
  { key:"due", label:"Duelist",      icon:"⚔️", col:"#C0392B", desc:"Elite 1-on-1 combat champion" },
  { key:"sp1", label:"Support",      icon:"🌊", col:"#5D6D7E", desc:"Utility & team enabler" },
  { key:"sp2", label:"Support",      icon:"🌊", col:"#5D6D7E", desc:"Second support role" },
  { key:"tra", label:"TRAITOR",      icon:"🗡️", col:"#7D3C98", desc:"⚠️ Score SUBTRACTS from YOUR team!" },
];

// The precise, accurate power scaling provided initially for the main 40 characters
const PERFECT_OVERRIDES = [
  { name:"Monkey D. Luffy",       crew:"Straw Hats",        col:"#FF4D4D", fruit:"Gum-Gum Fruit",           bounty:"3,000,000,000",   img: "https://i.pinimg.com/736x/8f/3e/21/8f3e218204b7be89bafaefda2d4c0628.jpg", s:{cap:10,vic:5,tnk:7,hel:2,due:9,sp1:4,sp2:4,tra:1} },
  { name:"Roronoa Zoro",          crew:"Straw Hats",        col:"#27AE60", fruit:"No Devil Fruit",          bounty:"1,111,000,000",   img: "https://i.pinimg.com/736x/67/6f/97/676f97ef902167e412bd0cfbf3d0ae6d.jpg", s:{cap:6,vic:9,tnk:7,hel:1,due:10,sp1:3,sp2:3,tra:3} },
  { name:"Nami",                  crew:"Straw Hats",        col:"#F39C12", fruit:"No Devil Fruit",          bounty:"366,000,000",     s:{cap:4,vic:7,tnk:2,hel:3,due:4,sp1:9,sp2:9,tra:7} },
  { name:"Usopp",                 crew:"Straw Hats",        col:"#D35400", fruit:"No Devil Fruit",          bounty:"500,000,000",     s:{cap:3,vic:4,tnk:2,hel:3,due:5,sp1:9,sp2:9,tra:5} },
  { name:"Sanji",                 crew:"Straw Hats",        col:"#F1C40F", fruit:"No Devil Fruit",          bounty:"1,032,000,000",   img: "https://i.pinimg.com/736x/b6/4a/02/b64a0247657579a4bf4fd06dcce5dd34.jpg", s:{cap:5,vic:7,tnk:5,hel:7,due:9,sp1:7,sp2:7,tra:4} },
  { name:"Tony Tony Chopper",     crew:"Straw Hats",        col:"#FFB6C1", fruit:"Human-Human Fruit",       bounty:"1,000",           s:{cap:2,vic:3,tnk:5,hel:10,due:5,sp1:7,sp2:7,tra:2} },
  { name:"Nico Robin",            crew:"Straw Hats",        col:"#9B59B6", fruit:"Flower-Flower Fruit",     bounty:"930,000,000",     s:{cap:5,vic:7,tnk:3,hel:4,due:7,sp1:9,sp2:9,tra:8} },
  { name:"Franky",                crew:"Straw Hats",        col:"#2980B9", fruit:"No Devil Fruit (Cyborg)", bounty:"394,000,000",     s:{cap:4,vic:5,tnk:10,hel:3,due:7,sp1:8,sp2:8,tra:3} },
  { name:"Brook",                 crew:"Straw Hats",        col:"#95A5A6", fruit:"Revive-Revive Fruit",     bounty:"383,000,000",     s:{cap:3,vic:4,tnk:4,hel:4,due:7,sp1:8,sp2:8,tra:4} },
  { name:"Jinbe",                 crew:"Straw Hats",        col:"#1A5276", fruit:"No Devil Fruit",          bounty:"1,100,000,000",   s:{cap:6,vic:9,tnk:9,hel:4,due:8,sp1:7,sp2:7,tra:3} },
  { name:"Portgas D. Ace",        crew:"Whitebeard Pirates",col:"#E67E22", fruit:"Flame-Flame Fruit",       bounty:"550,000,000",     s:{cap:7,vic:8,tnk:6,hel:2,due:9,sp1:5,sp2:5,tra:3} },
  { name:"Edward Newgate",        crew:"Whitebeard Pirates",col:"#BDC3C7", fruit:"Tremor-Tremor Fruit",     bounty:"5,046,000,000",   img: "https://i.pinimg.com/736x/cb/c7/2b/cbc72bbe59fb3607062489fd470650ad.jpg", s:{cap:10,vic:6,tnk:10,hel:3,due:10,sp1:5,sp2:5,tra:1} },
  { name:"Marco",                 crew:"Whitebeard Pirates",col:"#3498DB", fruit:"Phoenix Fruit",           bounty:"1,374,000,000",   s:{cap:6,vic:10,tnk:7,hel:10,due:8,sp1:7,sp2:7,tra:3} },
  { name:"Shanks",                crew:"Red Hair Pirates",  col:"#C0392B", fruit:"No Devil Fruit",          bounty:"4,048,900,000",   img: "https://i.pinimg.com/736x/87/4f/76/874f76d4993a6defcdfa6f69ef42f025.jpg", s:{cap:10,vic:7,tnk:8,hel:3,due:10,sp1:6,sp2:6,tra:2} },
  { name:"Trafalgar D. Law",      crew:"Heart Pirates",     col:"#F1C40F", fruit:"Op-Op Fruit",             bounty:"3,000,000,000",   s:{cap:9,vic:7,tnk:5,hel:9,due:9,sp1:7,sp2:7,tra:7} },
  { name:"Eustass Kid",           crew:"Kid Pirates",       col:"#E74C3C", fruit:"Magnet-Magnet Fruit",     bounty:"3,000,000,000",   s:{cap:8,vic:6,tnk:8,hel:1,due:9,sp1:3,sp2:3,tra:4} },
  { name:"Killer",                crew:"Kid Pirates",       col:"#F39C12", fruit:"No Devil Fruit",          bounty:"200,000,000",     s:{cap:4,vic:7,tnk:5,hel:1,due:9,sp1:4,sp2:4,tra:5} },
  { name:"Dracule Mihawk",        crew:"Cross Guild",       col:"#BDC3C7", fruit:"No Devil Fruit",          bounty:"3,590,000,000",   s:{cap:7,vic:6,tnk:6,hel:1,due:10,sp1:2,sp2:2,tra:5} },
  { name:"Boa Hancock",           crew:"Amazon Lily",       col:"#C0392B", fruit:"Love-Love Fruit",         bounty:"1,659,000,000",   s:{cap:8,vic:6,tnk:5,hel:2,due:9,sp1:6,sp2:6,tra:6} },
  { name:"Donquixote Doflamingo", crew:"Donquixote Pirates",col:"#FFB6C1", fruit:"String-String Fruit",     bounty:"340,000,000",     s:{cap:9,vic:6,tnk:7,hel:1,due:9,sp1:5,sp2:5,tra:9} },
  { name:"Crocodile",             crew:"Cross Guild",       col:"#D35400", fruit:"Sand-Sand Fruit",         bounty:"1,965,000,000",   s:{cap:8,vic:6,tnk:6,hel:1,due:8,sp1:6,sp2:6,tra:8} },
  { name:"Gecko Moria",           crew:"Seven Warlords",    col:"#8E44AD", fruit:"Shadow-Shadow Fruit",     bounty:"320,000,000",     s:{cap:7,vic:4,tnk:5,hel:2,due:6,sp1:7,sp2:7,tra:8} },
  { name:"Charlotte Katakuri",    crew:"Big Mom Pirates",   col:"#E67E22", fruit:"Mochi-Mochi Fruit",       bounty:"1,057,000,000",   s:{cap:7,vic:10,tnk:9,hel:3,due:10,sp1:6,sp2:6,tra:3} },
  { name:"Charlotte Linlin",      crew:"Big Mom Pirates",   col:"#E74C3C", fruit:"Soul-Soul Fruit",         bounty:"4,388,000,000",   img: "https://i.pinimg.com/736x/88/ef/3a/88ef3a7bd2365da98cbfea3224b5ba4e.jpg", s:{cap:10,vic:5,tnk:10,hel:4,due:9,sp1:4,sp2:4,tra:2} },
  { name:"Kaido",                 crew:"Beasts Pirates",    col:"#2C3E50", fruit:"Dragon: Azure Dragon",    bounty:"4,611,100,000",   img: "https://i.pinimg.com/736x/6f/95/bc/6f95bcdb56de65dced46dfbfdfb2e65d.jpg", s:{cap:10,vic:5,tnk:10,hel:1,due:10,sp1:3,sp2:3,tra:2} },
  { name:"Marshall D. Teach",     crew:"Blackbeard Pirates",col:"#1A1A2E", fruit:"Dark-Dark + Tremor",      bounty:"3,996,000,000",   img: "https://i.pinimg.com/736x/8e/3c/79/8e3c79a95bc68d37449a0ce6a84eb8a6.jpg", s:{cap:9,vic:5,tnk:8,hel:1,due:9,sp1:3,sp2:3,tra:10} },
  { name:"Silvers Rayleigh",      crew:"Roger Pirates",     col:"#D35400", fruit:"No Devil Fruit",          bounty:"Unknown",         s:{cap:7,vic:10,tnk:7,hel:3,due:10,sp1:6,sp2:6,tra:3} },
  { name:"Gol D. Roger",          crew:"Roger Pirates",     col:"#F1C40F", fruit:"No Devil Fruit",          bounty:"5,564,800,000",   img: "https://i.pinimg.com/736x/cf/1a/10/cf1a1005191db0b3ec57fba3e18a8f4c.jpg", s:{cap:10,vic:5,tnk:8,hel:2,due:10,sp1:5,sp2:5,tra:1} },
  { name:"Monkey D. Garp",        crew:"Marines",           col:"#95A5A6", fruit:"No Devil Fruit",          bounty:"N/A",             img: "https://i.pinimg.com/736x/01/be/9a/01be9abadb56c42965ceb15df5ddfbd9.jpg", s:{cap:8,vic:7,tnk:9,hel:3,due:10,sp1:6,sp2:6,tra:3} },
  { name:"Akainu (Sakazuki)",     crew:"Marines",           col:"#C0392B", fruit:"Magma-Magma Fruit",       bounty:"N/A",             s:{cap:9,vic:6,tnk:8,hel:1,due:10,sp1:3,sp2:3,tra:4} },
  { name:"Aokiji (Kuzan)",        crew:"Marines",           col:"#3498DB", fruit:"Ice-Ice Fruit",           bounty:"N/A",             s:{cap:7,vic:7,tnk:7,hel:2,due:9,sp1:5,sp2:5,tra:7} },
  { name:"Kizaru (Borsalino)",    crew:"Marines",           col:"#F1C40F", fruit:"Glint-Glint Fruit",       bounty:"N/A",             s:{cap:6,vic:7,tnk:5,hel:1,due:10,sp1:4,sp2:4,tra:5} },
  { name:"Fujitora (Issho)",      crew:"Marines",           col:"#9B59B6", fruit:"Press-Press Fruit",       bounty:"N/A",             s:{cap:7,vic:7,tnk:7,hel:2,due:9,sp1:6,sp2:6,tra:4} },
  { name:"Yamato",                crew:"Wano Country",      col:"#5DADE2", fruit:"Dog-Dog: Okuchi",         bounty:"Unknown",         s:{cap:7,vic:8,tnk:9,hel:3,due:9,sp1:6,sp2:6,tra:4} },
  { name:"Enel",                  crew:"Skypiea (God)",     col:"#F1C40F", fruit:"Rumble-Rumble Fruit",     bounty:"500,000,000",     img: "https://i.pinimg.com/736x/a7/9d/28/a79d2870c5bc61fbfdccbaddbce045ff.jpg", s:{cap:9,vic:4,tnk:5,hel:2,due:9,sp1:3,sp2:3,tra:6} },
  { name:"Rob Lucci",             crew:"CP0",               col:"#34495E", fruit:"Cat-Cat: Leopard",        bounty:"N/A",             s:{cap:6,vic:8,tnk:7,hel:1,due:10,sp1:4,sp2:4,tra:8} },
  { name:"Perona",                crew:"Thriller Bark",     col:"#FFB6C1", fruit:"Hollow-Hollow Fruit",     bounty:"Unknown",         s:{cap:4,vic:5,tnk:2,hel:4,due:5,sp1:9,sp2:9,tra:7} },
  { name:"Emporio Ivankov",       crew:"Revolutionary Army",col:"#E84C3D", fruit:"Horm-Horm Fruit",         bounty:"Unknown",         s:{cap:6,vic:6,tnk:5,hel:9,due:7,sp1:8,sp2:8,tra:5} },
  { name:"Sabo",                  crew:"Revolutionary Army",col:"#E67E22", fruit:"Flame-Flame Fruit",       bounty:"602,000,000",     img:"https://i.pinimg.com/736x/8e/31/ff/8e31ff718a38ae4b4d13bd696bdedde6.jpg", s:{cap:7,vic:10,tnk:7,hel:2,due:9,sp1:6,sp2:6,tra:2} },
  { name:"Monkey D. Dragon",      crew:"Revolutionary Army",col:"#E74C3C", fruit:"Unknown/Wind",            bounty:"Unknown",         s:{cap:10,vic:5,tnk:8,hel:1,due:10,sp1:6,sp2:6,tra:1} },
  { name:"Sengoku",               crew:"Marines",           col:"#F1C40F", fruit:"Human-Human: Buddha",     bounty:"N/A",             s:{cap:10,vic:7,tnk:9,hel:4,due:9,sp1:7,sp2:7,tra:2} },
  { name:"King",                  crew:"Beasts Pirates",    col:"#2C3E50", fruit:"Dragon-Dragon: Pteranodon", bounty:"1,390,000,000", s:{cap:6,vic:9,tnk:9,hel:1,due:9,sp1:4,sp2:4,tra:4} },
  { name:"Buggy the Clown",       crew:"Cross Guild",       col:"#E74C3C", fruit:"Chop-Chop Fruit",         bounty:"3,189,000,000",   s:{cap:6,vic:3,tnk:2,hel:1,due:3,sp1:3,sp2:3,tra:9} },
  { name:"Corazon (Rosinante)",   crew:"Donquixote Pirates",col:"#E74C3C", fruit:"Calm-Calm Fruit",         bounty:"Unknown",         s:{cap:4,vic:6,tnk:4,hel:7,due:5,sp1:9,sp2:9,tra:8} },
];

// PROCEDURAL FILLER REMOVED. Strictly relying on Lore-Accurate Handcoded rosters.

let idCounter = 1;
export const CHARS = [];

let seed = 1234;
function pseudoRandom() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Logic to derive Base Power based on Bounty & Lore
function getBasePower(bountyStr, crew, name) {
  if (["Marines", "CP0"].includes(crew) && ["N/A", "Unknown"].includes(bountyStr)) {
    // Admirals and top Marines
    if (name.includes("Akainu") || name.includes("Aokiji") || name.includes("Kizaru") || name.includes("Fujitora") || name.includes("Garp") || name.includes("Rob Lucci") || name.includes("Sengoku")) return 10;
    return 5;
  }
  // God-tier or Supreme Leaders
  if (crew === "Skypiea (God)" || name.includes("Rayleigh") || name.includes("Dragon")) return 10;
  // Sabo is empirically super strong (Emperor commander tier)
  if (name.includes("Sabo")) return 8;
  
  if (!bountyStr || bountyStr === "N/A" || bountyStr === "Unknown") return 2;

  const num = parseInt(bountyStr.replace(/,/g, ""));
  if (num >= 3000000000) return 10;
  if (num >= 1000000000) return 7;
  if (num >= 500000000) return 5;
  if (num >= 100000000) return 3;
  return 1;
}

// 1. First, load the 40 hyper-accurate overrides
PERFECT_OVERRIDES.forEach(char => {
  CHARS.push({
    id: idCounter++,
    name: char.name,
    crew: char.crew,
    col: char.col,
    fruit: char.fruit,
    bounty: char.bounty,
    basePwr: getBasePower(char.bounty, char.crew, char.name),
    // Provide a beautiful fantasy avatar proxy if no direct link is available!
    img: char.img || `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(char.name)}&backgroundColor=${char.col.replace('#','')}`,
    s: char.s
  });
});

// Now, load the remaining 100+ fully Canon curated characters
CANON_ROSTER.forEach(char => {
  CHARS.push({
    id: idCounter++,
    name: char.name,
    crew: char.crew,
    col: char.col,
    fruit: char.fruit,
    bounty: char.bounty,
    basePwr: getBasePower(char.bounty, char.crew, char.name),
    img: `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(char.name)}&backgroundColor=${char.col.replace('#','')}`,
    s: char.s
  });
});

export const emptySlots = () => Object.fromEntries(ROLES.map(r => [r.key, null]));

export function calcScore(slots) {
  let total = 0;
  for (const r of ROLES) {
    const c = slots[r.key];
    if (!c) continue;
    if (r.key === "tra") {
      total -= (c.s.tra + c.basePwr);
    } else {
      total += c.s[r.key] + c.basePwr;
    }
  }
  return Math.max(0, total);
}

export function isComplete(slots) {
  return ROLES.every(r => !!slots[r.key]);
}
