const fileSystem = require("fs");

const CreateFileAndSendData = (chunkedData, chunkIndex, response) => {
  fileSystem.writeFileSync(
    "./dataCollectionFiles/allNewsData.json",
    JSON.stringify(chunkedData)
  );
  ReadExistingFileAndSendData(chunkIndex, response);
};

const ReadExistingFileAndSendData = (chunkIndex, response) => {
  var data = fileSystem.readFileSync("./dataCollectionFiles/allNewsData.json");
  const myObj = JSON.parse(data);
  const chunkData = myObj[chunkIndex];
  if (chunkData === undefined) {
    response.send({ Message: "No Data Found" });
  } else {
    response.send({ success: true, chunkData });
  }
};

module.exports = {
  CreateFileAndSendData,
  ReadExistingFileAndSendData,
};
