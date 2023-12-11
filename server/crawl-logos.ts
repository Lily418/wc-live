import { MongoClient, Binary } from "mongodb";

const url = `${process.env.WC_LIVE_MONGODB_URL}`;

const client = new MongoClient(url);

const dbName = "wc-live";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = await db.collection("fixtures").find({}).toArray();

  const logoUrlsDuplicated = collection
    .map((fixture) => {
      const homeLogo = fixture.teams.home.logo;
      const awayLogo = fixture.teams.away.logo;

      return [homeLogo, awayLogo];
    })
    .flat();

  const logoUrls = [...new Set(logoUrlsDuplicated)];

  const logos = await Promise.all(logoUrls.map((logoUrl) => fetch(logoUrl)));

  await Promise.all(
    logos.map(async (logo) => {
      const image = await logo.arrayBuffer();
      return db.collection("logos").insertOne({
        url: logo.url,
        image: new Binary(Buffer.from(image)),
      });
    })
  );
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
