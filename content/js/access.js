function showAccessingMessage() {
    // Display the accessing overlay
    document.getElementById("accessing-overlay").style.display = "block";
    // Start fake progress animation
    var width = 1;
    var interval = setInterval(function () {
      if (width >= 100) {
        clearInterval(interval);
        // Hide the accessing overlay after 2 seconds and show game grid
        setTimeout(function () {
          document.getElementById("accessing-overlay").style.display = "none";
          showGameGrid();
        }, 2000);
      } else {
        width++;
        document.getElementById("progressBar").style.width = width + "%";
        document.getElementById("accessing-loading-percentage").innerHTML =
          width + "%";
      }
    }, 20);
  }
  
  function showGrantedMessage() {
    // Display the granted overlay
    document.getElementById("granted-overlay").style.display = "block";
    // Display the granted box
    document.getElementById("granted-box").style.display = "block";
  
    // Hide the password input elements immediately
    hidePasswordInputElements();
  
    // Set a session storage flag
    sessionStorage.setItem("accessGranted", "true");
  
    // Start countdown timer
    startCountdown(3, function () {
      // Change the countdown duration to 3 seconds
      document.getElementById("granted-overlay").style.display = "none";
      document.getElementById("granted-box").style.display = "none";
      showAccessingMessage(); // Call function to show accessing message after granted message disappears
    });
  }
  
  
  // Check if access has been granted before (right at the beginning)
  const accessGranted = sessionStorage.getItem('accessGranted');
  if (accessGranted === 'true') {
    // Hide password input elements if access is already granted
    hidePasswordInputElements();
    // Proceed to show content or perform other actions
    showAccessingMessage(); // Or any other action you want to perform
  }
  
  // Function to hide password input elements
  function hidePasswordInputElements() {
    document.getElementById("password-label").style.display = "none";
    document.getElementById("password-container").style.display = "none";
  }
  
  
  document
    .getElementById("sipassword")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        checkPassword();
      }
    });
  
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
  
  async function checkPassword() {
    const password = document.getElementById("sipassword").value;
    const hashedPassword = await hashPassword(password);
  
    const correctHashedPassword =
      "42b53fc5201d421318a9a032df88cadb377de27445be87e7cc5b51a08c5e9b01";
  
    if (hashedPassword === correctHashedPassword) {
      showGrantedMessage();
    } else {
      showIncorrectMessage();
    }
  }
  
  function showIncorrectMessage() {
    // Hide the "Enter Password" text and password input field
    document.getElementById("password-label").style.display = "none";
    document.getElementById("password-container").style.display = "none";
    // Display the incorrect overlay
    document.getElementById("incorrect-overlay").style.display = "block";
    // Display the incorrect box
    document.getElementById("incorrect-box").style.display = "block";
    // Hide the incorrect overlay and box after 2 seconds
    setTimeout(function () {
      // Restore the "Enter Password" text and password input field
      document.getElementById("password-label").style.display = "block";
      document.getElementById("password-container").style.display = "inline";
      document.getElementById("incorrect-overlay").style.display = "none";
      document.getElementById("incorrect-box").style.display = "none";
    }, 2000);
  }
  
  function showGameGrid() {
    const gameGridContainer = document.getElementById("game-grid-container");
    gameGridContainer.style.display = "flex";
  
    const gameGrid = gameGridContainer.querySelector(".game-grid");
  
    for (let i = 0; i < 12; i++) {
      const gameWidget = document.createElement("div");
      gameWidget.className = "game-widget";
  
      const gameImage = document.createElement("img");
      gameImage.src = "../../img/widgets/image" + (i + 1) + ".png"; // Adjusted path
      gameImage.alt = `Game ${i + 1}`;
      gameImage.className = "game-image";
      
  
      // Add a click event listener to each game widget
      gameWidget.addEventListener("click", function () {
        redirectToGame(i + 1); // Redirect to a function with the game number as parameter
      });
  
      gameWidget.appendChild(gameImage);
      gameGrid.appendChild(gameWidget);
    }
  }
  
  function startCountdown(seconds, callback) {
    const countdownElement = document.getElementById("countdown-timer");
    countdownElement.style.display = "block";
    let remainingSeconds = seconds;
  
    countdownElement.textContent = `Starting in ${remainingSeconds}`;
  
    const interval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(interval);
        countdownElement.style.display = "none";
        callback();
      } else {
        countdownElement.textContent = `Starting in ${remainingSeconds}`;
      }
    }, 1000);
  }
  
  function redirectToGame(gameNumber) {
    let url;
    // Determine the URL based on the game number
    switch (gameNumber) {
      case 1:
        url = "https://nzp.gay/";
        break;
      case 2:
        url = "https://minecraftforfreex.com/eaglercraft/";
        break;
      case 3:
        url = "https://mathadventure1.github.io/sm64/";
        url2 = "https://augustberchelmann.com/mario/";
        window.open(url2, "_blank");
        break;
      case 4:
        url = "snake.html";
        break;
      case 5:
        url = "https://www.crazygames.com/game/super-hot";
        break;
      case 6:
        url = "https://badtimesimulator.io/";
        break;
      case 7:
        url = "https://soundcloud.com/zhgotthatplug";
        break;
      case 8:
        url = "https://clicktheredbutton.com/";
        break;
      case 9:
        url = "https://www.playdosgames.com/";
        break;
      case 10:
        url = "https://archive.org/details/internetarcade";
        break;
      case 11:
        url = "https://guesstheprice.net/";
        break;
      case 12:
        url = "https://gamesfrog.com/";
        break;
      // Add cases for all game numbers as needed
      default:
        url = "index.html"; // Default fallback URL
    }
    // Open the URL in a new tab
    window.open(url, "_blank");
  }
  