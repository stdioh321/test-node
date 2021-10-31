const fs = require("fs");

const fileRead = `${__dirname}/docs/file2.txt`;
const fileWrite = `${__dirname}/docs/file-write.txt`;
if (fs.existsSync(fileWrite)) fs.rmSync(fileWrite);
const readStream = fs.createReadStream(fileRead, { highWaterMark: 2 * 1024 });
const writeStream = fs.createWriteStream(fileWrite);

// readStream.on("data", (chunck) => {
//     // console.log(chunck.toString());
//     writeStream.write(chunck);
//     writeStream.write("\n==============================================================================================================================================================================================================================================================================");
//     writeStream.write("\nNEW CHUNCK\n");
//     writeStream.write("==============================================================================================================================================================================================================================================================================\n");
// });
// readStream.on("end", () => {
//     console.log("readStream ENDED");
// });
// writeStream.on("close", () => {
//     console.log("writeStream on finish");
// });
readStream.pipe(writeStream);