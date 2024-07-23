window.onload = function() {
    const preloader = document.querySelector('.pre_loader-wrap');
    const skipButton = document.querySelector('.skip_button');
    const mobileWrap = document.querySelector('.button_mobile-wrap');
    const body = document.body;

    if (!preloader) {
        console.error('Preloader element not found');
        return; // Exit the function if preloader is not found
    } else {
        console.log('Preloader element found');
    }

    if (!skipButton) {
        console.error('Skip button element not found');
    } else {
        console.log('Skip button element found');
    }

    if (!mobileWrap) {
        console.error('Mobile wrap element not found');
    } else {
        console.log('Mobile wrap element found');
    }

    let preloaderHidden = false;

    // Function to hide preloader and enable scrolling
    function hidePreloader() {
        console.log('hidePreloader called');
        if (preloader) {
            preloader.style.display = 'none';
            body.classList.remove('noscroll');
            preloaderHidden = true;
            enableScroll();
        }
    }

    // Function to start the preloader
    function startPreloader() {
        console.log('startPreloader called');
        if (!preloaderHidden && preloader) {
            preloader.style.display = 'flex';
            body.classList.add('noscroll');
   setTimeout(() => {
                hidePreloader();
            }, 15000); // Adjust the timeout as needed
        } 
    }

    // Event listener for skip button and mobile button
    function addClickListeners() {
        if (skipButton) {
            skipButton.addEventListener('click', hidePreloader);
        }

        if (mobileWrap) {
            mobileWrap.addEventListener('click', hidePreloader);
        }
    }

    // Prevent scroll
    function preventScroll(event) {
        if (body.classList.contains('noscroll')) {
            event.preventDefault();
            window.scrollTo(0, 0);
        }
    }

    // Add event listener for scroll prevention
    window.addEventListener('scroll', preventScroll);

    // Remove scroll prevention
    function enableScroll() {
        window.removeEventListener('scroll', preventScroll);
    }

    // Start the preloader when the page first loads
    startPreloader();
    addClickListeners();
};
