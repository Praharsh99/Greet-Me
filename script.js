var background = "";
var retrievedObject;

var greetMeStorageObject = {
  username: "Friend",
  todos: [
    {
      isDone: false,
      content:
        "You can mark them as done by clicking the tick mark, and remove them using the cross mark",
    },
    {
      isDone: false,
      content:
        "Hope everything is fine! Type your most important task right now into the input bar above!",
    },
    {
      isDone: false,
      content: "Hello there! Welcome to GREET ME",
    },
  ],
  greetingFontStyle: "Staatliches",
  greetingFontColor: "#ed5b1d",
  backgroundImage: "./selected/12.jpg",
  todoItemBackImage: "dark-laptop",
  imageURL: "",
  newUser: true,
};

document.addEventListener("DOMContentLoaded", preloadSavedData);
document.querySelector("#todo-add-button").addEventListener("click", () => {
  preAddTodo();
});
document.querySelector("#menu-icon").addEventListener("click", () => {
  showShortcutsMenu();
});
document.querySelector("#settings-container").addEventListener("click", () => {
  showSettings();
});
document.querySelector("#add-name-button").addEventListener("click", () => {
  changeName();
});
document.querySelector(".dropdown-toggle").addEventListener("click", () => {
  showFontsMenu();
});
document.querySelector("#change-font-style").addEventListener("click", () => {
  changeFontStyle();
});
document
  .querySelector("#change-font-color-button")
  .addEventListener("click", () => {
    changeFontColor();
  });
document.querySelector("#url-button").addEventListener("click", () => {
  urlChangeBackground();
});

function preloadSavedData() {
  retrievedObject = JSON.parse(localStorage.getItem("greetMeStorageObject"));

  if (retrievedObject === null) {
    localStorage.setItem(
      "greetMeStorageObject",
      JSON.stringify(greetMeStorageObject)
    );
    retrievedObject = greetMeStorageObject;
  }

  var _mainContainer = document.getElementsByClassName("container")[0];
  var _greetingElement = document.getElementsByClassName("greeting")[0];
  var _nameInputElement = document.getElementById("name-input");
  var _selectedFont = document.getElementById("selected-font");
  var _fontPreview = document.getElementById("font-preview");
  var _selectedFontColor = document.getElementById("select-font-color");
  var _urlInput = document.getElementById("url-input");

  if (!retrievedObject.imageURL)
    _mainContainer.style.backgroundImage = `url(${retrievedObject.backgroundImage})`;
  else {
    _mainContainer.style.backgroundImage = `url(${retrievedObject.imageURL})`;
    _urlInput.value = retrievedObject.imageURL;
  }

  _greetingElement.style.fontFamily = retrievedObject.greetingFontStyle;
  _greetingElement.style.color = retrievedObject.greetingFontColor;
  _greetingElement.children[1].innerText = retrievedObject.username;
  _nameInputElement.value = retrievedObject.username;
  _selectedFont.value = retrievedObject.greetingFontStyle;
  _fontPreview.style.fontFamily = retrievedObject.greetingFontStyle;
  _selectedFontColor.value = retrievedObject.greetingFontColor;

  background = retrievedObject.todoItemBackImage;

  for (let idx = 0; idx < retrievedObject.todos.length; idx++) {
    addTodo(
      retrievedObject.todos[idx].content,
      retrievedObject.todos[idx].isDone,
      false
    );
  }

  if (retrievedObject.newUser) walkthrough();
}

var walkthroughClasses = [
  {
    message:
      "Hello!! Welcome to the new tab chrome extension! &nbsp;<img src='./svg/hello.svg' height=28 width=28 />",
    className: "welcome-slide",
  },
  {
    message:
      "Type in here and click the ADD button to create a new todo <img src='./svg/add.svg' height=24 width=24 />",
    className: "todo-input-slide",
    toShow: "todo-container",
  },
  {
    message:
      "Your todos are here!! Click the tick mark to mark it as done &nbsp;<img src='./svg/checklist.svg' height=28 width=28 />",
    className: "todo-content-slide",
    toShow: "todo-items-container",
  },
  {
    message:
      "Toggle the button to show the list of shortcuts available!! &nbsp; <img src='./svg/hyperlink.svg' height=24 width=24 />",
    className: "shortcuts-slide",
    toShow: "menu-icon",
  },
  {
    message:
      "Click this icon to view all the customization options &nbsp; <img src='./svg/hammer.svg' height=24 width=24 />",
    className: "settings-slide",
    toShow: "settings-container",
  },
  {
    message:
      "That's it! You are all set, start adding &nbsp;<img src='./svg/party.svg' height=24 width=24 /> &nbsp;todos and complete them&nbsp; <img src='./svg/party.svg' height=24 width=24 />",
    className: "last-slide",
    toShow: "",
  },
];

