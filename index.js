const SourceModel = require("./source-collection")("{yourcollection}");
const TargetModel = require("./target-collection")("{yourcollection}");

let numberOfDocuments = 0;

async function run() {
  const cursor = SourceModel.aggregate([{ $match: {} }])
    .allowDiskUse(true)
    .cursor({ batchSize: 5000 })
    .exec();

  await cursor.eachAsync((result) => {
    const targetModel = new TargetModel(result);
    targetModel
      .save(result)
      .then((res) => {
        numberOfDocuments++;
        console.log("Copying", numberOfDocuments, "documents.");
      })
      .catch((err) => {
        if (err.code === 11000) {
          numberOfDocuments++;
          console.log("Copying", numberOfDocuments, "documents.");
        } else {
          console.log("Error: INSERT in target.");
        }
      });
  });

  console.log("Finish Mongodb Copy.");
}

run().catch((err) => {
  console.log("Error: FIND from source.");
});
