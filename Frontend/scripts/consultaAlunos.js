document.addEventListener('DOMContentLoaded', function () {
  const btnPesquisar = document.getElementById('btnPesquisar');
  const searchType = document.getElementById('searchType');
  const searchInput = document.getElementById('searchInput');
  const resultsBody = document.getElementById('resultsBody');
  const detailsModal = document.getElementById('detailsModal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.querySelector('.close');

  // Função para buscar alunos
  async function buscarAlunos() {
    const tipo = searchType.value;
    const termo = searchInput.value.trim();

    if (!termo && tipo !== 'todos') {
      alert('Por favor, digite um termo para pesquisa.');
      return;
    }

    try {
      let url = 'http://localhost:3000/consulta';

      // Adiciona parâmetros de consulta se não for uma busca geral
      if (tipo !== 'todos' && termo) {
        url += `?${tipo}=${encodeURIComponent(termo)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const alunos = await response.json();
      console.log(alunos);
      exibirResultados(alunos);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao buscar alunos. Por favor, tente novamente.');
    }
  }

  // Função para exibir resultados na tabela
  function exibirResultados(aluno) {
    resultsBody.innerHTML = '';

    // Verifica se é um objeto vazio ou undefined
    if (!aluno || Object.keys(aluno).length === 0) {
      resultsBody.innerHTML = '<tr><td colspan="7">Nenhum aluno encontrado</td></tr>';
      return;
    }

    const row = document.createElement('tr');

    // Foto (thumbnail)
    const fotoCell = document.createElement('td');
    if (aluno.foto_aluno) {
      const fotoImg = document.createElement('img');
      fotoImg.src = `/backend/uploads/${aluno.foto_aluno}`;
      fotoImg.alt = 'Foto do aluno';
      fotoImg.style.width = '60px';
      fotoImg.style.height = '70px';
      fotoImg.style.borderRadius = '10%';
      fotoCell.appendChild(fotoImg);
    } else {
      fotoCell.textContent = 'Sem foto';
    }

    // Número
    const numeroCell = document.createElement('td');
    numeroCell.textContent = aluno.aluno_numero || 'N/A';

    // Nome
    const nomeCell = document.createElement('td');
    nomeCell.textContent = aluno.nome_aluno || 'N/A';

    // Turma
    const turmaCell = document.createElement('td');
    turmaCell.textContent = aluno.turma || 'N/A';

    // Ano
    const anoCell = document.createElement('td');
    anoCell.textContent = aluno.ano_letivo || 'N/A';

    // Protocolo
    const protocoloCell = document.createElement('td');
    protocoloCell.textContent = aluno.protocolo_numero || 'N/A';

    // Ações
    const acoesCell = document.createElement('td');
    const btnDetalhes = document.createElement('button');
    btnDetalhes.textContent = 'Detalhes';

    const updateCell = document.createElement('td');
    const btnUpdate = document.createElement('a');
    btnUpdate.textContent = 'Atualizar';
    btnUpdate.href = `/Frontend/templates/editar.html?protocolo_numero=${aluno.protocolo_numero}`; // Substitua pelo nome correto da sua página
    btnUpdate.classList.add('btn-update'); // Opcional: para aplicar um estilo CSS
    
    updateCell.appendChild(btnUpdate);
    

    // Estilos inline
    btnDetalhes.style.backgroundColor = '#176417';
    btnDetalhes.style.color = 'white';
    btnDetalhes.style.border = 'none';
    btnDetalhes.style.letterSpacing = '1px';
    btnDetalhes.style.padding = '8px 20px';
    btnDetalhes.style.fontSize = '1em';
    btnDetalhes.style.borderRadius = '5px';
    btnDetalhes.style.cursor = 'pointer';
    btnDetalhes.style.fontWeight = '450';

    btnDetalhes.addEventListener('click', () => exibirDetalhes(aluno));
    acoesCell.appendChild(btnDetalhes);


    // Montar a linha
    row.appendChild(fotoCell);
    row.appendChild(numeroCell);
    row.appendChild(nomeCell);
    row.appendChild(turmaCell);
    row.appendChild(anoCell);
    row.appendChild(protocoloCell);
    row.appendChild(acoesCell);
    row.appendChild(updateCell)

    resultsBody.appendChild(row);
  }
  // Função para exibir detalhes completos no modal
  function exibirDetalhes(aluno) {
    modalContent.innerHTML = `
        <div class="modal-details">
          <div class="detail-row grid">
            <div class="detail-photo">
              ${aluno.foto_aluno ? `<img src="/backend/uploads/${aluno.foto_aluno}" alt="Foto do aluno" style="width: 150px; height: 170px; border-radius: 8px;">
              ` : 'Sem foto'}
            </div>
            <div class="detail-info">
              <p><strong>Número:</strong> ${aluno.aluno_numero || 'N/A'}</p>
              <p><strong>Nome:</strong> ${aluno.nome_aluno || 'N/A'}</p>
              <p><strong>Protocolo:</strong> ${aluno.protocolo_numero || 'N/A'}</p>
              <p><strong>E-mail:</strong> ${aluno.email_aluno || 'N/A'}</p>
            </div>
          </div>

          <h3>Dados dos Pais</h3>
          <div class="detail-row grid">
            <div class="detail-col">
              <h4>Pai</h4>
              <p><strong>Nome:</strong> ${aluno.nome_pai || 'N/A'}</p>
              <p><strong>E-mail:</strong> ${aluno.email_pai || 'N/A'}</p>
              <p><strong>Telefone:</strong> ${aluno.telefone_pai || 'N/A'}</p>
              <p><strong>Posto/Graduação:</strong> ${aluno.posto_pai || 'N/A'}</p>
            </div>
            <div class="detail-col">
              <h4>Mãe</h4>
              <p><strong>Nome:</strong> ${aluno.nome_mae || 'N/A'}</p>
              <p><strong>E-mail:</strong> ${aluno.email_mae || 'N/A'}</p>
              <p><strong>Telefone:</strong> ${aluno.telefone_mae || 'N/A'}</p>
              <p><strong>Posto/Graduação:</strong> ${aluno.posto_mae || 'N/A'}</p>
            </div>
          </div>

          <h3>Responsável</h3>
          <div class="detail-row grid">
            <p><strong>Nome:</strong> ${aluno.responsavel_nome || 'N/A'}</p>
            <p><strong>E-mail:</strong> ${aluno.responsavel_email || 'N/A'}</p>
            <p><strong>Telefone:</strong> ${aluno.responsavel_telefone || 'N/A'}</p>
            <p><strong>Endereço:</strong> ${aluno.responsavel_endereco || 'N/A'}</p>
            <p><strong>Observações:</strong> ${aluno.observacoes || 'N/A'}</p>
          </div>

          <h3>Documentos</h3>
          <div class="detail-row grid">
            <p><strong>Documentos Bloco 1:</strong>${aluno.doc_bloco_1 ? `
              <a href="/backend/uploads/${aluno.doc_bloco_1}" target="_blank">Abrir PDF</a> |
              <a href="/backend/uploads/${aluno.doc_bloco_1}" download>Baixar PDF</a>` : 'Não disponível'}
            </p>
            <p><strong>Documentos Bloco 1:</strong>${aluno.doc_bloco_2 ? `
              <a href="/backend/uploads/${aluno.doc_bloco_1}" target="_blank">Abrir PDF</a> |
              <a href="/backend/uploads/${aluno.doc_bloco_1}" download>Baixar PDF</a>` : 'Não disponível'}
            </p>
            <p><strong>Documentos Bloco 1:</strong>${aluno.doc_bloco_3 ? `
              <a href="/backend/uploads/${aluno.doc_bloco_1}" target="_blank">Abrir PDF</a> |
              <a href="/backend/uploads/${aluno.doc_bloco_1}" download>Baixar PDF</a>` : 'Não disponível'}
            </p>
           
          </div>
        </div>
      `;

    detailsModal.style.display = 'block';
  }


  // Event Listeners
  btnPesquisar.addEventListener('click', buscarAlunos);

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      buscarAlunos();
    }
  });

  closeModal.addEventListener('click', function () {
    detailsModal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === detailsModal) {
      detailsModal.style.display = 'none';
    }
  });
});