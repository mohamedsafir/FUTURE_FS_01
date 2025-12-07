// Toggle Style Switcher
const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
const styleSwitcher = document.querySelector('.style-switcher');

styleSwitcherToggle.addEventListener('click', () => {
    styleSwitcher.classList.toggle('open');
});

// Hide style switcher on scroll
window.addEventListener('scroll', () => {
    styleSwitcher.classList.remove('open');
});

// Theme Colors - Apply and Persist
const colorButtons = document.querySelectorAll('.colors span');
const alternateStyles = document.querySelectorAll('.alternate-style');

function setActiveStyle(colorName) {
    alternateStyles.forEach(style => {
        if (style.getAttribute('title') === colorName) {
            style.removeAttribute('disabled');
        } else {
            style.setAttribute('disabled', 'true');
        }
    });
    localStorage.setItem('selectedColor', colorName);
}

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const colorName = button.classList[0]; // Get the color class name (e.g., 'color-1')
        setActiveStyle(colorName);
    });
});

// Load saved theme color on page load
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        setActiveStyle(savedColor);
    } else {
        setActiveStyle('color-1'); // Set default to Red
    }
});


// Dark Mode Toggle
const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    let icon = dayNight.querySelector('i');
    if (document.body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Load Dark Mode Preference on Page Load
window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        dayNight.querySelector('i').classList.remove('fa-moon');
        dayNight.querySelector('i').classList.add('fa-sun');
    } else {
        dayNight.querySelector('i').classList.remove('fa-sun');
        dayNight.querySelector('i').classList.add('fa-moon');
    }
});
