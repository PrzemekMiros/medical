const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const Image = require('@11ty/eleventy-img');

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/docs");
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addWatchTarget("src/assets/sass");

  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

  // Date
  eleventyConfig.addFilter('dateDisplay', require('./src/filters/date-display.js'));
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Collections blog
  eleventyConfig.addCollection('posts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/blog/**/*.md').reverse();
  });

  // Collections services
  eleventyConfig.addCollection('services', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/uslugi/**/*.md').reverse();
  });


  // SHORTCODE: Image
  eleventyConfig.addNunjucksAsyncShortcode('Image', async (src, alt) => {
    if (!alt) {
      throw new Error(`Missing \`alt\` on Image shortcode: ${src}`);
    }

    let stats = await Image(src, {
      widths: [25, 320, 640, 960, 1200, 1800, 2400],
      formats: ['jpeg', 'webp'],
      urlPath: '/assets/img/',
      outputDir: './public/assets/img/',
    });

    let lowestSrc = stats['jpeg'][0];

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].map(img => img.srcset).join(', ')
      }),
      {}
    );

    const source = `<source type="image/webp" srcset="${srcset['webp']}">`;

    const img = `<img
        loading="lazy"
        alt="${alt}"
        src="${lowestSrc.url}"
        sizes="(min-width: 1024px) 1024px, 100vw"
        srcset="${srcset['jpeg']}"
        width="${lowestSrc.width}"
        height="${lowestSrc.height}"
      >`;

    return `<div class="image-wrapper"><picture>${source}${img}</picture></div>`;
  });

  // FILTER: Image → wrapper do shortcode
  eleventyConfig.addNunjucksAsyncFilter("Image", async (src, alt) => {
    return eleventyConfig.javascriptFunctions.Image(src, alt);
  });


eleventyConfig.addAsyncShortcode("Gallery", async (images) => {
  if (!images || !Array.isArray(images)) {
    return "<div>Brak zdjęć w galerii.</div>";
  }

  let html = `<div class="md-gallery">`;

  for (const src of images) {
    // używamy prostego <img>, bez 11ty-image żeby uniknąć kolejnej dramy
    html += `<div class="md-gallery-item">
                    <a href="${src}" class="glightbox" data-no-swup>
                    <img src="${src}" loading="lazy" alt="">
              </a>
    </div>`;
  }

  html += `</div>`;
  return html;
});



  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes"
    }
  };
};
