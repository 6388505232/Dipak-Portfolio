document.addEventListener('DOMContentLoaded', () => {
    // Get all category cards
    const categoryCards = document.querySelectorAll('.category-card');
    // Get all category details sections
    const categoryDetails = document.querySelectorAll('.category-details');

    // Function to hide all category details
    function hideAllCategories() {
        categoryDetails.forEach(detail => {
            detail.classList.remove('active');
        });
    }

    // Function to remove 'active' class from all category cards
    function removeActiveClassFromCards() {
        categoryCards.forEach(card => {
            card.classList.remove('active');
        });
    }

    // Function to show the selected category's details
    function showCategoryDetails(category) {
        hideAllCategories();  // Hide all category details
        removeActiveClassFromCards();  // Remove active class from all category cards

        // Show the clicked category details and add 'active' class to the clicked card
        const selectedCategory = document.querySelector(`#${category}`);
        const selectedCard = document.querySelector(`[data-category="${category}"]`);
        if (selectedCategory) {
            selectedCategory.classList.add('active');
        }
        if (selectedCard) {
            selectedCard.classList.add('active');
        }

        // Update circular progress for each skill in the selected category
        const skillItems = selectedCategory.querySelectorAll('.progress-circle');
        skillItems.forEach(item => {
            const progress = item.getAttribute('data-progress');
            const progressCircle = item.querySelector('.progress');
            const circumference = 314;  // Circumference of the circle
            const offset = circumference - (circumference * progress) / 100;
            progressCircle.style.strokeDashoffset = offset;
        });
    }

    // Attach event listeners to each category card
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.currentTarget.getAttribute('data-category');  // Get category from data-category attribute
            showCategoryDetails(category);  // Show the clicked category's details
        });
    });

    // Initialize by showing the 'html' category on page load
    showCategoryDetails('html');
});

function showThankYouPopup() {
    document.getElementById('thankYouPopup').style.display = 'flex';
  }

  function closePopup() {
    document.getElementById('thankYouPopup').style.display = 'none';
  }

  // Show the popup when form is submitted
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent actual form submission
    showThankYouPopup();
  });

  var typed = new Typed(".typed-text", {
    strings: ["Frontend Developer ", "Web Developer ", "Software Developer "],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    loop: true
  });


  document.getElementById("hireMeBtn").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link action

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          alert("📍 Location accessed!\nLatitude: " + lat + "\nLongitude: " + lon);

          // After getting location, open mail app
          openMail();
        },
        function (error) {
          alert("⚠️ Location access denied or unavailable.");

          // Still open mail even if location not granted
          openMail();
        }
      );
    } else {
      alert("❌ Geolocation not supported by your browser.");
      openMail();
    }

    function openMail() {
      // This will open the mail app with your email filled in
      window.location.href =
        "mailto:dipak7126dubey@gmail.com?subject=Interested in Hiring You&body=Hi Dipak,%0D%0AWe are interested in connecting with you regarding an opportunity.";
    }
  });



  const counters = document.querySelectorAll('.counter');
  let started = false; // Flag to prevent repeated animation

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200; // smaller increment = slower count

            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 80); // delay slightly increased
            } else {
              counter.innerText = target + '+';
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const achievementsSection = document.getElementById('achievements');
  observer.observe(achievementsSection);




  const rotator1 = document.getElementById('rotator1');
    const rotator2 = document.getElementById('rotator2');
    let angle = 0;

    function rotateSquares() {
      angle += 3;
      rotator1.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      rotator2.style.transform = `translate(-50%, -50%) rotate(${-angle}deg)`;
      requestAnimationFrame(rotateSquares);
    }

    rotateSquares();




    function splitParagraphLines(paragraphEl) {
      const words = paragraphEl.textContent.trim().split(" ");
      paragraphEl.innerHTML = ''; // Clear text
      let line = document.createElement('span');
      line.className = 'line';
      let wordCount = 0;
      let totalDelay = 0;
    
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.animationDelay = `${totalDelay}s`;
        line.appendChild(span);
    
        wordCount++;
        totalDelay += 0.1;
    
        if (wordCount >= 10 || i === words.length - 1) {
          paragraphEl.appendChild(line);
          line = document.createElement('span');
          line.className = 'line';
          totalDelay += 0.25; // Delay before next line starts
          wordCount = 0;
        } else {
          const space = document.createTextNode(" ");
          line.appendChild(space);
        }
      });
    }
    
    function animateWhenVisible(targetEl) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            splitParagraphLines(entry.target);
            entry.target.style.visibility = 'visible';
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5
      });
    
      observer.observe(targetEl);
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      const animatedPara = document.querySelector('[data-animate]');
      if (animatedPara) {
        animateWhenVisible(animatedPara);
      }
    });