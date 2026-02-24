import type { CommonTypes, ItemData, ItemTypes, Tab } from "hytale-generators";
import { global, syncJson, syncLang, syncTexture, toPascal } from "hytale-generators";

export type ExampleData = Required<
  Pick<ItemData, CommonTypes | ItemTypes> & {
    PlayerAnimationsId: "Item";
  }
>;

interface ExampleConfig {
  id: string;
  name?: string;
  icon?: string;
  categories?: Tab[];
  model?: string;
  texture?: string;
  maxStack?: number;
  color: string;
}

export function example(config: ExampleConfig) {
  const { modId, outDir } = global();
  const { id, name, categories, model, texture, color, maxStack } = config;

  syncLang([
    {
      key: `items.${modId}.Example_${id}.name`,
      value: name || id
    }
  ]);

  syncJson<ExampleData>(
    `${outDir}/Server/Item/Items/Example/Example_${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Example_${id}.name`
      },
      ...(config.icon ? { Icon: `Icons/ItemsGenerated/Gas_${config.id}.png` } : {}),
      categories: categories || [`${modId}.Example`],
      model: `Resources/${model || "Example"}.blockymodel`,
      texture: `Resources/${texture || id}.png`,
      itemLevel: 35,
      playerAnimationsId: "Item" as const,
      iconProperties: {
        scale: 0.75,
        translation: [0.9, -5.1],
        rotation: [22.5, 45, 22.5]
      },
      tags: {
        type: ["Ingredient"],
        family: ["Example"]
      },
      itemEntity: {
        particleSystemId: undefined
      },
      resourceTypes: [
        {
          id: "Metal_Bars"
        }
      ],
      itemSoundSetId: "ISS_Items_Leather",
      dropOnDeath: true,
      maxStack: maxStack || 100
    })
  );

  syncTexture({
    color,
    inputFile: `example-mask`,
    outputFile: `Resources/${id}`
  });
}
