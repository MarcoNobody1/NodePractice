import fs from "fs";

const data = fs.readFileSync("countries.txt", "utf8");

const separatedData: string[] = data.split("\n");

const arrangedData = separatedData.map((country) =>
  country.split(" ").reverse()
);

const filteredLocations = arrangedData.filter(country => isNaN(parseInt(country[2])) === true);

const dataInObject = filteredLocations
  .map((country) => {
    const area = parseInt(country[0].replace(/,/g, ""));
    const population = parseInt(country[1].replace(/,/g, ""));
    const density = Math.round(population / area);
    

    return {
      area: area < 10 ? undefined : area,
      population: isNaN(population) ? undefined : population,
      location: country.splice(2, country.length-1).reverse().join(" "),
      density: density,
    };
  })
  .filter(
    (country) =>
      country.area !== undefined &&
      country.population !== undefined &&
      country.density !== undefined
  );



const sortedCountries = dataInObject.sort((a, b) => b.density - a.density);

console.log(sortedCountries)

sortedCountries.map((country) => {
  fs.writeFileSync("countries.csv", `${country.location},${country.population},${country.area},${country.density},`,{
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
      }
  );
});