 // Preview da Foto
      const photoInput = document.getElementById("photoInput");
      const preview = document.getElementById("preview");
      const photoPreview = document.getElementById("photoPreview");
      const photoPlaceholder = document.querySelector(".photo-placeholder"); // Adicionado

      photoPreview.addEventListener("click", function () {
        photoInput.click();
      });

      photoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          preview.src = URL.createObjectURL(file);
          photoPlaceholder.style.display = "none"; // Esconde o placeholder
          preview.style.display = "block"; // Garante que a imagem seja exibida
        } else {
          photoPlaceholder.style.display = "flex"; // Mostra o placeholder se não houver arquivo
          preview.style.display = "none";
        }
      });

      // Mapeamento de cores
      const colorMap = {
        FAB: "#4682B4",
        MB: "#e9e4e9",
        EB: "#2E8B57",
        BB: "#f75f7b",
        PM: "#807f9e",
        Estrangeiro: "#f782c9",
        Concedido: "#d7be1e",
      }

      // Elementos do formulário
      const institutionSelect = document.getElementById("institution");
      const formContainer = document.getElementById("formContainer");

      function updateFormColor() {
        const selectedValue = institutionSelect.value;
        formContainer.style.backgroundColor = colorMap[selectedValue];

        // Ajustar contraste do texto
        const textColor =
          selectedValue === "MB" || selectedValue === "Concedido"
            ? "#333"
            : "#fff";
        formContainer.style.color = textColor;
        document
          .querySelectorAll("h2")
          .forEach((h2) => (h2.style.color = textColor));
      }

      // Eventos
      institutionSelect.addEventListener("change", updateFormColor);
      updateFormColor();

      // Navegação
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          document
            .querySelectorAll(".nav-link")
            .forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
        });
      });

      // Nacionalidade
      const nationalitySelect = document.getElementById("nationality");
      nationalitySelect.addEventListener("change", function () {
        console.log("Nacionalidade:", this.value);
      });

      // PDF Upload
const pdfInput = document.getElementById('pdfInput');
const pdfFileName = document.getElementById('pdfFileName');
const pdfUpload = document.querySelector('.pdf-upload');

pdfInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        pdfFileName.textContent = `Arquivo selecionado: ${file.name}`;
        pdfUpload.style.borderColor = '#28a745';
        pdfUpload.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
    } else {
        pdfFileName.textContent = '';
        pdfUpload.style.borderColor = '#dee2e6';
        pdfUpload.style.backgroundColor = '#f8f9fa';
    }
});

// Drag and Drop (opcional)
pdfUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    pdfUpload.classList.add('dragover');
});

pdfUpload.addEventListener('dragleave', () => {
    pdfUpload.classList.remove('dragover');
});

pdfUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    pdfUpload.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
        pdfInput.files = files;
        pdfInput.dispatchEvent(new Event('change'));
    }
});

