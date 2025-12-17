const fs = require('fs');
const path = require('path');

// 画像が格納されているディレクトリ
const newsImagesDir = path.join(__dirname, 'assets', 'images_news');
// 出力するJSONファイルのパス
const outputFile = path.join(__dirname, '..', 'src', 'news-images.json');

const newsImageMap = {};

try {
  // `public/images_news` 直下のディレクトリ名（例: 'new_website', 'ACMBJSMB'）を取得
  const newsFolders = fs.readdirSync(newsImagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // 各ニュースフォルダをループ処理
  newsFolders.forEach(folder => {
    const folderPath = path.join(newsImagesDir, folder);
    // フォルダ内の画像ファイル（png, jpg, jpeg, gif, webp）を取得
    const imageFiles = fs.readdirSync(folderPath)
      .filter(file => /\.(png|jpe?g|gif|webp)$/i.test(file));

    // publicフォルダからの相対パスのリストを作成
    const imageUrls = imageFiles.map(file => `/images_news/${folder}/${file}`);
    newsImageMap[folder] = imageUrls;
  });

  // 取得した情報をJSONファイルとして書き出す
  fs.writeFileSync(outputFile, JSON.stringify(newsImageMap, null, 2));
  console.log('✅ Successfully generated news images JSON!');

} catch (error) {
  console.error('❌ Error generating news images JSON:', error);
  // エラーが発生してもビルドが止まらないよう、空のオブジェクトを書き出す
  fs.writeFileSync(outputFile, JSON.stringify({}, null, 2));
}