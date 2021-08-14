const imageContainer = document.getElementById('imageContainer');
const frame = document.getElementById('frame');
const image = document.getElementById('image');
const imageLink = document.getElementById('imageLink');
let photoNumber = 0;
const imageSelection = [['../img/slideShowImages/firstSiteLarge.png', '../externalSiteContent/firstSite/index.html'], ['../img/slideShowImages/secondSiteLarge.png', '../externalSiteContent/secondSite/portfolio2/index.html'],
['../img/slideShowImages/thirdSiteLarge.png', '../externalSiteContent/thirdSite/AAR/index.html'], ['../img/slideShowImages/fourthSiteLarge.png', 'index.html']]
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