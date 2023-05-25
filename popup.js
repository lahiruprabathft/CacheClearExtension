document.addEventListener('DOMContentLoaded', function() {
  var dateDisplay = document.getElementById('dateDisplay');
  var timeDisplay = document.getElementById('timeDisplay');
  var clearCacheButton = document.getElementById('clearCacheButton');

  // Var for User name
  var nameInput = document.getElementById('nameInput');
  var greeting = document.getElementById('greeting');
  var okButton = document.getElementById('okButton');
  var changeNameButton = document.getElementById('changeNameButton');
  var storedName = localStorage.getItem('userName');

  // User name function
  if (storedName) {
    greeting.textContent = 'Hello, ' + storedName + '..';
    nameInput.style.display = 'none';
    okButton.style.display = 'none';
  } else {
    nameInput.addEventListener('input', function() {
      var newName = nameInput.value;
      greeting.textContent = 'Hello, ' + newName + '..';
    });

    okButton.addEventListener('click', function() {
      var newName = nameInput.value;
      greeting.textContent = 'Hello, ' + newName + '..';
      localStorage.setItem('userName', newName);
      nameInput.style.display = 'none';
      okButton.style.display = 'none';
    });
  }

  // Update the date and time displays
  updateDateTime();

  // Clear cache
  clearCacheButton.addEventListener('click', function() {
    chrome.browsingData.removeCache({}, function() {
      console.log('Cache cleared successfully');

      // Refresh the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });

  // Function to update the date and time displays
  function updateDateTime() {
    var currentDateTime = getCurrentDateTime();
    dateDisplay.innerHTML = currentDateTime.date;
    timeDisplay.innerHTML = currentDateTime.time;
  }

  // Function to get the current date and time
  function getCurrentDateTime() {
    var currentDateTime = new Date();
    var date = currentDateTime.toLocaleDateString(); // Get the date
    var time = currentDateTime.toLocaleTimeString(); // Get the time
    return {
      date: date,
      time: time
    };
  }

  // Function to update the clock every second
  function updateClock() {
    var currentDateTime = getCurrentDateTime();
    timeDisplay.innerHTML = currentDateTime.time;
  }

  // Update the clock every second
  setInterval(updateClock, 1000);
});

/* Design and developed by Lahiru Prabath
https://github.com/lahiruprabathft */
