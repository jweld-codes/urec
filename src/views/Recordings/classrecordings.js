export function initClassRecordings() {
  document.addEventListener('DOMContentLoaded', function() {
      var acc = document.getElementsByClassName("accordion");
      
      for (let i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
              console.log('Accordion clicked');
              this.classList.toggle("active");
              
              var panel = this.nextElementSibling;
              
              if (panel.style.display === "block") {
                  panel.style.display = "none";
              } else {
                  panel.style.display = "block";
              }
          });
      }
  });
}
