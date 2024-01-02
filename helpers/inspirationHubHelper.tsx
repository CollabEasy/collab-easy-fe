import { NewInspoTheme } from "types/model";

// Array of random colors
const colors = [
    '#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#ffb6c1', '#ffd700', 
    '#add8e6', '#98fb98', '#dda0dd', '#ffcccb', '#d3ffce', '#f0fff0', '#f5f5dc', 
    '#e6e6fa', '#ffe4e1', '#f0e68c', '#dda0dd', '#87cefa', '#faebd7', '#f0e4d4',
    '#f5f0ff', '#f8f4ff', '#f0f4f5', '#e9f2f9', '#e5f8f9', '#e9f4f7', '#e8f5f4', 
    '#f2f4f4', '#f5f4f2', '#f4f4f5', '#f0f4f8', '#f5f0f4', '#f4f5f0', '#f7f7f7', 
    '#f0f8f4', '#f4f8f0', '#f8f0f4', '#f4f0f8', '#f0f0f8', '#f8f0f0', '#e5f0f8', 
    '#f0f8e5', '#f8e5f0', '#e5f8f0', '#f0e5f8', '#f8f4e5', '#e5f4f8', '#f4e5f8', 
    '#f8e5f4', '#f4f8e5', '#e0f4f5', '#f5f4e0', '#f4e0f5', '#e0f5f4', '#f4f5e0', 
    '#e0f8f4', '#f4f0e0', '#f0e0f4', '#f4e0f0', '#f0f4e0', '#e0f4f8', '#f8f4e0', 
    '#f4e0f8', '#e0f8f4', '#f8e0f4', '#f4f8e0', '#e0f0f8', '#f8f0e0', '#f0e0f8', 
    '#f8e0f0', '#dce5f8', '#f8e5dc', '#e5f8dc', '#dce0f8', '#f8e0dc', '#e0f8dc', 
    '#dce5f0', '#f0e5dc', '#e5f0dc', '#dce0f0', '#f0e0dc', '#d5e5f8', '#f8e5d5', 
    '#e5f8d5', '#d5e0f8', '#f8e0d5', '#e0f8d5', '#d5e5f0', '#f0e5d5', '#e5f0d5',
    '#d5e0f0', '#f0e0d5', '#d0e0f8', '#f8e0d0', '#e0f8d0', '#d0e5f8', '#f8e5d0', 
    '#e5f0d0', '#d0e0f0', '#f0e0d0', '#d0e4f5', '#f5e4d0', '#e4f5d0', '#d0e5f4', 
    '#f4e5d0', '#e5f4d0', '#d4e0f4', '#f4e0d4', '#e0f4d4', '#d4e4f0', '#f0e4d4', 
    '#e4f0d4',
];
  

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

export function CreateNewInspoThemeEmailContent(newInspoThemeData: NewInspoTheme) {
    let emailContent = "";
    if (newInspoThemeData.title) {
        emailContent += "The title is: " + newInspoThemeData.title + "\n";
    }
    if (newInspoThemeData.description) {
        emailContent += "The description is: " + newInspoThemeData.description + "\n";
    }
    if (newInspoThemeData.categories) {
        emailContent += "It is submitted for skills: " + newInspoThemeData.categories + "\n";
    }
    if (newInspoThemeData.full_name) {
        emailContent += "It is submitted by: " + newInspoThemeData.full_name + "\n";
    }
    if (newInspoThemeData.email) {
        emailContent += "The user email is: " + newInspoThemeData.email;
    }
    return emailContent;
}