
// Array of random colors
const colors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#ffb6c1', '#ffd700', '#add8e6', '#98fb98', '#dda0dd', '#ffcccb', '#d3ffce', '#f0fff0', '#f5f5dc', '#e6e6fa', '#ffe4e1', '#f0e68c', '#dda0dd', '#87cefa', '#faebd7'];

// Function to get a random color
export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};


export function findMatchingThemes(firstArray, secondArray, selectedCategory) {
    const matchingElements = [];
    const similarCategories = firstArray["similar-categories"];
    // Check if the first array element has similar categories
    if (similarCategories && similarCategories.length > 0) {
        similarCategories.forEach((category) => {
            // Check if the category name exists in the second array
            const matchingElement = secondArray.find((secondElement) => {
                return secondElement.categories.includes(category.name) || secondElement.categories.includes(selectedCategory);
            });
            if (matchingElement) {
                matchingElements.push(matchingElement);
            }
        });
    }

    return matchingElements;
}