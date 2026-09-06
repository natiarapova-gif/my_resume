const themeButton = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}
themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

const filterButtons = document.querySelectorAll(".filter-button");
const skillGroups = document.querySelectorAll(".skill-group");

const skillSearch = document.getElementById("skill-search");
const noResultsMessage = document.getElementById("no-results");
let selectedCategory = "all";

function updateSkills() {
    const searchQuery = skillSearch.value.trim().toLowerCase();

    let visibleSkillsCount = 0;

    skillGroups.forEach(function (group) {
        const groupCategory = group.dataset.category;
        const matchesCategory =
            selectedCategory === "all" ||
            groupCategory === selectedCategory;
            
        const skillsInGroup = group.querySelectorAll("li");
        let visibleSkillsInGroup = 0;
       
        skillsInGroup.forEach(function (skill) {
            const skillName = skill.textContent.toLowerCase();
            const matchesSearch =
              searchQuery === "" ||
              skillName.includes(searchQuery);
            
            if (matchesCategory && matchesSearch) {
                skill.style.display = "list-item";
                visibleSkillsInGroup += 1;
                visibleSkillsCount += 1;
            } else {
                skill.style.display = "none";
            }
        });
        
        if (visibleSkillsInGroup > 0) {
           group.style.display = "block";
        } else {
           group.style.display = "none";
        }
    });
    if (visibleSkillsCount === 0) {
        noResultsMessage.hidden = false;
    } else {
        noResultsMessage.hidden = true;
    }
}
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;
        filterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });
        button.classList.add("active");
        updateSkills();
    });
});

skillSearch.addEventListener("input", function () {
    updateSkills();
});