function walkthrough() {
  var walkthroughContainer = document.createElement("div");
  var walkthroughCard = document.createElement("div");
  var messageContainer = document.createElement("div");
  var nextButtonContainer = document.createElement("div");
  var nextButton = document.createElement("button");

  walkthroughContainer.className = "walkthrough-container";
  walkthroughCard.className = `walkthrough-card ${walkthroughClasses[0].className}`;
  messageContainer.className = "message-container";
  messageContainer.innerHTML = walkthroughClasses[0].message;
  nextButtonContainer.className = "next-button-container";
  nextButton.className = "add-name-button next-button";

  nextButton.innerText = "Next";
  nextButton.setAttribute("count", 1);
  nextButtonContainer.appendChild(nextButton);

  walkthroughCard.appendChild(messageContainer);
  walkthroughCard.appendChild(nextButtonContainer);

  nextButton.onclick = function (event) {
    var walkthroughCard = event.target.offsetParent;
    var messageContainer = walkthroughCard.firstChild;
    var countAttr = +event.target.getAttribute("count");

    if (countAttr === 6) {
      document.body.removeChild(
        document.getElementsByClassName("walkthrough-container")[0]
      );

      // DB operation start
      retrievedObject.newUser = false;
      localStorage.setItem(
        "greetMeStorageObject",
        JSON.stringify(retrievedObject)
      );
      // DB operation done
    } else {
      walkthroughCard.className = `walkthrough-card ${walkthroughClasses[countAttr].className}`;
      messageContainer.innerHTML = walkthroughClasses[countAttr].message;

      if (countAttr > 1) {
        document
          .getElementsByClassName(walkthroughClasses[countAttr - 1].toShow)[0]
          .removeAttribute("style");
      }

      if (countAttr < 5) {
        document.getElementsByClassName(
          walkthroughClasses[countAttr].toShow
        )[0].style.zIndex = "20";
      }

      this.setAttribute("count", countAttr + 1);
    }
  };

  walkthroughContainer.appendChild(walkthroughCard);
  document.body.appendChild(walkthroughContainer);
}

var backgroundClasses = [
  "water-waves-background",
  "pink-flowers-background",
  "diamond-pattern",
  "white-lamp-background",
  "color-solids",
  "black-gadgets",
  "pubg-helmet",
  "cricket-ball-background",
  "stadium-background",
  "gun-background",
  "vintage-car",
  "dark-laptop",
  "yoga-valley",
  "controller-coffee",
  "forest",
  "hoarding-street",
  "smoke-soldier",
  "pink-city",
  "glass-pattern-1",
  "glass-pattern-2",
  "paper-leaf",
];

var settingsClasses = [
  "name-change-container",
  "background-image-container",
  "font-color-container",
  "url-link-container",
];

var labelClasses = ["name-label", "img-label", "", "url-label"];
var dummyElement, dummyLabelElement;
var settingsCategoriesButtons = document.getElementsByClassName("categories");

function removeSelectClass() {
  for (var idx = 0; idx < settingsCategoriesButtons.length; idx++) {
    settingsCategoriesButtons[idx].className = "categories back";

    dummyElement = document.getElementById(settingsClasses[idx]);
    if (idx !== 2)
      dummyLabelElement = document.getElementById(labelClasses[idx]);

    dummyElement.className = "no-display";
    dummyLabelElement.className = "no-display";
  }
}

function showDisplaySettings() {
  var nameChangeContainer = document.getElementById("name-change-container");
  var nameLabel = document.getElementById("name-label");

  nameChangeContainer.className = "name-change-container";
  nameLabel.className = "label";
}

function showURLSettings() {
  var urlContainer = document.getElementById("url-link-container");
  var urlLabel = document.getElementById("url-label");

  urlContainer.className = "url-link-container";
  urlLabel.className = "label";
}

