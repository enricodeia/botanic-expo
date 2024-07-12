<script src="https://cdnjs.cloudflare.com/ajax/libs/split.js/1.6.2/split.min.js" integrity="sha512-to2k78YjoNUq8+hnJS8AwFg/nrLRFLdYYalb18SlcsFRXavCOTfBF3lNyplKkLJeB8YjKVTb1FPHGSy9sXfSdg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://unpkg.com/split-type"></script>


<script>
  // Define the letters and symbols for the random text animation
  const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];

  // TextSplitter class definition
  class TextSplitter {
    constructor(element, options) {
      this.element = element;
      this.options = options;
      if (!this.element.classList.contains('hover-effect')) {
        this.element.classList.add('hover-effect');
      }
      this.chars = this.split();
    }

    split() {
      const { splitTypes } = this.options;
      let splitChars = [];

      if (splitTypes.includes('words')) {
        const words = this.element.innerText.split(' ');
        this.element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        splitChars = Array.from(this.element.querySelectorAll('.word'));
      }
      if (splitTypes.includes('chars')) {
        splitChars = splitChars.flatMap(word => {
          const chars = word.innerText.split('').map(char => `<span class="char">${char}</span>`).join('');
          word.innerHTML = chars;
          return Array.from(word.querySelectorAll('.char'));
        });
      }
      return splitChars;
    }

    getChars() {
      return this.chars;
    }
  }

  // TextAnimator class definition
  class TextAnimator {
    constructor(textElement) {
      if (!textElement || !(textElement instanceof HTMLElement)) {
        throw new Error('Invalid text element provided.');
      }

      this.textElement = textElement;
      this.splitText();
    }

    splitText() {
      this.splitter = new TextSplitter(this.textElement, {
        splitTypes: 'words, chars'
      });

      this.originalChars = this.splitter.getChars().map(char => char.innerHTML);
    }

    animate() {
      this.reset();

      const chars = this.splitter.getChars();
      chars.forEach((char, position) => {
        let initialHTML = char.innerHTML;
        let repeatCount = 0;

        gsap.fromTo(char, {
          opacity: 0
        },
        {
          duration: 0.03,
          onStart: () => {
            gsap.set(char, { '--opa': 1 });
          },
          onComplete: () => {
            gsap.set(char, { innerHTML: initialHTML, delay: 0.03 });
          },
          repeat: 3,
          onRepeat: () => {
            repeatCount++;
            if (repeatCount === 1) {
              gsap.set(char, { '--opa': 0 });
            }
          },
          repeatRefresh: true,
          repeatDelay: 0.04,
          delay: (position + 1) * 0.07,
          innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
          opacity: 1
        });
      });
    }

    reset() {
      const chars = this.splitter.getChars();
      chars.forEach((char, index) => {
        gsap.killTweensOf(char); // Ensure no ongoing animations
        char.innerHTML = this.originalChars[index];
      });
    }
  }

  // Initialize the text animation on hover
  const init = () => {
    // Define the selectors to target
    const selectors = ['.paragraph', '.h-h1', '.h-h2', '.h-h3', '.h-h4', '.h-h5', '.h-h6', '.h-h2_big', 'span'];

    // Check if the device is mobile
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!isMobile) {
      // Apply animation to each selector
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(item => {
          const animator = new TextAnimator(item);
          item.addEventListener('mouseenter', () => {
            animator.animate();
          });
        });
      });

      // Also handle containers of these elements
      document.querySelectorAll('.container').forEach(container => {
        const elements = container.querySelectorAll(selectors.join(', '));
        const animators = Array.from(elements).map(element => new TextAnimator(element));
        container.addEventListener('mouseenter', () => {
          animators.forEach(animator => animator.animate());
        });
      });
    }
  };

  // Only initialize the script if the device is not mobile
  if (!window.matchMedia("(max-width: 767px)").matches) {
    init();
  }
</script>