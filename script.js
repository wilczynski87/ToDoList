//toDoList
//user class
class UserArray {
  constructor(name, surname, email, password) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.lists = {};
  }
}

//Entry Dashboard
const myBody = `
  <div id="entry" class="hide">
    <H1>Log in or Sign up, please:</H1>
    <button id="entryLogIn">Log in</button> <button id="entrySignUp">Sign up</button>
  </div>

  <div id="logInDiv" class="">
    <form>
      <label for="loginSignIn">email:</label><br>
      <input type="email" id="loginSignIn" value="your@email.com" required><br>
      <label for="passwordSignIn">password:</label><br>
      <input type="password" id="passwordSignIn" value="aaa" required><br>
    </form>
    <button id="logInButton">Log-in</button>
    <h2 id="signUp">Not signed yet? <button id="entrySignUp">Click here</button></h2>
  </div>

  <div id="signUpDiv" class="">
    <form id="newForm">
        <label>Name:</label><br>
        <input id="nameInput" type="text" value="Name" required=""><br>
        <label>Surname:</label><br>
        <input id="surnameInput" type="text" value="Surname" required=""><br>
        <label>email:</label><br>
        <input id="emailInput" type="email" value="your@email.com" required=""><br>
        <label>repead email:</label><br>
        <input id="repeadEmailInput" type="repeadEmailInput" value="your@email.com"><br>
        <label>password:</label><br>
        <input id="password" type="password" required=""><br>
        <label>repead password:</label><br>
        <input id="repeadpassword" type="password"><br>
        <input type="checkbox" id="checkbox" required="">
        <label>I agree to the Terms of Use</label><br>
        <button id="signUpButt">Sign up</button>
      </form>
    </div>

    <div id="dashboradBox">
      <H1 id="welcoming" align="top">Hello dear <span id="user"></span> <button id="logOutB">Log out</button></h1>
      <div id="insiderDashboradBox" class="grid-container">
        <div id="defaultBox" class="grid-item">
          <button id="listAddButton">add list</button>
        </div>
      </div>
    </div>
`
//appending code to HTML file
document.body.innerHTML = myBody;
show("entry");


// var obj = localStorage.getItem("iii@iii.com");
// console.log(obj.name);
//currently logged user
var username = "";
var usernameO;
// var userArray = {
//   "name" : "",
//   "surname" : "",
//   "email" : "",
//   "password" : "",
//   "lists" : {},
// }

//------------------------------------------------------------------------------------------
//EVENTS
//Entry SignUp
const entrySignUpB = document.getElementById("entrySignUp");
entrySignUpB.addEventListener("click", () =>{
  show("signUpDiv");
});

//Sign UP button in Sign Up form
signUpButt = document.getElementById("signUpButt");
signUpButt.addEventListener("click", () => {
  if(password.value !== repeadpassword.value) {
    alert("password do not match");
    event.preventDefault();
    return;
  } else if(repeadEmailInput.value !== emailInput.value || emailInput.value == "") {
    alert("email do not match");
    event.preventDefault();
  } else {
    //console.log("Why I am not displayed?");
    //creating user
    let userArray = new UserArray(nameInput.value, surnameInput.value, emailInput.value, password.value);
    //console.log(userArray); //obiject forme class created
    let userArrayJ = JSON.stringify(userArray);
    //console.log(userArrayJ); //showing string forme userArray
    localStorage.setItem(userArray.email, userArrayJ);
  }
  alert("Why I am not displayed?");
});

//LogIn on Entry site:
const logInDivB = document.getElementById("entryLogIn");
logInDivB.addEventListener("click", () => {
  show("logInDiv");
});

//LogIn button on LogIn site
var logInButton = document.getElementById("logInButton");
//log IN button on log in site
logInButton.addEventListener("click", () => {
  let loginSignIn = document.getElementById("loginSignIn").value;
  let passwordSignIn = document.getElementById("passwordSignIn").value;

  //retriving data frome local storage and parse to obiect
  if(localStorage.getItem(loginSignIn) !== null) {
    let jsonString = localStorage.getItem(loginSignIn);
    usernameO = JSON.parse(jsonString);

    //checking credentials
    if(passwordSignIn == usernameO.password) {
      //Giving a token to a sesion
      username = loginSignIn; //login an user
      let user = document.getElementById("user");
      user.innerText = `${usernameO.name} ${usernameO.surname}`;
      //add user lists
      listAdder(usernameO);
      //alert("Hello " + username);
      //listAddButton = document.querySelector("button");
      // let local = localStorage.getItem('your@email.com');
      // let localJ = JSON.parse(local);
      // console.log(localJ.name);
      show("dashboradBox");
      //console.log(usernameO);
      //document.getElementById("dashboradBox").classList.add("grid-container");
    } else {
        alert("Wrong login or password, try again");
        usernameO = null;
      }
  } else alert("please give proper login");

});

