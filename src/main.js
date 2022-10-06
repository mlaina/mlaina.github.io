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


// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};