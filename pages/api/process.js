import sharp from "sharp";
import fetch from "node-fetch";

export default async (req, res) => {
  const { imageUrl, color, credits } = JSON.parse(req.body)

  try {
    const sourceImage = await fetch(imageUrl).then((res) => res.buffer());
    const svg = await sharp(
      Buffer.from(`<svg width="1080" height="680" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="50"/>
        <stop offset="10%" stop-color="${color}" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="Gradient2" x1="0" x2="0" y1="1" y2="0">
        <stop offset="0%" stop-color="${color}" stop-opacity="50"/>
        <stop offset="10%" stop-color="${color}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <style type="text/css"><![CDATA[
      #rect1 { fill: url(#Gradient1); }
      ]]></style>
    <rect id="rect1" x="0" y="0" width="1080" height="680"/>
    <rect x="0" y="0" width="1080" height="680" fill="url(#Gradient2)"/>
  </svg>`)
    ).toBuffer();

    const fadedImage = await sharp(sourceImage)
      .resize(1080, 680, {
        fit: "cover",
      })
      .composite([{ input: svg }])
      .toBuffer();

    const creditsImage = await sharp(Buffer.from(`<svg viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <style>.text{text-transform: uppercase;}</style>
    <text class="text" x="5" y="1910" font-size="28" font-family="Arial" class="small">${credits}</text>
  </svg>`)).toBuffer();

    const image = await sharp({
      create: {
        width: 1080,
        height: 1920,
        channels: 4,
        background: color,
      },
    })
      .composite([
        { input: fadedImage, top: 220, left: 0 },
        { input: creditsImage, bottom: 5, right: 5 },
      ])
      .png()
      .toBuffer();

    res.json({
      image: image.toString("base64"),
    });
  } catch (error) {
    console.log(error);
  }
};
