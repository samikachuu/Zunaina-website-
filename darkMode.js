<!-- Add this inside your HTML <head> or before </body> -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('theme-toggle');
    const modeLabel = document.getElementById('mode-label');

    // Set theme based on stored preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      checkbox.checked = true;
      if (modeLabel) modeLabel.textContent = 'Dark Mode';
    }

    // Toggle theme and update localStorage
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (modeLabel) modeLabel.textContent = 'Dark Mode';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (modeLabel) modeLabel.textContent = 'Light Mode';
      }
    });
  });
</script>
