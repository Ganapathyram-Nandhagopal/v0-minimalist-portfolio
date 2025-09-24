document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id], header[id]")
  const navButtons = document.querySelectorAll(".nav-button")
  const themeToggleButton = document.getElementById("theme-toggle")
  const sunIcon = themeToggleButton.querySelector(".sun-icon")
  const moonIcon = themeToggleButton.querySelector(".moon-icon")

  let isDark = true // Initial theme state

  // Function to update theme
  const updateTheme = () => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      sunIcon.style.display = "block"
      moonIcon.style.display = "none"
    } else {
      document.documentElement.classList.remove("dark")
      sunIcon.style.display = "none"
      moonIcon.style.display = "block"
    }
  }

  // Initial theme setup
  updateTheme()

  // Theme toggle functionality
  themeToggleButton.addEventListener("click", () => {
    isDark = !isDark
    updateTheme()
  })

  // Intersection Observer for active section and fade-in animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
          // Update active navigation button
          navButtons.forEach((button) => {
            if (button.dataset.section === entry.target.id) {
              button.classList.add("active")
            } else {
              button.classList.remove("active")
            }
          })
        } else {
          entry.target.classList.remove("animate-fade-in-up")
        }
      })
    },
    { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
  )

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Smooth scrolling for navigation buttons
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.dataset.section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    })
  })
})
