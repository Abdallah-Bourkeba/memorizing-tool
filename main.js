let container = document.querySelector(".container");
let hideBtn = document.querySelector(".hide");
let compareBtn = document.querySelector(".compare");
let clearBtn = document.querySelector(".clear");
let memoContent = document.querySelector(".memo-content");
let userInput = document.querySelector(".user-input");

hideBtn.onclick = () => {
  if (
    !memoContent.classList.contains("hidden") &&
    memoContent.innerHTML !== ""
  ) {
    memoContent.classList.add("hidden");
    hideBtn.classList.add("disable");
    userInput.focus();
    userInput.innerHTML = "";
    clearBtn.classList.add("disable");
  }
};

compareBtn.onclick = () => {
  if (!compareBtn.classList.contains("disable")) {
    let memoContentText = prepareToCompare(memoContent.innerHTML);
    let userInputtText = prepareToCompare(userInput.innerHTML);

    let audio;
    let color;
    let className;
    if (memoContentText === userInputtText) {
      audio = new Audio(
        "https://abdallah-mohamed-sayed.github.io/quiz-app/audios/Correct.mp3"
      );
      className = "correct";
      color = "#4caf50";
    } else {
      audio = new Audio(
        "https://abdallah-mohamed-sayed.github.io/quiz-app/audios/Wrong.mp3"
      );
      className = "wrong";
      color = "#f44336";
    }
    audio.play();
    container.classList.add(className);
    resetCssVars(color);

    setTimeout(() => {
      container.classList.remove("correct");
      container.classList.remove("wrong");
    }, 1000);

    userInput.blur();
    memoContent.classList.remove("hidden");
    hideBtn.classList.remove("disable");
    compareBtn.classList.add("disable");
    clearBtn.classList.remove("disable");
  }
};

clearBtn.onclick = () => {
  resetCssVars();
  if (!clearBtn.classList.contains("disable")) {
    userInput.innerHTML = "";
    memoContent.innerHTML = "";
    hideBtn.classList.add("disable");
    clearBtn.classList.add("disable");
    memoContent.focus();
  }
};

memoContent.onfocus = () => {
  resetCssVars();
  if (memoContent.classList.contains("hidden")) memoContent.blur();
};
memoContent.oninput = () => {
  if (memoContent.innerHTML !== "") {
    hideBtn.classList.remove("disable");
  } else {
    hideBtn.classList.add("disable");
  }
};

userInput.onfocus = () => {
  resetCssVars();
  if (!memoContent.classList.contains("hidden")) hideBtn.click();
};
userInput.oninput = () => {
  if (userInput.innerHTML !== "") {
    compareBtn.classList.remove("disable");
  } else {
    compareBtn.classList.add("disable");
  }
};

document.querySelectorAll("p.content").forEach((ele) => {
  ele.onkeypress = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };
  ele.onkeydown = (e) => {
    if ((e.ctrlKey && e.key == "c") || e.key == "v") e.preventDefault();
  };
  ele.oncontextmenu = () => false;
});

document.onkeydown = (e) => {
  switch (e.key) {
    case "Enter":
      if (document.activeElement === userInput) {
        compareBtn.click();
      } else {
        hideBtn.click();
      }
      break;
    case "ArrowDown":
      if (document.activeElement === memoContent) {
        userInput.focus();
      } else if (document.activeElement === userInput) {
        compareBtn.click();
      } else {
        memoContent.focus();
      }
      break;
  }
};

function prepareToCompare(text) {
  return text.toLowerCase().replace(/[^a-zA-Z]/g, "");
}

function resetCssVars(color = "#2196f3") {
  let root = document.querySelector(":root").style;
  root.setProperty("--main-color", color);
  root.setProperty(
    "--main-hover",
    color === "#2196f3"
      ? "#007adb"
      : color === "#4caf50"
      ? "#028e07"
      : "#c60e00"
  );
}
