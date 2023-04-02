const inschrijfInputs = document.querySelectorAll(".coachselect__input");

// console.log(inschrijfInputs)

inschrijfInputs.forEach((input, i, nodeList) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      nodeList.forEach((inputDuplicate) => {
        if (inputDuplicate !== input) {
          inputDuplicate.checked = false;
        }
      });
    }
  });
});

// inschrijfInputs..change(function()
// {
//     $(".input.control__input--check").prop('checked',false);
//     $(this).prop('checked',true);
// });