const dashboradBox = document.getElementById("insiderDashboradBox");
const listAddButton = document.getElementById("listAddButton")
//adding ToDo list -> button event
listAddButton.addEventListener("click", () => {
  //appending old lists
  //creating box
  //Add Id to ToDoList based on Time
  function timestamp() {
    let time = new Date();
    time = time.getTime();
    return time;
  }
  let time = timestamp();
  let dashB = document.createElement("div");
  dashB.id = time;
  dashB.className = "grid-item";
  let listBoard = `
    <h2 id="h2${time}" name="title">Title</h2>
    <ol id="ol${time}" name="0">
      <li id="0li${time}" name="point">your text</li>
    </ol>
    <button id="addTaskB${time}" name="addTaskB">add task</button>`

  //dashboradBox.innerHTML += listBoard; //adding listBoard to dashboardBox
  dashB.innerHTML = listBoard;
  dashboradBox.appendChild(dashB);

  //creating a username Object to put in local storage
  let li = document.getElementById(`0ol${time}`);
  let h2 = document.getElementById(`h2${time}`)

  //console.log(usernameO);
  usernameO.lists[time] = {'title' : "Title"};
  usernameO.lists[time][`0li${time}`] = "your text";
  //console.log(usernameO);

  //Sending to localStorage
  username = JSON.stringify(usernameO);
  localStorage.setItem(usernameO.email, username); //--------------------------------------------------------------

  //console.log(usernameO);

});

//Editing a ToDo list
dashboradBox.addEventListener("click", (event) => {
  //console.log(usernameO);
  let tar = event.target;
  //console.log(event);

  // if TITLE clicked
  if(event.target.nodeName == "H2") {
    let input = document.createElement("input");
    tar.parentNode.prepend(input);
    tar.style.display = 'none';
    input.focus();

    //on mouse of
    input.onblur = () => {
      let txt = input.value;
      tar.innerText = txt;
      tar.style.display = '';
      //adding to usernameO
      console.log(input.parentNode.id);
      usernameO.lists[input.parentNode.id].title = txt; //adding title to usernameO
      input.remove();
    }
  }

  //if POINT clicked
  if(tar.nodeName == "LI") {
    let input = document.createElement("input");
    tar.style.display = 'none';
    tar.after(input);
    input.focus();

    //on mouse of
    input.onblur = () => {
      let txt = input.value;
      tar.innerText = txt;
      tar.style.display = "";
      //usernameO.lists[tar.parentNode.id] = tar.id; //adding point id to usernameO or overide it
      //console.log(tar.parentNode.parentNode.id);
      usernameO.lists[tar.parentNode.parentNode.id][tar.id] = txt;
      console.log(tar.parentNode.id);
      input.remove();
    }
  }

  //if add task button clicked
  if(tar.name == "addTaskB") {
    let point = document.createElement("li");
    point.innerText = "new text";
    let pointsN = tar.parentNode.querySelectorAll("li").length;
    point.id = pointsN +"li"+ tar.parentNode.id;
    tar.parentNode.querySelector("ol").appendChild(point);
  }

  //saving data in local storage
  //console.log(usernameO);
  var newUsernameO = JSON.stringify(usernameO);
  //console.log(newUsernameO);
  localStorage.setItem(usernameO.email, newUsernameO); //adding to local storage ---------------------------------------
});

//log out
document.body.addEventListener("click", (event) => {
  if(event.target.id == "logOutB") {
    console.log(event.target.name);
    window.location.reload();
  }
});

// -------------------------------------------------------Functions definitions
//Function to display div
function show(stays) {
  let entry = document.getElementById("entry");
  let logInDiv = document.getElementById("logInDiv");
  let signUpDiv = document.getElementById("signUpDiv");
  let dashboradBox = document.getElementById("dashboradBox");
  let divy = {
    "entry" : entry,
    "logInDiv" : logInDiv,
    "signUpDiv" : signUpDiv,
    "dashboradBox" : dashboradBox,
  };

  for(let i in divy) {
    divy[i].className = "hide";
    //console.log(divy[i].className);
  }
  divy[stays].className = "show";
  //console.log(divy);
  //console.log(entry.className + ", " + signUpDiv.className)
}

//adding list frome storage for an user
function listAdder(usernameO) {
  //creating box
  for(let i in usernameO.lists) { //iterating through ToDo lists
    let toDoList = document.createElement("div");
    toDoList.className = "grid-item";
    toDoList.id = i;

    let title = document.createElement("h2");
    title.innerText = usernameO.lists[i].title;

    //creating first task
    let list = document.createElement("ol");
    for(let o in usernameO.lists[i]) { //iterating trough tasks
      if(o != "title") {
        let point = document.createElement("li");
        point.innerText = usernameO.lists[i][o];
        point.id = o;
        list.appendChild(point);
      }
    }
    //creating an add task button
    let addTaskB = document.createElement("button");
    addTaskB.innerText = "add task";
    addTaskB.name = "addTaskB";

    //appending element to ToDo list
    insiderDashboradBox.appendChild(toDoList);
    toDoList.appendChild(title);
    toDoList.appendChild(list);
    toDoList.appendChild(addTaskB);

  }
}

//geting data forme server -> for future use
async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  console.log(myText);
}
//getText(`https://swapi.dev/api/planets/1/`);
