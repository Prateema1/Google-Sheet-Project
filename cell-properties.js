//Storage

let sheetDB = [];

for(let i = 0; i <rows; i++) {
  let sheetRow = [];
  for(let j = 0; j < cols; j++) {
     let cellProp = {
      bold: false,
      italic: false,
      underlined: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      bgColor: "#000000"
     };
     sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

//Selectors for cell properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underlined = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".bg-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";


//Application of two way binding
//Attach property listeners

bold.addEventListener("click", (e) => {
  let address = addressBar.value;
   let [cell, cellProp] = activeCell(address);

   //Modification
   cellProp.bold = !cellProp.bold  // Data change
   cell.style.fontWeight = cellProp.bold ? "bold": "normal";  // UI Change (Part 1)
   bold.style.backgroundColor = cellProp.bold ? activeColorProp: inactiveColorProp; // UI Part 2

})

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
   let [cell, cellProp] = activeCell(address);

   //Modification
   cellProp.italic = !cellProp.italic  // Data change
   cell.style.fontStyle = cellProp.italic ? "italic": "normal";  // UI Change (Part 1)
   italic.style.backgroundColor = cellProp.italic ? activeColorProp: inactiveColorProp; // UI Part 2

})

underlined.addEventListener("click", (e) => {
  let address = addressBar.value;
   let [cell, cellProp] = activeCell(address);

   //Modification
   cellProp.underlined = !cellProp.underlined  // Data change
   cell.style.textDecoration = cellProp.underlined ? "underline": "none";  // UI Change (Part 1)
   underlined.style.backgroundColor = cellProp.underlined ? activeColorProp: inactiveColorProp; // UI Part 2

})

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.fontSize = fontSize.value; // Data change
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.fontFamily = fontFamily.value; // Data change
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.fontColor = fontColor.value; // Data change
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
})

bgColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.bgColor = bgColor.value; // Data change
  cell.style.backgroundColor = cellProp.bgColor;
  bgColor.value = cellProp.bgColor;
})

alignment.forEach((alignElement) => {
  alignElement.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue;
    cell.style.textAlign = cellProp.alignment;
    switch(alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        centerAlign.style.backgroundColor = activeColorProp;
        leftAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        rightAlign.style.backgroundColor = activeColorProp;
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        break;
    }
  })
})

let allCells = document.querySelectorAll(".cell");

for(let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    let cellProp = sheetDB[rid][cid];

    
    //Apply cell properties
    cell.style.fontWeight = cellProp.bold ? "bold": "normal";
    cell.style.fontStyle = cellProp.italic ? "italic": "normal";
    cell.style.textDecoration = cellProp.underlined ? "underline": "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor;
    cell.style.textAlign = cellProp.alignment;

    //Apply UI propeties to selected cell container
    bold.style.backgroundColor = cellProp.bold ? activeColorProp: inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic ? activeColorProp: inactiveColorProp;
    underlined.style.backgroundColor = cellProp.underlined ? activeColorProp: inactiveColorProp;
    fontColor.value = cellProp.fontColor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    bgColor.value = cellProp.bgColor;

    switch(cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        centerAlign.style.backgroundColor = activeColorProp;
        leftAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        rightAlign.style.backgroundColor = activeColorProp;
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        break;
    }
    
  })
}

function activeCell(address) {
  let [rid, cid] = decodeRIDCIDFromAddress(address);
  // Access cell & storage object
  let cell = document.querySelector(`.cell[rowId="${rid}"][colId="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];

}

function decodeRIDCIDFromAddress(address) {
  let rid = Number(address.slice(1) - 1);  // "1" -> 0
  let cid = Number(address.charCodeAt(0)) - 65;  // "A" -> 65
  return [rid, cid];
}