function showBackgroundImageSettings() {
  var galleryContainer = document.getElementById("background-image-container");
  var imgLabel = document.getElementById("img-label");

  galleryContainer.className = "background-image-container";
  imgLabel.className = "label";
}

function showFontsAndColorSettings() {
  var fontColorContainer = document.getElementById("font-color-container");

  fontColorContainer.className = "font-color-container";
}

function showCustomizationOptions(category) {
  if (category === "name-fonts") showDisplaySettings();

  if (category === "url") showURLSettings();

  if (category === "background-images") showBackgroundImageSettings();

  if (category === "color-themes") showFontsAndColorSettings();
}

for (var i = 0; i < settingsCategoriesButtons.length; i++) {
  settingsCategoriesButtons[i].addEventListener("click", function (event) {
    removeSelectClass();
    event.target.className = "categories selected";

    showCustomizationOptions(event.target.id);
  });
}

function setTodoItemClass() {
  return `todo-item ${background} black`;
}

function preAddTodo() {
  var getTodoInput = document.getElementById("todo-input");
  var getTodoInputValue = getTodoInput.value.trim();

  if (getTodoInputValue !== "") {
    addTodo(getTodoInputValue, false, true);

    getTodoInput.value = "";
    getTodoInput.focus();
  }
}

var todoItemsContainer = document.getElementById("todo-items-container");

function addTodo(todoContent, isDone, isNew) {
  if (todoContent !== "") {
    var newTodo = document.createElement("p");
    var newTickMark = document.createElement("img");
    var newTrashButton = document.createElement("img");
    var newTodoContent = document.createElement("span");

    newTickMark.src = "./svg/tick.svg";
    newTickMark.alt = "Done";
    newTickMark.height = "18";
    newTickMark.width = "18";
    newTickMark.className = "tick-mark";
    newTickMark.onclick = function (event) {
      let parent = event.path[1];
      let parentDiv = event.path[2];

      if (parent.style.textDecoration === "line-through") {
        parent.style.textDecoration = "none";
        isDone = false;
      } else {
        parent.style.textDecoration = "line-through";
        isDone = true;
      }

      let indexOfParent = Array.from(parentDiv.children).indexOf(parent);

      // DB operation start
      retrievedObject.todos[
        retrievedObject.todos.length - 1 - indexOfParent
      ].isDone = isDone;

      localStorage.setItem(
        "greetMeStorageObject",
        JSON.stringify(retrievedObject)
      );
      // DB operation done
    };

    newTrashButton.src = "./svg/close.svg";
    newTrashButton.alt = "Delete";
    newTrashButton.height = "11";
    newTrashButton.width = "10";
    newTrashButton.className = "close-mark";
    newTrashButton.onclick = function (event) {
      let parent = event.path[1];
      let parentDiv = event.path[2];

      parent.remove();

      let indexOfParent = Array.from(parentDiv.children).indexOf(parent);

      // DB operation start
      retrievedObject.todos.splice(indexOfParent, 1);

      localStorage.setItem(
        "greetMeStorageObject",
        JSON.stringify(retrievedObject)
      );
      // DB operation done
    };

    newTodoContent.innerText = todoContent;
    newTodoContent.className = "todo-content";

    newTodo.className = setTodoItemClass();
    if (isDone) newTodo.style.textDecoration = "line-through";

    //DB operation start
    if (isNew) {
      retrievedObject.todos.push({
        isDone: false,
        content: todoContent,
      });

      localStorage.setItem(
        "greetMeStorageObject",
        JSON.stringify(retrievedObject)
      );
    }
    // DB operation done

    newTodo.appendChild(newTickMark);
    newTodo.appendChild(newTodoContent);
    newTodo.appendChild(newTrashButton);

    todoItemsContainer.insertBefore(newTodo, todoItemsContainer.firstChild);
  }
}

var getTodoInputElement = document.getElementById("todo-input");

getTodoInputElement.addEventListener("keypress", (e) => {
  if (e.charCode == 13) {
    preAddTodo();
  }
});

var flag = "";

