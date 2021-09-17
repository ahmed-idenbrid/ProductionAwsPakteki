const fileSystem = require("fs");

const CreateFileAndSendData = (chunkedData, chunkIndex, response) => {
  fileSystem.writeFileSync(
    "./dataCollectionFiles/allNewsData.json",
    JSON.stringify(chunkedData),
    function (err) {
      if (err) {
        response.send({ Message: err.message });
        ReadExistingFileAndSendData(chunkIndex, response);
      } else {
        ReadExistingFileAndSendData(chunkIndex, response);
      }
    }
  );
};

const ReadExistingFileAndSendData = (chunkIndex, response) => {
  var data = fileSystem.readFileSync("./dataCollectionFiles/allNewsData.json");

  try {
    const myObj = JSON.parse(data);
    const chunkData = myObj[chunkIndex];
    if (chunkData === undefined) {
      response.send({ Message: "No Data Found" });
    } else {
      response.send({ success: true, chunkData });
    }
  } catch (err) {
    response.send({ Message: err.message });
  }
};

module.exports = {
  CreateFileAndSendData,
  ReadExistingFileAndSendData,
};
