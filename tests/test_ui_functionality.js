describe("UI Functionality Tests", () => {
    it("should toggle between dark and light themes", () => {
        const themeToggleButton = document.getElementById("theme-toggle");
        const body = document.body;

        expect(body.classList.contains("dark")).toBe(true);

        themeToggleButton.click();
        expect(body.classList.contains("light")).toBe(true);
        expect(body.classList.contains("dark")).toBe(false);

        themeToggleButton.click();
        expect(body.classList.contains("dark")).toBe(true);
        expect(body.classList.contains("light")).toBe(false);
    });

    it("should toggle About section visibility", () => {
        const aboutToggleButton = document.getElementById("about-toggle");
        const aboutPage = document.getElementById("about-page");
        const comparisonResults = document.getElementById("comparison-results");
        const lastSnapshot = document.getElementById("last-snapshot");

        expect(aboutPage.style.display).toBe("none");
        expect(comparisonResults.style.display).toBe("block");
        expect(lastSnapshot.style.display).toBe("block");

        aboutToggleButton.click();
        expect(aboutPage.style.display).toBe("block");
        expect(comparisonResults.style.display).toBe("none");
        expect(lastSnapshot.style.display).toBe("none");

        aboutToggleButton.click();
        expect(aboutPage.style.display).toBe("none");
        expect(comparisonResults.style.display).toBe("block");
        expect(lastSnapshot.style.display).toBe("block");
    });
});

