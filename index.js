
var selectedColor = ""
var selectedScheme = ""
var resultColors = []

document.getElementById("color-picker-form").addEventListener("submit", function (e) {
    e.preventDefault();
    selectedScheme = document.getElementById('color-scheme').value;
    selectedColor = document.getElementById('color-input').value;
    // console.log("selectedScheme: ", selectedScheme, "color: ", selectedColor)
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor.slice(1, 7)}&mode=${selectedScheme}&count=5`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            console.log("data: ", data)
            data.colors.forEach(color => {
                console.log("color: ", color.hex.value.slice(1, 7))
                resultColors.push(color.hex.value.slice(1, 7))
            });
            render()
        });
})

function render() {

    // Select all the direct child divs inside #container
    const columns = document.querySelectorAll('#col-container > div');

    let i = 0
    // Loop through each child div
    columns.forEach((column) => {
        // Select the inner nested div
        const colColor = column.querySelector('div');

        // Change background color of inner div
        colColor.style.backgroundColor = `#${resultColors[i]}`; // set your desired color

        // Select the p tag inside inner div and change text
        const colorText = column.querySelector('p');
        if (colorText) {
            colorText.textContent = `#${resultColors[i]}`; // customize as needed
        }
        i++;
    });

    // console.log("selectedColor: ", selectedColor, "selectedScheme: ", selectedScheme, "resultColors: ", resultColors)

    resultColors = []
}