import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";

(async () => {
  await imagemin(['public/images/team/*.jpg'], {
    destination: 'public/images/team/',
    plugins: [
      imageminMozjpeg(),
    ]
  })
})();