window.onload = function () {

    //zmienne
    var titleInput = document.getElementById("titleinput");
    var descriptionInput = document.getElementById("descrinput");
    var stan = document.getElementById("stan");
    var confirmBtn = document.getElementById("addbutton");
    var clearBtn = document.getElementById("clearbutton");
    var arr = [];

    //przycisk
    var tbodyElement = document.getElementById("tbodyID");

    clearBtn.addEventListener("click", Clear);
    confirmBtn.addEventListener("click", addTask);

    function Clear() {
        titleInput.value = '';
        descriptionInput.value = '';
    }

    function addTask() {
        var newTask = {
            title: titleInput.value,
            description: descriptionInput.value,
            stan: stan.value
        }
        arr.push(newTask);
        showData(arr);
    }

    function showData(arr) {
        tbodyElement.innerHTML = "";

        //nowy wiersz
        for (var i = 0; i < arr.length; i++) {
            var newRows = document.createElement("tr");
            var tdDeleteBtn = document.createElement("td");
            var tdEditBtn = document.createElement("td");

            var deleteBtn = document.createElement("button");
            var editBtn = document.createElement("button");

            //nowe komórki
            createTd(arr[i].title, newRows);
            createTd(arr[i].description, newRows);
            createTd(arr[i].stan, newRows);


            tdDeleteBtn.appendChild(deleteBtn);
            tdEditBtn.appendChild(editBtn);

            deleteBtn.className = "btn btn-info";
            editBtn.className = "btn btn-info";
            newRows.appendChild(tdDeleteBtn);
            newRows.appendChild(tdEditBtn);

            tbodyElement.appendChild(newRows);

            deleteBtn.innerText = "Usuń";
            deleteBtn.setAttribute("data-id-button", i);
            deleteBtn.addEventListener("click", deleteItem);

            editBtn.innerText = "Edytuj";
            editBtn.setAttribute("data-id-button-edit", i);
            editBtn.addEventListener("click", editItem);
        }



        function createTd(value, row) {
            var cell = document.createElement("td");
            cell.innerText = value;
            row.appendChild(cell);
            return cell;
        }
    }

    function deleteItem(e) {
        var indexBtn = e.target.getAttribute("data-it-button");
        arr.splice(indexBtn, 1);
        showData(arr);
    }

    function editItem(e) {
        var indexEditButton = e.target.getAttribute("data-id-button-edit");
        // arr[]
        var newEditValue = getCustomerDetails(indexEditButton);
        fillInputs(newEditValue);
        confirmBtn.removeEventListener("click", addTask);
        confirmBtn.addEventListener("click", editConfirm);

      }
    
      function fillInputs(customer) {
        titleInput.value = customer.title;
        descriptionInput.value = customer.description;
      }

      function getCustomerDetails(index) {
        return arr[index];
      }
      function editConfirm() {
        var editedCustomer = {
          title: titleInput.value,
          description: descriptionInput.value,
        };
        getCustomerDetails(editedCustomer);
        showData(arr);
      }
}

