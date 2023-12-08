import {
  Card,
  Col,
  Row,
  Typography,
  Space,
  Pagination,
  Form,
  Input,
  Select,
} from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import "./DataPokemon.css";
import { PokemonName, Ability, Stat, Type } from "./Type";
import { useSelector, useDispatch } from "react-redux";
import {
  setPokemon,
  setCurrentPage,
  setSearchName,
  setFilterType,
} from "../redux/reducer";

const DataPokemon = () => {
  const { pokemon, searchName, filterType } = useSelector(
    (state: any) => state.pokemon
  );
  const currentPage = useSelector((state: any) => state.currentPage);
  const dispatch = useDispatch();
  const handleChange = (page: number) => {
    dispatch(setCurrentPage(page));
    fetchPokemon(page);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    dispatch(setSearchName(searchValue));
  };

  const handleFilter = (value: string) => {
    dispatch(setFilterType(value));
  };
  const fetchPokemon = async (page: number) => {
    const offset = (page - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
    const res = await axios.get(url);
    const pokemonData = res.data.results as PokemonName[];
    const pokemonWithImagesAndTypes = await Promise.all(
      pokemonData.map(async (poke: PokemonName) => {
        const pokemonRes = await axios.get(poke.url);
        const abilities = pokemonRes.data.abilities.map(
          (ability: Ability) => ability.ability.name
        );
        const stats: {
          hp: number;
          attack: number;
          defense: number;
          "special-attack": number;
          "special-defense": number;
          speed: number;
        } = {
          hp: 0,
          attack: 0,
          defense: 0,
          "special-attack": 0,
          "special-defense": 0,
          speed: 0,
        };
        pokemonRes.data.stats.forEach((stat: Stat) => {
          const statName = stat.stat.name;
          if (statName === "hp") {
            stats.hp = stat.base_stat;
          } else if (statName === "attack") {
            stats.attack = stat.base_stat;
          } else if (statName === "defense") {
            stats.defense = stat.base_stat;
          } else if (statName === "special-attack") {
            stats["special-attack"] = stat.base_stat;
          } else if (statName === "special-defense") {
            stats["special-defense"] = stat.base_stat;
          } else if (statName === "speed") {
            stats.speed = stat.base_stat;
          }
        });
        const pokemon = {
          id: pokemonRes.data.id,
          name: poke.name,
          image: pokemonRes.data.sprites.other.home.front_default,
          types: pokemonRes.data.types.map((type: Type) => type.type.name),
          url: poke.url,
          abilities,
          stats,
        };
        return pokemon;
      })
    );
    dispatch(setPokemon(pokemonWithImagesAndTypes));
  };

  useEffect(() => {
    fetchPokemon(currentPage);
  });

  return (
    <>
      <Form.Item label="Name" style={{ marginTop: "50px" }}>
        <Input
          type="text"
          onChange={(e) => handleSearch(e)}
          value={searchName}
        />
      </Form.Item>
      <Form.Item label="Type">
        <Select onChange={(value) => handleFilter(value)} value={filterType}>
          <Select.Option value="Normal" key="Normal">
            Normal
          </Select.Option>
          <Select.Option value="Fire" key="Fire">
            Fire
          </Select.Option>
          <Select.Option value="Water" key="Water">
            Water
          </Select.Option>
          <Select.Option value="Electric" key="Electric">
            Electric
          </Select.Option>
          <Select.Option value="Grass" key="Grass">
            Grass
          </Select.Option>
          <Select.Option value="Ice" key="Ice">
            Ice
          </Select.Option>
          <Select.Option value="Fighting" key="Fighting">
            Fighting
          </Select.Option>
          <Select.Option value="Poison" key="Poison">
            Poison
          </Select.Option>
          <Select.Option value="Ground" key="Ground">
            Ground
          </Select.Option>
          <Select.Option value="Flying" key="Flying">
            Flying
          </Select.Option>
          <Select.Option value="Psychic" key="Psychic">
            Psychic
          </Select.Option>
          <Select.Option value="Bug" key="Bug">
            Bug
          </Select.Option>
          <Select.Option value="Rock" key="Rock">
            Rock
          </Select.Option>
          <Select.Option value="Ghost" key="Ghost">
            Ghost
          </Select.Option>
          <Select.Option value="Dark" key="Dark">
            Dark
          </Select.Option>
          <Select.Option value="Dragon" key="Dragon">
            Dragon
          </Select.Option>
          <Select.Option value="Steel" key="Steel">
            Steel
          </Select.Option>
          <Select.Option value="Fairy" key="Fairy">
            Fairy
          </Select.Option>
        </Select>
      </Form.Item>
      <Row
        justify={"center"}
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <Col>
          <img src="img/ball.png" style={{ width: "75px" }} />
        </Col>
        <Col>
          <h1>List of Type Pokemon</h1>
        </Col>
      </Row>
      <Row gutter={24}>
        {pokemon
          .filter((poke: PokemonName) => {
            return !searchName || poke.name.toLowerCase().includes(searchName);
          })
          .filter((poke: PokemonName) => {
            if (filterType === "") {
              return true;
            }
            const TypePokemon = poke.types.includes(filterType.toLowerCase());
            return TypePokemon;
          })
          .map((poke: PokemonName, index: number) => (
            <Col className="poke" key={index} span={6}>
              <Card className="poke-card">
                <Typography.Title level={1}># {poke.id}</Typography.Title>
                <Typography.Title className="poke-name" level={1}>
                  {poke.name}
                </Typography.Title>
                <img src={poke.image} alt={poke.name} className="card-image" />
                <div className="poke-image">
                  <Space>
                    {poke.types.map((type, index: number) => (
                      <div className={`poke-image-type ${type}`} key={index}>
                        <img
                          src={`/img/${type}.png`}
                          alt={`Image of ${type} Pokemon`}
                          style={{ maxWidth: "50px", margin: "5px" }}
                        />
                      </div>
                    ))}
                  </Space>
                </div>
                <Typography.Title level={2}>Base Stat</Typography.Title>
                <Row style={{ marginBottom: "20px", color: "#FFFFFF" }}>
                  <Col span={8}>
                    <div className="poke-stat-hp">
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        HP
                      </Typography.Title>
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        {poke.stats.hp}
                      </Typography.Title>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="poke-stat-attack">
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        ATK
                      </Typography.Title>
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        {poke.stats.attack}
                      </Typography.Title>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="poke-stat-defense">
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        DEF
                      </Typography.Title>
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        {poke.stats.defense}
                      </Typography.Title>
                    </div>
                  </Col>
                </Row>
                <Row style={{ color: "#FFFFFF" }}>
                  <Col span={8}>
                    <div className="poke-stat-sp_atk">
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        SP-Atk
                      </Typography.Title>
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        {poke.stats["special-attack"]}
                      </Typography.Title>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="poke-stat-sp_def">
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        SP-Def
                      </Typography.Title>
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        {poke.stats["special-defense"]}
                      </Typography.Title>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="poke-stat-speed">
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        Speed
                      </Typography.Title>
                      <Typography.Title
                        level={5}
                        style={{ margin: "0px", color: "#FFFFFF" }}
                      >
                        {poke.stats.speed}
                      </Typography.Title>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
      </Row>
      <Row>
        <Pagination
          total={1281}
          showTotal={(total) => `We have ${total} Pokemon`}
          defaultPageSize={20}
          defaultCurrent={1}
          onChange={handleChange}
        />
      </Row>
    </>
  );
};

export default DataPokemon;
