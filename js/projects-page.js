document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("allProjects");

    if (!container) return;

    try {

        const response = await fetch("data/projects.json");
        const data = await response.json();

        container.innerHTML = "";

        data.projects.forEach(project => {

            const card = document.createElement("div");

            card.className = "project-card";

            card.innerHTML = `

                <div class="project-preview">

                    <img
                        src="${project.thumbnail}"
                        alt="${project.title}"
                        class="thumbnail">

                    <video
                        class="preview-video"
                        muted
                        loop
                        preload="metadata">

                        <source src="${project.preview}" type="video/mp4">

                    </video>

                </div>

                <div class="project-content">

                    <span class="category">${project.category}</span>

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <a href="${project.youtube}"
                       target="_blank"
                       class="btn primary">

                        Watch Project →

                    </a>

                </div>

            `;

            const image = card.querySelector(".thumbnail");
            const video = card.querySelector(".preview-video");

            image.style.opacity = "1";
            video.style.opacity = "0";

            card.addEventListener("mouseenter", () => {

                image.style.opacity = "0";

                video.style.opacity = "1";

                video.play();

            });

            card.addEventListener("mouseleave", () => {

                video.pause();

                video.currentTime = 0;

                video.style.opacity = "0";

                image.style.opacity = "1";

            });

            container.appendChild(card);

        });

    }

    catch (err) {

        console.error("Unable to load projects:", err);

    }

});