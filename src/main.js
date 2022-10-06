let lands = document.querySelectorAll('.lands');
let selected = document.querySelector('#selected');


for (let i=0; i<lands.length; i++) {

  lands[i].addEventListener('mouseover', () => {
    let path = document.querySelector('path#'+lands[i].id);

//    let rgb = getAverageRGB(lands[i].childNodes[1]);
    selected.setHTML(lands[i].id.toString().toUpperCase());

    path.style.fill='#772844';
   });

  lands[i].addEventListener('mouseout', () => {
    let path = document.querySelector('path#'+lands[i].id);

    selected.setHTML("");
    path.style.fill='#fff';
  });
}