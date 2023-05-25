document.addEventListener('DOMContentLoaded', function () {
    var dateDisplay = document.getElementById('dateDisplay');
    var timeDisplay = document.getElementById('timeDisplay');
    var clearCacheButton = document.getElementById('clearCacheButton');
    

    // Var for User name
    var nameInput = document.getElementById('nameInput');
    var greeting = document.getElementById('greeting');
    var okButton = document.getElementById('okButton');
    var storedName = localStorage.getItem('userName');
  

// user name function
if (storedName) {
  greeting.textContent = 'Hello, ' + storedName + '!';
  nameInput.style.display = 'none';
  okButton.style.display = 'none';
} else {
  nameInput.addEventListener('input', function() {
    var newName = nameInput.value;
    greeting.textContent = 'Hello, ' + newName + '!';
  });
  
  okButton.addEventListener('click', function() {
    var newName = nameInput.value;
    greeting.textContent = 'Hello, ' + newName + '!';
    localStorage.setItem('userName', newName);
    nameInput.style.display = 'none';
    okButton.style.display = 'none';
  });  }

    // Update the date and time displays
    var currentDateTime = getCurrentDateTime();
    dateDisplay.innerHTML = currentDateTime.date;
    timeDisplay.innerHTML = currentDateTime.time;
  

    // clear cache
    clearCacheButton.addEventListener('click', function () {
      chrome.browsingData.removeCache({}, function () {
        console.log('Cache cleared Succesfully');

    // Refresh the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
      });
    });
  });
  
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
  

  // /* design and develop By - Lahiru Prabath 
//https:github.com/lahiruprabathft
