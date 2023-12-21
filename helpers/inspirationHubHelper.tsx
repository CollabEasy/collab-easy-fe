
// Array of random colors
const colors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#ffb6c1', '#ffd700', '#add8e6', '#98fb98', '#dda0dd', '#ffcccb', '#d3ffce', '#f0fff0', '#f5f5dc', '#e6e6fa', '#ffe4e1', '#f0e68c', '#dda0dd', '#87cefa', '#faebd7'];

// Function to get a random color
export function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};


function findUniqueElementsByTitle(themes) {
    const uniqueElements = [];
    const titles = [];

    themes.forEach((element) => {
        // Check if the title is not in the list of titles
        if (titles.indexOf(element.title) === -1) {
            // Add the title to the list and the element to the uniqueElements array
            titles.push(element.title);
            uniqueElements.push(element);
        }
    });

    return uniqueElements;
}


export function findMatchingThemes(firstArray, secondArray, selectedCategory) {
    const matchingElements = [];
    const similarCategoriesNames = [];
    firstArray["similar-categories"].forEach((category) => {
        similarCategoriesNames.push(category["name"]);
    });
    similarCategoriesNames.push(selectedCategory);

    // Check if the first array element has similar categories
    if (similarCategoriesNames && similarCategoriesNames.length > 0) {
        similarCategoriesNames.forEach((categoryName) => {
            secondArray.forEach(element => {
                if (element["categories"].includes(categoryName)) {
                    matchingElements.push(element);
                }
            });
        });
    }

    return findUniqueElementsByTitle(matchingElements);
}