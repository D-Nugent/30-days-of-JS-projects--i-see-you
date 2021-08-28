// html selectors
const mainWindow = document.querySelector('body');
const leftEye = document.querySelector('.hero-image__left-eye');
const rightEye = document.querySelector('.hero-image__right-eye');
const primaryDoc = document.documentElement;

// event listeners
mainWindow.addEventListener('mousemove', eyeShift);

// control variables
let xConstraint = 2;
let yConstraint = 1;
const leftEyeInitialX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--left-eye-x')); 
const leftEyeInitialY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--left-eye-y')); 
const rightEyeInitialX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--right-eye-x')); 
const rightEyeInitialY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--right-eye-y')); 

// functions
function eyeShift(e){
  const {offsetWidth:width, offsetHeight: height} = mainWindow;
  let {offsetX:x,offsetY:y} = e;
  if (this !== e.target) {
    const {left:targetLeft,top:targetTop} = e.target.getBoundingClientRect();
    x = x+ Math.round(targetLeft);
    y = y+ Math.round(targetTop);
  }
  const [centerX,centerY] = [width/2,height/2];
  const xLean = ((x-centerX)/centerX);
  const yLean = ((y-centerY)/centerY);
  const newLeftEyeX = leftEyeInitialX + (xLean * xConstraint);
  const newLeftEyeY = leftEyeInitialY + (yLean * yConstraint);
  const newRightEyeX = rightEyeInitialX + (xLean * xConstraint);
  const newRightEyeY = rightEyeInitialY + (yLean * yConstraint);
  updateEyePosition(newLeftEyeX,newLeftEyeY,newRightEyeX,newRightEyeY);
}

function updateEyePosition(leftX,leftY,rightX,rightY) {
  primaryDoc.style.setProperty('--left-eye-x',`${leftX}%`);
  primaryDoc.style.setProperty('--left-eye-y',`${leftY}%`);
  primaryDoc.style.setProperty('--right-eye-x',`${rightX}%`);
  primaryDoc.style.setProperty('--right-eye-y',`${rightY}%`);
}