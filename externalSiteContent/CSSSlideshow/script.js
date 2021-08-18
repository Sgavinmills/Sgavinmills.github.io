const imageSelection = [['images/comingsoon2.png', '#'], ['images/comingsoon.jpg', '##'],
['images/comingsoon3.jpeg', '###']]
const imageContainer = document.getElementById('imageContainer');
const frame = document.getElementById('frame');
const image = document.getElementById('image');
const imageLink = document.getElementById('imageLink');
let photoNumber = 0;
let showRunning = false;

frame.addEventListener('click',() => {
    if(!showRunning) {
        image.setAttribute('src', imageSelection[0][0])
        imageContainer.classList.add('imageContainerAnimation');
        imageLink.setAttribute('href', imageSelection[photoNumber][1]);
        showRunning = true;
    }
})

imageContainer.addEventListener("animationend", () => {
   imageContainer.classList.remove('imageContainerAnimation');
   photoNumber++;
   if(photoNumber >= imageSelection.length) {
       photoNumber = 0;
   }
   image.setAttribute('src', imageSelection[photoNumber][0]);
   imageLink.setAttribute('href', imageSelection[photoNumber][1]);
   setTimeout(() => {
    imageContainer.classList.add('imageContainerAnimation');
   }, 10)
})

