let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer();
  // Select the moreIndicator button and add a click event to:
  $('.moreIndicator').on('click', function () {
    $('.details').slideToggle();
    $('.moreIndicator').toggleClass('rot90');
  })
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').on('click', showNextPhoto);
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').on('click', showPrevPhoto);
  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images;
      const image = mImages[mCurrentIndex];
      $('#photo').attr('src', image.imgPath);
      $('.location').text(`Location: ${image.imgLocation}`);
      $('.description').text(`Description: ${image.description}`);
      $('.date').text(`Date: ${image.date}`);

      console.log("This is a test to see if JSON file is loading!");

    },
    error: function () {
      alert("Failed to load JSON file!");
    }
  })

}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {

  const image = mImages[mCurrentIndex];
  console.log(image.imgPath);
  $('#photo').attr('src', image.imgPath);
  $('.location').text(`Location: ${image.imgLocation}`);
  $('.description').text(`Description: ${image.description}`);
  $('.date').text(`Date: ${image.date}`);

}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  mCurrentIndex++;
  if (mCurrentIndex == mImages.length) {
    mCurrentIndex = 0;
  }
  swapPhoto()
}

function showPrevPhoto() {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length; // Move to the previous image in the slideshow, looping back to the last image if at the start
  swapPhoto()
}

// Starter code for the timer function
function startTimer() {
  setInterval(showNextPhoto, mWaitTime);
}
