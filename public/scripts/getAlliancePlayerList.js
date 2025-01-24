// Find the <h3> element with the value "Członkowie plemienia"
const h3Elements = document.querySelectorAll("h3");
let targetTable;

h3Elements.forEach((h3) => {
  if (h3.textContent.trim() === "Członkowie plemienia") {
    // Assuming the table is the next sibling of the <h3>
    targetTable = h3.nextElementSibling;
  }
});

if (targetTable && targetTable.tagName === "TABLE") {
  const rows = targetTable.querySelectorAll("tr");
  const playersData = [];

  rows.forEach((row, index) => {
    if (index === 0) return; // Skip the header row
    const cells = row.querySelectorAll("td");
    if (cells.length >= 2) {
      // Ensure there are at least two cells (Name and Points)
      const name = cells[0].textContent.trim();
      const pointsText = cells[1].textContent
        .trim()
        .replace(",", "")
        .replace(/\./g, ""); // Remove commas/dots
      const points = parseInt(pointsText, 10); // Convert points to a number
      if (name && !isNaN(points)) {
        playersData.push({ name, points });
      }
    }
  });

  console.log(playersData); // Output the data to the console

  // Copy data to clipboard
  navigator.clipboard
    .writeText(JSON.stringify(playersData, null, 2))
    .then(() => {
      alert("Data copied to clipboard successfully!");
      console.log("Data copied to clipboard:", playersData);
    })
    .catch((err) => {
      console.log("Failed to copy data to clipboard:", err);
      alert("Failed to copy data to clipboard.");
    });

  // Log the list of objects
  console.log(playersData);
} else {
  console.error("Table under 'Członkowie plemienia' not found.");
}
