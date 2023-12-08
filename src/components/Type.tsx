export interface PokemonName {
  id: number;
  name: string;
  image: string;
  url: string;
  types: Type[];
  abilities: Ability[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
  };
}
export interface filterType {
  name: string;
}

export interface searchName {
  name: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Stat2;
}

export interface Stat2 {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Type2;
}

export interface Type2 {
  name: string;
  url: string;
}
export interface Ability {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
}

export interface Ability2 {
  name: string;
  url: string;
}
