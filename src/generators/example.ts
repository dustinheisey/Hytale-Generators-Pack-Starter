import type { IconProperties, ItemEntity, Put, RecipeData, ThingConfig, ThingData } from "hytale-generators";
import { createGenerator, global } from "hytale-generators";

type Quality = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

interface ExampleConfig extends ThingConfig {
  OutputQuantity?: number;
  TimeSeconds?: number;
  Input: Put;
  Quality?: Quality;
  Color: string;
}

export interface ExampleData extends ThingData {
  Recipe: Omit<RecipeData, "PrimaryOutput"> & { OutputQuantity: number };
  Model: string;
  Texture: string;
  PlayerAnimationsId: string;
  IconProperties: IconProperties;
  ItemEntity: ItemEntity;
  ItemSoundSetId: string;
  DropOnDeath: boolean;
  Quality: Quality;
}

export const example = createGenerator<ExampleConfig, ExampleData>({
  lang: c => {
    return [
      {
        key: `items.${global().ModId}.Example_${c.Id}.name`,
        value: c.Name || c.Id,
      },
    ];
  },
  json: {
    path: c => `Server/Item/Items/Example/Example_${c.Id}`,
    data: c => {
      return {
        TranslationProperties: {
          Name: `server.items.${global().ModId}.Example_${c.Id}.name`,
        },
        Categories: c.Categories || ["Blocks.Ores"],
        Model: `Resources/Examples/${c.Model || "Example"}.blockymodel`,
        Texture: `Resources/Examples/${c.Texture || c.Id}.png`,
        Quality: c.Quality || "Common",
        ItemLevel: 35,
        Recipe: {
          Input: [c.Input],
          BenchRequirement: [
            {
              Type: "Processing",
              Id: "Furnace",
              RequiredTierLevel: 1,
            },
          ],
          TimeSeconds: c.TimeSeconds || global().TimeSeconds,
          OutputQuantity: 1,
        },
        PlayerAnimationsId: "Item",
        IconProperties: {
          Scale: 0.75,
          Translation: [0.9, -5.1],
          Rotation: [22.5, 45, 22.5],
        },
        Tags: {
          Type: ["Ingredient"],
          Family: ["Example"],
        },
        ItemEntity: {
          ParticleSystemId: null,
        },
        ItemSoundSetId: "ISS_Items_Leather",
        DropOnDeath: true,
        MaxStack: c.MaxStack || global().MaxStack,
      };
    },
  },
  texture: c => ({
    color: c.Color,
    inputFile: `src/assets/example-mask.png`,
    outputFile: `dist/Common/Resources/Examples/${c.Id}.png`,
  }),
});
