 class GalleryApp {
  constructor() {
    this.imgOrder = [
      'QUANTIC ORCHID',
      'LUMINA FLORENTIA',
      'PHOTON FERN',
      'QUANTUM IRIS',
      'BIO GLADIOLUS',
      'SYNAPSE DAISY'
    ];
    this.currentIndex = this.imgOrder.length - 1;
    this.totalItems = this.imgOrder.length;
    this.el = document.querySelector(".section_flowers-wrap");
    this.imgs = document.querySelectorAll(".gallery_flower_container .img");
    this.bgs = document.querySelectorAll(".flower_bg-wrap .bg-flower-container");
    this.titleTopContainers = document.querySelectorAll(".title_top-container .flower-title_01-wrap");
    this.titleBottomContainers = document.querySelectorAll(".title_bottom-container .flower-title_02-wrap");
    this.numbers = document.querySelectorAll(".listed_numbers-wrap div");
    this.links = document.querySelectorAll(".flower_link-wrap a");
    this.isAnimating = false; // Flag to check if an animation is in progress

    // Debugging logs
    console.log('Total items:', this.totalItems);
    console.log('Element:', this.el);
    console.log('Images:', this.imgs);
    console.log('Backgrounds:', this.bgs);
    console.log('Title Top Containers:', this.titleTopContainers);
    console.log('Title Bottom Containers:', this.titleBottomContainers);
    console.log('Numbers:', this.numbers);
    console.log('Links:', this.links);

    if (!this.el || !this.imgs.length || !this.bgs.length || !this.titleTopContainers.length || !this.titleBottomContainers.length || !this.numbers.length) {
      console.error('Initialization failed: Elements not found');
      return;
    }

    this.initUI();
    this.initEvents();
  }

  initUI() {
    gsap.set(this.imgs, {
      opacity: 0,
      filter: "blur(60px)",
      rotation: 5 // Set initial rotation to 5 degrees
    });
    gsap.set(this.imgs[this.currentIndex], {
      opacity: 1,
      filter: "blur(0px)",
      rotation: 0 // Set rotation to 0 degrees for the current image
    });
    gsap.set(this.bgs, {
      opacity: 0
    });
    gsap.set(this.bgs[this.currentIndex], {
      opacity: 1
    });
    gsap.set(this.titleTopContainers, {
      opacity: 0,
      y: 100
    });
    gsap.set(this.titleTopContainers[this.currentIndex], {
      opacity: 1,
      y: 0
    });
    gsap.set(this.titleBottomContainers, {
      opacity: 0,
      y: 100
    });
    gsap.set(this.titleBottomContainers[this.currentIndex], {
      opacity: 1,
      y: 0
    });
    gsap.set(this.numbers, {
      opacity: 0,
      y: 200
    });
    gsap.set(this.numbers[this.currentIndex], {
      opacity: 1,
      y: 0
    });

    // Hide all links initially
    gsap.set(this.links, { display: 'none' });
    // Show the current link
    gsap.set(this.links[this.currentIndex], { display: 'block' });
  }

  initEvents() {
    document.querySelector(".left_arrow-block").addEventListener("click", (e) => {
      e.preventDefault();
      if (!this.isAnimating) {
        this.onSelectIndex(this.currentIndex + 1); // Reverse order for prev button
      }
    });
    document.querySelector(".right_arrow-block").addEventListener("click", (e) => {
      e.preventDefault();
      if (!this.isAnimating) {
        this.onSelectIndex(this.currentIndex - 1); // Reverse order for next button
      }
    });
  }

  onSelectIndex(index) {
    if (this.isAnimating) return; // Prevent new animation if one is already in progress

    this.isAnimating = true; // Set the flag to indicate an animation is in progress

    if (index < 0) {
      index = this.totalItems - 1;
    } else if (index >= this.totalItems) {
      index = 0;
    }

    const currentImg = this.imgs[this.currentIndex];
    const nextImg = this.imgs[index];
    const currentBg = this.bgs[this.currentIndex];
    const nextBg = this.bgs[index];
    const currentTitleTop = this.titleTopContainers[this.currentIndex];
    const nextTitleTop = this.titleTopContainers[index];
    const currentTitleBottom = this.titleBottomContainers[this.currentIndex];
    const nextTitleBottom = this.titleBottomContainers[index];
    const currentNumber = this.numbers[this.currentIndex];
    const nextNumber = this.numbers[index];
    const currentLink = this.links[this.currentIndex];
    const nextLink = this.links[index];

    // Debugging logs
    console.log('Switching from:', this.currentIndex, 'to:', index);
    console.log('Current Image:', currentImg);
    console.log('Next Image:', nextImg);
    console.log('Current Background:', currentBg);
    console.log('Next Background:', nextBg);
    console.log('Current Title Top:', currentTitleTop);
    console.log('Next Title Top:', nextTitleTop);
    console.log('Current Title Bottom:', currentTitleBottom);
    console.log('Next Title Bottom:', nextTitleBottom);
    console.log('Current Number:', currentNumber);
    console.log('Next Number:', nextNumber);
    console.log('Current Link:', currentLink);
    console.log('Next Link:', nextLink);

    // Animate flowers
    gsap.timeline()
      .to(currentImg, {
        opacity: 0,
        filter: "blur(60px)",
        rotation: 5,
        duration: 0.6,
        ease: "power4.out"
      }) // Add blur
      .set(currentImg, {
        filter: "blur(60px)",
        rotation: 5
      }) // Reset to initial state
      .to(nextImg, {
        opacity: 1,
        filter: "blur(0px)",
        rotation: 0,
        duration: 0.6,
        ease: "power4.out"
      });

    // Animate backgrounds
    gsap.set(nextBg, {
      opacity: 1
    }); // Ensure next background is already visible
    gsap.timeline()
      .to(currentBg, {
        opacity: 0,
        duration: 0.6,
        ease: "power4.out"
      }) // Ensure ease out animation for the current background
      .set(nextBg, {
        opacity: 1
      }); // Ensure next background is already visible

    // Animate titles
    gsap.timeline()
      .to(currentTitleBottom, {
        y: -200,
        opacity: 0,
        duration: 0.6,
        ease: "power4.out"
      })
      .set(currentTitleBottom, {
        opacity: 0,
        y: 200
      })
      .to(nextTitleBottom, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power4.out"
      });

    gsap.timeline()
      .to(currentTitleTop, {
        y: -200,
        opacity: 0,
        duration: 0.6,
        ease: "power4.out"
      }, "-=0.2")
      .set(currentTitleTop, {
        opacity: 0,
        y: 200
      })
      .to(nextTitleTop, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power4.out"
      });

    // Animate numbers
    gsap.timeline()
      .to(currentNumber, {
        opacity: 0,
        y: 200,
        duration: 0.6,
        ease: "power4.out"
      })
      .set(currentNumber, {
        y: -200
      })
      .to(nextNumber, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power4.out"
      });

    // Update links
    gsap.set(currentLink, { display: 'none' });
    gsap.set(nextLink, { display: 'block' });

    // Reset the flag when the animation is complete
    setTimeout(() => {
      this.isAnimating = false;
    }, 600); // Match this duration with the longest animation duration

    this.currentIndex = index;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GalleryApp();
});
