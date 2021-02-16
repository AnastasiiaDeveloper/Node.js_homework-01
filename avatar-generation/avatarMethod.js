const AvatarGenerator = require("avatar-generator");

const fsPromises = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

async function generationAvatar() {
  try {
    const avatar = new AvatarGenerator();

    const fileName = `${uuidv4()}.png`;
    const filePath = `tmp/${fileName}`;

    const image = await avatar.generate(null, "male");
    await image.png().toFile(filePath);

    const srcPatch = `./tmp/${fileName}`;
    const destPath = `./public/images/${fileName}`;
    await fsPromises.copyFile(srcPatch, destPath);
    await fsPromises.unlink;

    return `public/images/${fileName}`;
  } catch (error) {
    console.log(error);
  }
}

module.exports.generationAvatar = generationAvatar;
