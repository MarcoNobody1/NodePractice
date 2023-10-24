"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync("countries.txt", "utf8");
const separatedData = data.split("\n");
const arrangedData = separatedData.map((country) => country.split(" ").reverse());
const filteredLocations = arrangedData.filter(country => isNaN(parseInt(country[2])) === true);
const dataInObject = filteredLocations
    .map((country) => {
    const area = parseInt(country[0].replace(/,/g, ""));
    const population = parseInt(country[1].replace(/,/g, ""));
    const density = Math.round(population / area);
    return {
        area: area < 10 ? undefined : area,
        population: isNaN(population) ? undefined : population,
        location: country.splice(2, country.length - 1).reverse().join(" "),
        density: density,
    };
})
    .filter((country) => country.area !== undefined &&
    country.population !== undefined &&
    country.density !== undefined);
const sortedCountries = dataInObject.sort((a, b) => b.density - a.density);
console.log(sortedCountries);
sortedCountries.map((country) => {
    fs_1.default.writeFileSync("countries.csv", `${country.location},${country.population},${country.area},${country.density},`, {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    });
});
