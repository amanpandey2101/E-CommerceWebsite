// Function to update the content based on the current route
function updateContent() {
    const path = window.location.pathname;
  
    if (path === '/index.html' || path === '/') {
      // Default route - Load home page content
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = ''; // Clear the content
    } else if (path === '/login.html') {
      // Load login.html into the content div
      fetch('login.html')
        .then(response => response.text())
        .then(html => {
          const contentDiv = document.getElementById('content');
          contentDiv.innerHTML = html;
        })
        .catch(error => {
          console.error('Failed to load login.html:', error);
        });
    } else if (path === '/signup.html') {
      // Load signup.html into the content div
      fetch('signup.html')
        .then(response => response.text())
        .then(html => {
          const contentDiv = document.getElementById('content');
          contentDiv.innerHTML = html;
        })
        .catch(error => {
          console.error('Failed to load signup.html:', error);
        });
    }
  }
  
  // Listen for changes in the URL
  window.addEventListener('popstate', updateContent);
  
  // Initial content update
  updateContent();
  