function changeName() {
  var newName = document.getElementById("name-input");
  var usernameElement = document.getElementById("username");

  username = newName.value.trim();

  if (username != "") {
    usernameElement.innerText = username;

    // DB operation start
    retrievedObject.username = username;
    localStorage.setItem(
      "greetMeStorageObject",
      JSON.stringify(retrievedObject)
    );
    // DB operation done
  }
}

function setGreetingMessage(wish) {
  var wishElement = document.getElementById("wish");
  wishElement.innerText = wish;

  if (wish === "Good Morning") flag = "mrng";
  if (wish === "Good Afternoon") flag = "aftn";
  if (wish === "Good Evening") flag = "eve";
}

function addImagesToDivs() {
  var getParentDiv = document.getElementById("background-image-container");
  var getAllTodos = document.getElementById("todo-items-container").children;
  var childDivs = getParentDiv.children;

  for (i = 0; i < childDivs.length; i++) {
    childDivs[i].firstElementChild.src = `./selected/${i + 1}.jpg`;

    childDivs[i].firstElementChild.onclick = (event) => {
      var getMainContainer = document.getElementsByClassName("container")[0];
      var imageSource = event.path[0].attributes[0].nodeValue;

      getMainContainer.style.backgroundImage = `url(${imageSource})`;

      background =
        backgroundClasses[parseInt(imageSource.match(/(\d+)/)[0]) - 1];

      // DB operation start
      retrievedObject.backgroundImage = imageSource;
      retrievedObject.todoItemBackImage = background;
      localStorage.setItem(
        "greetMeStorageObject",
        JSON.stringify(retrievedObject)
      );
      // DB operation done

      for (var j = 0; j < getAllTodos.length; j++) {
        getAllTodos[j].className = setTodoItemClass();
      }
    };

    childDivs[i].className = "gallery-image";
  }
}

var time = document.getElementsByClassName("time")[0];

function addClock() {
  var date = new Date();

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var session = "AM";

  // Morning Logic
  if (hours >= 5 && hours <= 10 && (flag.length == 0 || flag === "eve")) {
    setGreetingMessage("Good Morning");

    // Afternoon Logic
  } else if (
    hours >= 11 &&
    hours <= 16 &&
    (flag.length == 0 || flag === "mrng")
  ) {
    setGreetingMessage("Good Afternoon");

    // Evening Logic
  } else if (
    (hours >= 17 || hours <= 4) &&
    (flag.length == 0 || flag === "aftn")
  ) {
    setGreetingMessage("Good Evening");
  }

  if (hours >= 12) session = "PM";

  if (hours > 12) hours -= 12;

  if (hours == 0) hours = 12;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  time.innerText = hours + ":" + minutes + " " + session;

  setTimeout(addClock, 1000);
}

var fonts = [
  "Bangers",
  "Bellota",
  "Bungee Inline",
  "Cinzel Decorative",
  "Fredericka the Great",
  "Lato",
  "Lobster",
  "Luckiest Guy",
  "Metal Mania",
  "Monoton",
  "Orbitron",
  "Oswald",
  "Quicksand",
  "Raleway",
  "Shadows Into Light",
  "Source Code Pro",
  "Staatliches",
];

var colorClasses = [
  "coal-rocks",
  "white-lamp-background",
  "pink-flowers-background",
  "light-cream-back",
  "water-waves-background",
  "stadium-background",
  "greenish-blue-back",
  "yellow-back",
  "light-green-back",
  "cricket-ball-background",
  "purple-back",
  "orange-back",
  "pink-city",
  "light-red-back",
  "blackish-brown-back",
  "gun-background",
  "diamond-pattern",
  "vintage-car",
  "pink-yellow-grad",
  "yellow-darkblue-grad",
  "lightblue-violet-grad",
  "dark-laptop",
  "color-solids",
  "black-gadgets",
  "pubg-helmet",
  "yoga-valley",
  "controller-coffee",
  "forest",
  "hoarding-street",
  "smoke-soldier",
  "glass-pattern-1",
  "glass-pattern-2",
  "paper-leaf",
];

