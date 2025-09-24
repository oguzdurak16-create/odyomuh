const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  
  // Admin panelini ve CSS klasörünü _site klasörüne kopyala.
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("css");

  // Luxon paketini kullanarak tarihleri formatlamak için bir filtre ekliyoruz.
  // Hatanın çözümü tam olarak bu kısımdır.
  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat(format);
  });

  return {
    // Markdown dosyalarının Nunjucks ile işlenmesini sağlıyoruz.
    // Bu, şablonlama dilinde tutarlılık sağlar.
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    }
  };
};