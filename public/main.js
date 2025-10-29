async function saveTierList() {
  const html = document.querySelector("#tierListContainer").outerHTML;

  const res = await fetch("/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html })
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "tierlist.png";
  a.click();
}