var colorsList = [
  "rgba(232, 150, 28, 0.87)",
  "rgba(91, 164, 172, 0.85)",
  "rgba(230, 155, 157, 0.95)",
  "rgba(188, 125, 133, 0.85)",
  "rgba(227, 144, 114, 0.8)",
  "rgba(94, 125, 207, 0.89)",
  "rgba(46, 196, 182, 0.8)",
  "rgba(236, 230, 23, 0.87)",
  "rgba(85, 166, 48, 0.8)",
  "rgba(5, 62, 0, 0.8)",
  "rgba(146, 46, 196, 0.8)",
  "rgba(252, 163, 17, 0.7)",
  "rgba(240, 111, 152, 0.7)",
  "rgba(218, 30, 55, 0.7)",
  "rgba(64, 61, 57, 0.85)",
  "rgba(112, 81, 50, 0.8)",
  "rgba(146, 16, 54, 0.8)",
  "rgba(16, 16, 16, 0.87)",
  "rgba(255, 15, 123, 0.78), rgba(248, 156, 42, 0.7)",
  "rgba(245, 200, 0, 0.7), rgba(24, 48, 129, 0.75)",
  "rgba(66, 202, 255, 0.8), rgba(232, 26, 255, 0.68)",
  "rgb(1, 105, 127), rgb(109, 47, 21)",
  "rgba(203, 208, 0, 0.8), rgba(214, 116, 4, 0.86), rgba(252, 203, 0, 0.8)",
  "rgba(143, 161, 177, 0.78), rgba(38, 37, 37, 0.7)",
  "rgba(46, 196, 182, 0.9), rgba(218, 30, 155, 0.78)",
  "rgba(109, 153, 161, 0.88), rgba(39, 80, 124, 0.88)",
  "rgba(169, 164, 161, 0.9), rgba(219, 219, 219, 0.9)",
  "rgba(106, 117, 43, 0.9), rgba(148, 150, 55, 0.9)",
  "rgba(106, 82, 39, 0.92), rgba(86, 74, 62, 0.83), rgba(45, 42, 42, 0.92)",
  "rgba(126, 105, 96, 0.93), rgba(42, 42, 17, 0.69)",
  "rgba(89, 49, 70, 0.75), rgba(40, 60, 93, 0.62), rgba(104, 141, 141, 0.85)",
  "rgba(96, 85, 91, 0.8), rgba(71, 104, 134, 0.82), rgba(196, 190, 214, 0.78)",
  "rgba(124, 115, 101, 0.88), rgba(58, 77, 79, 0.85)",
];

var backgroundImage = "";

function addFontsAndColors() {
  var dropdownMenu = document.getElementById("dropdown-menu");
  var lightColorsDiv = document.getElementById("light-colors");
  var darkColorsDiv = document.getElementById("dark-colors");
  var gradientColorsDiv = document.getElementById("gradient-colors");

  fonts.forEach((font, index) => {
    var newFont = document.createElement("span");

    newFont.innerText = font;
    newFont.className = "font-name";
    newFont.onclick = function (event) {
      var selectedFont = document.getElementById("selected-font");
      selectedFont.value = event.target.innerText;

      var fontPreview = document.getElementById("font-preview");
      fontPreview.style.fontFamily = event.target.innerText;

      menu = "off";
      dropdownMenu.className = "no-display";
    };

    dropdownMenu.appendChild(newFont);
  });

  colorClasses.forEach((color, index) => {
    var newColor = document.createElement("span");

    if (index <= 17) {
      newColor.className = `color _${color}`;
      newColor.style.backgroundImage = `linear-gradient(45deg, ${colorsList[index]}, ${colorsList[index]})`;
    } else {
      newColor.className = `grad-color _${color}`;
      newColor.style.backgroundImage = `linear-gradient(45deg, ${colorsList[index]})`;
    }

    newColor.onclick = (event) => {
      var todoItems = document.getElementById("todo-items-container").children;

      background = event.target.classList[1].substr(1);

      // DB operation start
      retrievedObject.todoItemBackImage = background;

      localStorage.setItem(
        "greetMeStorageObject",
        JSON.stringify(retrievedObject)
      );
      // DB operation done

      for (i = 0; i < todoItems.length; i++) {
        todoItems[i].className = `todo-item ${background}`;
      }
    };

    if (index <= 8) lightColorsDiv.appendChild(newColor);
    else if (index >= 9 && index <= 17) darkColorsDiv.appendChild(newColor);
    else gradientColorsDiv.appendChild(newColor);
  });
}

