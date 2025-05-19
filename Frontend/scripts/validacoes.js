document.addEventListener('DOMContentLoaded', function() {
  // Máscara de telefone com formatação progressiva melhorada
  function mascaraTelefone(telefone) {
    const texto = telefone.value.replace(/\D/g, '');
    const cursorPos = telefone.selectionStart;
    let formato = '';
    
    // Novo tratamento para números com 9º dígito
    if (texto.length > 11) texto = texto.substring(0, 11);
    
    if (texto.length === 11) { // Celular com DDD (11 dígitos)
      formato = texto.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (texto.length === 10) { // Fixo com DDD (10 dígitos)
      formato = texto.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (texto.length > 6) {
      formato = texto.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (texto.length > 2) {
      formato = texto.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (texto.length > 0) {
      formato = `(${texto}`;
    }

    // Mantém a posição do cursor de forma mais precisa
    const mudaPosicao = formato.length - telefone.value.length;
    telefone.value = formato;
    telefone.setSelectionRange(cursorPos + mudaPosicao, cursorPos + mudaPosicao);
  }

  // Aplicar máscara a todos os campos de telefone
  const telefones = document.querySelectorAll('input[type="tel"]');
  telefones.forEach(tel => {
    tel.addEventListener('input', () => mascaraTelefone(tel));
    tel.setAttribute('maxlength', 15);
    tel.setAttribute('placeholder', '(XX) XXXXX-XXXX');
    tel.addEventListener('keydown', (e) => {
      // Permite apenas números e teclas de controle
      if (!/[0-9]|Backspace|Delete|Arrow/.test(e.key)) e.preventDefault();
    });
  });

  // Validação de e-mail em tempo real
  function validarEmail(input) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-ZÀ-ÿ0-9.-]+\.[a-zA-Z]{2,}$/;
    const mensagemErro = input.nextElementSibling;
    
    if (input.value && !emailRegex.test(input.value)) {
      input.classList.add('invalido');
      if (!mensagemErro || !mensagemErro.classList.contains('erro-email')) {
        const divErro = document.createElement('div');
        divErro.className = 'erro-email';
        divErro.textContent = 'Formato inválido (ex: nome@provedor.com)';
        divErro.style.color = 'red';
        divErro.style.fontSize = '0.8em';
        input.insertAdjacentElement('afterend', divErro);
      }
      return false;
    } else {
      input.classList.remove('invalido');
      if (mensagemErro && mensagemErro.classList.contains('erro-email')) {
        mensagemErro.remove();
      }
      return true;
    }
  }

  // Aplicar validação a todos os campos de e-mail
  const emails = document.querySelectorAll('input[type="email"]');
  emails.forEach(email => {
    email.setAttribute('pattern', '^[a-zA-ZÀ-ÿ0-9._%+-]+@[a-zA-ZÀ-ÿ0-9.-]+\\.[a-zA-Z]{2,}$');
    email.setAttribute('placeholder', 'exemplo@dominio.com');
    email.addEventListener('input', () => validarEmail(email));
    email.addEventListener('blur', () => validarEmail(email));
  });
});