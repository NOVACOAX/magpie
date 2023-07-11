$(document).ready(async function () {
  const lenis = new Lenis({});
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lightbox.option({
    'disableScrolling': true,
    'wrapAround': true,
  });

  const folderPath = 'assets/images/thumbnails/';
  const galleryContainer = $('.gallery');
  // Fetch the images from the folder
  $.ajax({
    url: folderPath,
    success: function(data) {
      $(data).find('a').attr('href', function(index, value) {
        if (value.match(/\.(jpe?g|png|gif)$/)) {
          const imageName = value.substring(value.lastIndexOf('/') + 1);
          const imagePath = folderPath + imageName;

          // Create the HTML template for the image
          const imageTemplate = `
            <a href="./assets/images/large/${imageName}" data-lightbox="gallery" class="${getImageClass(imagePath)}">
              <img loading="lazy" src="${imagePath}" alt="image" draggable="false">
            </a>
          `;
          // Append the image template to the gallery container
          galleryContainer.append(imageTemplate);
        }
      });
    }
  });

  // Function to determine the image class based on its width and height
  function getImageClass(imagePath) {
    const image = new Image();
    image.src = imagePath;
    if (image.width > (image.height * 1.4)) {
      return 'wide';
    }
    return '';
  }
})