function changeFontStyle() {
  var selectedFontStyle = document.getElementById("selected-font").value;
  var greetingElement = document.getElementsByClassName("greeting")[0];

  if (selectedFontStyle.length > 0 && fonts.includes(selectedFontStyle))
    greetingElement.style.fontFamily = selectedFontStyle;

  // DB operation start
  retrievedObject.greetingFontStyle = selectedFontStyle;
  localStorage.setItem("greetMeStorageObject", JSON.stringify(retrievedObject));
  // DB operation done
}

function changeFontColor() {
  var selectedFontColor = document.getElementById("select-font-color").value;
  var greetingElement = document.getElementsByClassName("greeting")[0];

  greetingElement.style.color = selectedFontColor;

  // DB operation start
  retrievedObject.greetingFontColor = selectedFontColor;
  localStorage.setItem("greetMeStorageObject", JSON.stringify(retrievedObject));
  // DB operation done
}

var shortcuts = [
  "www.google.com",
  "www.drive.google.com",
  "www.gmail.com",
  "www.facebook.com",
  "www.youtube.com",
  "www.medium.com",
  "www.amazon.com",
  "www.twitter.com",
  "web.whatsapp.com",
  "www.instagram.com",
];

var different = [1, 2, 3, 4, 7, 9];

function addShortcutIcons() {
  var shortcutIconsDiv = document.getElementById("shortcut-icons-container");

  shortcuts.forEach((shortcutIconURL, index) => {
    var newDiv = document.createElement("div");
    var newShortcut = document.createElement("img");
    var newAnchor = document.createElement("a");

    if (!different.includes(index)) {
      newShortcut.src = `https://${shortcutIconURL}/favicon.ico`;
      newShortcut.crossOri0gin = "use-credentials";
    } else newShortcut.src = `./shortcuts/${shortcutIconURL.split(".")[1]}.png`;

    newShortcut.className = "shortcut-icon";

    newAnchor.appendChild(newShortcut);
    newAnchor.href = `https://${shortcutIconURL}`;

    newDiv.className = "shortcut-icon-holder";
    newDiv.appendChild(newAnchor);

    shortcutIconsDiv.appendChild(newDiv);
  });
}

var menu = "off";

function showFontsMenu() {
  var dropdownMenu = document.getElementById("dropdown-menu");

  if (menu === "off") {
    dropdownMenu.className = "dropdown-menu";
    menu = "on";
  } else {
    dropdownMenu.className = "no-display";
    menu = "off";
  }
}

var settings = "off";
var settingsContainer = document.getElementById("settings-container");
var settingsMenuContainer = document.getElementById("settings-menu-container");
var modal = document.getElementById("modal");
var settingsIconWheel = document.getElementById("settings-icon-wheel");

function showSettings() {
  if (settings === "off") {
    settingsContainer.className = "settings-container rotate";
    settingsMenuContainer.className = "settings-menu-container";
    settingsIconWheel.style.fill = "url(#my-cool-gradient) #fff";
    modal.className = "modal";

    settings = "on";
  } else {
    settingsContainer.className = "settings-container";
    settingsMenuContainer.className = "no-settings";
    settingsIconWheel.style.fill = "#fff";
    modal.className = "no-display";

    settings = "off";
  }
}

var shortcutMenu = "off";

function showShortcutsMenu() {
  var shortcutsSubContainer = document.getElementById(
    "shortcuts-container-sub"
  );
  var menuIcon = document.getElementById("menu-icon");

  if (shortcutMenu === "on") {
    shortcutsSubContainer.classList.add("t");
    menuIcon.classList.remove("open-ham-icon");
    shortcutMenu = "off";
  } else {
    shortcutsSubContainer.classList.remove("t");
    menuIcon.classList.add("open-ham-icon");
    shortcutMenu = "on";
  }
}

function urlChangeBackground() {
  var getMainContainer = document.getElementsByClassName("container")[0];
  var urlInput = document.getElementById("url-input");
  var url = urlInput.value.trim();

  if (url !== "") {
    getMainContainer.style.backgroundImage = `url(${url})`;

    // DB operation start
    retrievedObject.imageURL = url;
    retrievedObject.backgroundImage = "";

    localStorage.setItem(
      "greetMeStorageObject",
      JSON.stringify(retrievedObject)
    );
    // DB operation done
  }
}

addClock();
addImagesToDivs();
addFontsAndColors();
addShortcutIcons();
