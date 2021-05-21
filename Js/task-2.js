let key = "list : " + sessionStorage.getItem("loginEmail");
let btn = document.getElementById("contactListId");

function objectToList(object) {
  let contactList = [];
  if (!object) return contactList;
  for (let i in object) {
    contactList.push(object[i]);
  }
  return contactList;
}

function counterInit() {
  if (localStorage.getItem("counter"))
    return parseInt(localStorage.getItem("counter"));
  else {
    localStorage.setItem("counter", 1);
    return 1;
  }
}
function signUp() {
  let email = document.getElementById("signInEmail").value;
  let password = document.getElementById("signInPassowrd").value;

  localStorage.setItem(email, password);
  return true;
}

function validateLogin() {
  let loginEmail = document.getElementById("validEmail").value;
  let loginPassword = document.getElementById("validPassowrd").value;
  let storedPassword = localStorage.getItem(loginEmail);

  if (storedPassword && loginPassword == storedPassword) {
    sessionStorage.setItem("loginEmail", loginEmail);
    console.log("Hi");
    window.location.assign(
      "C:/Users/Vandana/Desktop/Internship/Html/Task-2/viewContacts.html"
    );
  } else {
    console.log("Invalid");
    window.location.assign(
      "C:/Users/Vandana/Desktop/Internship/Html/Task-2/loginPage.html"
    );
  }
}

function addContact() {
  let id = counterInit();
  let contactName = document.getElementById("contactName").value;
  let contactNumber = document.getElementById("contactNumber").value;
  let contactPlace = document.getElementById("contactPlace").value;
  // let id = parseInt(localStorage.getItem("counter"));

  if (!contactName || !contactNumber || !contactPlace) {
    alert("Required name,contact,place");
    return;
  }

  let list = JSON.parse(localStorage.getItem(key));
  if (!list) {
    list = [];
  }

  list.push({
    id: id,
    name: contactName,
    number: contactNumber,
    place: contactPlace,
  });

  localStorage.setItem(key, JSON.stringify(list));
  localStorage.setItem("counter", id + 1);
  if (list) {
    window.location.assign(
      "C:/Users/Vandana/Desktop/Internship/Html/Task-2/viewContacts.html"
    );
  }
}

function queryString(id, name, number, place) {
  // add para to query string
  let currentPage = new URL(
    "C:/Users/Vandana/Desktop/Internship/Html/Task-2/addContact.html"
  );
  currentPage.searchParams.append("id", id);
  currentPage.searchParams.append("name", name);
  currentPage.searchParams.append("number", number);
  currentPage.searchParams.append("place", place);

  window.location.assign(currentPage);
}

function getParameter(path) {
  let url = new URL(path);
  let parameter = url.searchParams;
  let id = parameter.get("id");
  let name = parameter.get("name");
  let number = parameter.get("number");
  let place = parameter.get("place");

  if (id) {
    document.getElementById("contactName").value = name;
    document.getElementById("contactNumber").value = number;
    document.getElementById("contactPlace").value = place;
  }
}

function editContact(id) {
  let contactName = document.getElementById("contactName").value;
  let contactNumber = document.getElementById("contactNumber").value;
  let contactPlace = document.getElementById("contactPlace").value;

  
  let contact = JSON.parse(localStorage.getItem(key));

  let updatedData = {
    id: id,
    name: contactName,
    number: contactNumber,
    place: contactPlace,
  };

  contact.forEach((element) => {
    if (element.id == id) {
      Object.assign(element, updatedData);
    }
  });

  // let res = contact.map(obj => updatedData.find(ele => ele.id === obj.id) || obj);

  localStorage.setItem(key, JSON.stringify(contact));
  window.location.assign(
    "C:/Users/Vandana/Desktop/Internship/Html/Task-2/viewContacts.html"
  );
}

function deleteContact(id) {
  
  let contact = JSON.parse(localStorage.getItem(key));
  let contactList = objectToList(contact);

  let filteredList = contactList.filter(function (con) {
    return con.id != id;
  });

  localStorage.setItem(key, JSON.stringify(filteredList));
  window.location.assign(
    "C:/Users/Vandana/Desktop/Internship/Html/Task-2/viewContacts.html"
  );
}
