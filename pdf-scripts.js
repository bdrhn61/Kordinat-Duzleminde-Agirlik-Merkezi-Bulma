//const canvas = document.getElementById('my_canvas');
const pdfContainer = document.getElementById('pdf-container');
const pdfUrl = './fff.pdf'; // PDF dosyanızın yolunu doğru şekilde ayarlayın
let currentScale = 1;

pdfjsLib.getDocument(pdfUrl).promise.then(pdfDocument => {
    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
        pdfDocument.getPage(pageNumber).then(page => {
            const viewport = page.getViewport({ scale: currentScale });
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-page';
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const context = canvas.getContext('2d');
            pdfContainer.appendChild(canvas);

            page.render({ canvasContext: context, viewport: viewport });
        });
    }
}).catch(error => {
    console.error('PDF yükleme hatası:', error);
});

// Küçültme düğmesi tıklama olayını ekleyin
const zoomOutButton = document.getElementById('zoomOutButton');
zoomOutButton.addEventListener('click', function () {
    currentScale -= 0.1; // Daha küçük bir ölçek belirleyebilirsiniz
    if (currentScale < 0.1) {
        currentScale = 0.1; // Minimum ölçek değeri
    }

    const pdfContainer = document.getElementById('pdf-container');
    pdfContainer.style.transform = `scale(${currentScale})`; // PDF konteynerini küçült

    // İlgili canvas elemanlarını yeniden boyutlandırın
    const canvasElements = document.querySelectorAll('.pdf-page');
    canvasElements.forEach(canvas => {
        const canvasContext = canvas.getContext('2d');
        const viewport = canvasContext.canvas.viewport;
        viewport.scale(currentScale);
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvasContext.scale(currentScale, currentScale);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Tekrar render yapın
        const page = pdfDocument.getPage(Number(canvas.getAttribute('data-page')));
        page.then(page => {
            page.render({ canvasContext: canvasContext, viewport: viewport });
        });
    });
});



// Küçültme düğmesi tıklama olayını ekleyin
const zoomInButton = document.getElementById('extraButton');

zoomInButton.addEventListener('click', function () {
    currentScale += 0.1; // Daha büyük bir ölçek belirleyebilirsiniz
    pdfContainer.style.transform = `scale(${currentScale})`;

    if (currentScale < 0.1) {
        currentScale = 0.1; // Minimum ölçek değeri
    }
   // pdfContainer.scrollTop = pdfContainer.scrollTop * currentScale;

});


