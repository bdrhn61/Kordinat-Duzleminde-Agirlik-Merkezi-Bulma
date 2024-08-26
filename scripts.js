const grid = document.getElementById("grid");
const deneme = document.getElementById("deneme");
const markersContainer = document.getElementById("markers");


const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

grid.style.width = `${screenWidth}px`;
grid.style.height = `${screenHeight}px`;




const coordinatesDisplay = document.getElementById("coordinates");

const centerX = grid.offsetWidth / 2;
const centerY = grid.offsetHeight / 2;

grid.addEventListener("mousemove", (event) => {
    const rect = grid.getBoundingClientRect(); 
    const x = event.clientX - rect.left - centerX; 
    const y = centerY - (event.clientY - rect.top); 

    coordinatesDisplay.innerText = `X: ${x}, Y: ${y}`;
});

grid.addEventListener("mouseleave", () => {
    coordinatesDisplay.innerText = "X: 0, Y: 0";
});

const tıklananNoktalar = [];

grid.addEventListener("click", (event) => {
    const rect = grid.getBoundingClientRect(); 
    const x = event.clientX - rect.left - centerX; 
    const y = centerY - (event.clientY - rect.top); 
    tıklananNoktalar.push({ x, y });

    const marker = document.createElement("div");
    marker.className = "marker";
    marker.style.left = `${event.clientX - marker.offsetWidth / 2}px`;
    marker.style.top = `${event.clientY - marker.offsetHeight / 2}px`;

    const markerTop = document.createElement("div");
    markerTop.className = "marker-top";
    markerTop.innerText = `${x},${y}`;

    marker.appendChild(markerTop);

    grid.appendChild(marker);
   // modal.style.display = "block";



    console.log(`Tıklanan koordinatlar: X=${x}, Y=${y}`);
});
deneme.addEventListener("click", (event) => {
    event.stopPropagation();
    if(tıklananNoktalar.length>0){
    let sumX = 0;
    let sumY = 0;
    
    for (const nokta of tıklananNoktalar) {
        sumX += nokta.x;
        sumY += nokta.y;
    }
    
    const ağırlıkMerkeziX = sumX / tıklananNoktalar.length;
    const ağırlıkMerkeziY = sumY / tıklananNoktalar.length;
    
    const marker = document.createElement("div");
    marker.className = "merkez-marker";
    marker.style.left = `${ağırlıkMerkeziX + centerX}px`;
    marker.style.top = `${(-1)*ağırlıkMerkeziY + centerY}px`;

    const markerTop = document.createElement("div");
    markerTop.className = "marker-top";
    markerTop.innerText = `${ağırlıkMerkeziX},${ağırlıkMerkeziY}`;

    marker.appendChild(markerTop);
    grid.appendChild(marker);
    

    console.log(`Ağırlık Merkezi: X=${ağırlıkMerkeziX}, Y=${ağırlıkMerkeziY}`);
}});
