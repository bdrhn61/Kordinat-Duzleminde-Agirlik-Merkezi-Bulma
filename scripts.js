// Koordinat düzlemi öğesini alın
const grid = document.getElementById("grid");
const deneme = document.getElementById("deneme");
const markersContainer = document.getElementById("markers");


// Ekran boyutunu alın
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Koordinat düzlemine ekran boyutunu uygula
grid.style.width = `${screenWidth}px`;
grid.style.height = `${screenHeight}px`;




const coordinatesDisplay = document.getElementById("coordinates");

// Koordinat düzlemi merkezi
const centerX = grid.offsetWidth / 2;
const centerY = grid.offsetHeight / 2;

// Mausun koordinatları izle
grid.addEventListener("mousemove", (event) => {
    const rect = grid.getBoundingClientRect(); // Koordinat düzleminin konumunu al
    const x = event.clientX - rect.left - centerX; // X koordinatını merkeze göre hesapla
    const y = centerY - (event.clientY - rect.top); // Y koordinatını merkeze göre hesapla

    // Koordinatları göster
    coordinatesDisplay.innerText = `X: ${x}, Y: ${y}`;
});

// Mausun koordinatları ekrandan ayrıldığında temizle
grid.addEventListener("mouseleave", () => {
    coordinatesDisplay.innerText = "X: 0, Y: 0";
});

const tıklananNoktalar = [];

grid.addEventListener("click", (event) => {
    const rect = grid.getBoundingClientRect(); // Koordinat düzleminin konumunu al
    const x = event.clientX - rect.left - centerX; // X koordinatını merkeze göre hesapla
    const y = centerY - (event.clientY - rect.top); // Y koordinatını merkeze göre hesapla
    tıklananNoktalar.push({ x, y });

    // Tıklama işaretini oluştur
    const marker = document.createElement("div");
    marker.className = "marker";
    marker.style.left = `${event.clientX - marker.offsetWidth / 2}px`;
    marker.style.top = `${event.clientY - marker.offsetHeight / 2}px`;
    //marker.innerText = `X: ${x}, Y: ${y}`; // Koordinatları işaretin içinde göster

    const markerTop = document.createElement("div");
    markerTop.className = "marker-top";
    markerTop.innerText = `${x},${y}`;

    // İşaretin üst kısmını işaretin içine ekleyin
    marker.appendChild(markerTop);

    // Tıklama işaretini grid içine ekleyin
    grid.appendChild(marker);
   // modal.style.display = "block";



    // Tıklanan koordinatları yazdır (isteğe bağlı)
    console.log(`Tıklanan koordinatlar: X=${x}, Y=${y}`);
});
deneme.addEventListener("click", (event) => {
    event.stopPropagation();
    if(tıklananNoktalar.length>0){
    let sumX = 0;
    let sumY = 0;
    
    // Tüm tıklanan noktaların koordinatlarını topla
    for (const nokta of tıklananNoktalar) {
        sumX += nokta.x;
        sumY += nokta.y;
    }
    
    // Ağırlık merkezini hesapla
    const ağırlıkMerkeziX = sumX / tıklananNoktalar.length;
    const ağırlıkMerkeziY = sumY / tıklananNoktalar.length;
    
    const marker = document.createElement("div");
    marker.className = "merkez-marker";
    marker.style.left = `${ağırlıkMerkeziX + centerX}px`;
    marker.style.top = `${(-1)*ağırlıkMerkeziY + centerY}px`;
    //marker.innerText = `X: ${x}, Y: ${y}`; // Koordinatları işaretin içinde göster

    const markerTop = document.createElement("div");
    markerTop.className = "marker-top";
    markerTop.innerText = `${ağırlıkMerkeziX},${ağırlıkMerkeziY}`;

    // İşaretin üst kısmını işaretin içine ekleyin
    marker.appendChild(markerTop);
    grid.appendChild(marker);
    

    // Ağırlık merkezini yazdır (isteğe bağlı)
    console.log(`Ağırlık Merkezi: X=${ağırlıkMerkeziX}, Y=${ağırlıkMerkeziY}`);
}});
