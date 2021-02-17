const AvatarGenerator = require("avatar-generator");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
async function deleteImg(url) {
  await fsPromises.unlink(url);
}
async function generationAvatar() {
  try {
    const avatar = new AvatarGenerator();

    const fileName = `${uuidv4()}.png`;
    const filePath = `tmp/${fileName}`;

    const image = await avatar.generate(null, "male");
    const srcPatch = `tmp/${fileName}`;
    const destPath = `public/images/${fileName}`;
    await image.png().toFile(filePath);

    await fsPromises.copyFile(srcPatch, destPath);
    await fsPromises.unlink(srcPatch);

    return `public/images/${fileName}`;
  } catch (error) {
    console.log(error);
  }
}

module.exports.generationAvatar = generationAvatar;
module.exports.deleteImg = deleteImg;
