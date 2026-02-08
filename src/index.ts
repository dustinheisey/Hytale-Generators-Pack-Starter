import { manifest, setGlobal, syncPublic } from "hytale-generators";
import { example } from "./generators/example.ts";

setGlobal({
  ModId: "ExamplePack",
  MaxStack: 100,
  TimeSeconds: 20,
});

// ? Meta
syncPublic();

// ? Content
manifest({
  Group: "com.example",
  Name: "ExamplePack",
  Version: "0.1.0",
  Description: "This is an example pack",
  Authors: [
    {
      Name: "Example Name",
      Url: "https://www.example.com",
    },
  ],
  Website: "https://www.example.com",
});

example({
  Id: "Example",
  Input: {
    ItemId: "Ingot_Example",
    Quantity: 3,
  },
  Color: "#0829af",
});
