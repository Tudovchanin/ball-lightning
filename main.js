

const elements = document.querySelectorAll('.elem');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let activeSlide;

const lengthElements = elements.length;
let index = 0;
let randomIndex = 0;

const next = () => {
  removeActiveClass();
  document.documentElement.style.setProperty('--value', '-200deg' );
  ++index
  index = index % lengthElements
  console.log(index);
  elements[index].classList.add('active');
}

const prev = () => {
  removeActiveClass();
  document.documentElement.style.setProperty('--value', '200deg' );
  --index
  index = ((index%lengthElements) + lengthElements) % lengthElements;
  elements[index].classList.add('active');
}

const randomSlide = (index) => {
  removeActiveClass();
  document.documentElement.style.setProperty('--value', '200deg' );
  elements[index].classList.add('active');
}


nextBtn.addEventListener('click', () => {
  next();
})

prevBtn.addEventListener('click', () => {
 prev();
})

const removeActiveClass = () => {
  elements.forEach(e => {
    e.classList.remove('active');
  })
}


const circle = document.querySelector('.circle');

let valueMousedownX = 0;
let valueMousedownY = 0;
let positionX = 0;
let positionY = 0;
let dragover = false;

circle.addEventListener('mousedown', (e)=> {
  e.preventDefault();
  console.log(e.clientX);
 
  valueMousedownX = e.clientX;
  valueMousedownY = e.clientY;
  dragover = true;
  document.body.classList.toggle('grabbing', dragover);
  activeSlide = document.querySelector('.active');
})

let widthPage = document.documentElement.clientWidth
console.log(widthPage);

window.addEventListener('mousemove', (e)=> {
e.preventDefault();

  if(!dragover) return;
randomIndex = Math.round((e.clientX / widthPage) * (lengthElements-1));

// console.log(e.clientX / widthPage);

if(randomIndex !== index) {
  console.log('изменить картинку на', randomIndex);
  index = randomIndex;
  randomSlide(index);
} else {

  // activeSlide.style.borderRadius = `${(e.clientX / widthPage) * 100}%`
}
  const valueX = e.clientX - valueMousedownX + positionX;
  const valueY = e.clientY - valueMousedownY + positionY;
  requestAnimationFrame(()=> {
    circle.style.transform = `translate(${valueX}px, ${valueY}px)`;
  })
})


window.addEventListener('mouseup', (e)=> {
  if(dragover) {
    positionX += (e.clientX - valueMousedownX);
    positionY += (e.clientY - valueMousedownY);
    activeSlide = null;
  }
  dragover = false;
  document.body.classList.toggle('grabbing', dragover)

});

