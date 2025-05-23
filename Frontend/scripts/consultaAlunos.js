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
      fotoImg.style.width = '70px';
      fotoImg.style.height = '100px';
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

    const btnAtualizar = document.createElement('button'); // Mudado de <a> para <button>
    btnAtualizar.textContent = 'Atualizar';

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';

    // Aplicar estilos aos botões
    const buttonStyle = {
      color: 'white',
      border: 'none',
      letterSpacing: '1px',
      padding: '4px 10px',
      fontSize: '1em',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '450',
      marginRight: '5px',
      display: 'inline-block'
    };

    Object.assign(btnDetalhes.style, {
      ...buttonStyle,
      backgroundColor: '#176417' // Verde
    });

    Object.assign(btnAtualizar.style, {
      ...buttonStyle,
      backgroundColor: '#1a73e8' // Azul
    });

    Object.assign(btnExcluir.style, {
      ...buttonStyle,
      backgroundColor: '#d9534f' // Vermelho
    });

    // Adicionar eventos
    btnDetalhes.addEventListener('click', () => exibirDetalhes(aluno));
    btnAtualizar.addEventListener('click', () => abrirModalAtualizacao(aluno));
    btnExcluir.addEventListener('click', () => confirmarExclusao(aluno));

    // Adicionar botões à célula
    acoesCell.appendChild(btnDetalhes);
    acoesCell.appendChild(btnAtualizar);
    acoesCell.appendChild(btnExcluir);

    // Montar a linha
    row.appendChild(fotoCell);
    row.appendChild(numeroCell);
    row.appendChild(nomeCell);
    row.appendChild(turmaCell);
    row.appendChild(anoCell);
    row.appendChild(protocoloCell);
    row.appendChild(acoesCell);

    resultsBody.appendChild(row);
  }

  // Função para exibir detalhes completos no modal
  function exibirDetalhes(aluno) {
    modalContent.innerHTML = `
        <div class="modal-details">
          <div class="detail-row grid">
            <div class="detail-photo">
              ${aluno.foto_aluno ? `<img src="/backend/uploads/${aluno.foto_aluno}" alt="Foto do aluno" style="width: 150px; height: 195px; border-radius: 8px;">
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
            <p><strong>Documentos Bloco 2:</strong>${aluno.doc_bloco_2 ? `
              <a href="/backend/uploads/${aluno.doc_bloco_2}" target="_blank">Abrir PDF</a> |
              <a href="/backend/uploads/${aluno.doc_bloco_2}" download>Baixar PDF</a>` : 'Não disponível'}
            </p>
            <p><strong>Documentos Bloco 3:</strong>${aluno.doc_bloco_3 ? `
              <a href="/backend/uploads/${aluno.doc_bloco_3}" target="_blank">Abrir PDF</a> |
              <a href="/backend/uploads/${aluno.doc_bloco_3}" download>Baixar PDF</a>` : 'Não disponível'}
            </p>
          </div>
        </div>
      `;

    detailsModal.style.display = 'block';
  }

  // Função para exibir modal de confirmação de exclusão
  function exibirModalExclusao(aluno) {
    modalContent.innerHTML = `
        <div class="modal-details">
            <h2 style="color: #d9534f; margin-bottom: 20px;">Confirmar Exclusão</h2>
            
            <div class="detail-row grid">
                <div class="detail-photo">
                    ${aluno.foto_aluno ? `<img src="/backend/uploads/${aluno.foto_aluno}" alt="Foto do aluno" style="width: 150px; height: 195px; border-radius: 8px;">` : 'Sem foto'}
                </div>
                <div class="detail-info">
                    <p><strong>Número:</strong> ${aluno.aluno_numero || 'N/A'}</p>
                    <p><strong>Nome:</strong> ${aluno.nome_aluno || 'N/A'}</p>
                    <p><strong>Protocolo:</strong> ${aluno.protocolo_numero || 'N/A'}</p>
                </div>
            </div>

            <p style="margin: 20px 0; font-weight: bold;">Você está prestes a excluir esta pasta permanentemente. Tem certeza que deseja continuar?</p>

            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 30px;">
                <button id="confirmarExclusao" style="background-color: #d9534f; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Confirmar Exclusão</button>
                <button id="cancelarExclusao" style="background-color: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Cancelar</button>
            </div>
        </div>
    `;

    detailsModal.style.display = 'block';

    // Adicionar eventos aos botões do modal
    document.getElementById('confirmarExclusao').addEventListener('click', () => {
      executarExclusao(aluno.protocolo_numero);
      detailsModal.style.display = 'none';
    });

    document.getElementById('cancelarExclusao').addEventListener('click', () => {
      detailsModal.style.display = 'none';
    });
  }

  // Função para abrir modal de atualização
  function abrirModalAtualizacao(aluno) {
    modalContent.innerHTML = `
      <div class="modal-details">
        <h2 style="color: #1a73e8; margin-bottom: 20px;">Atualizar Aluno</h2>
        
        <form id="formAtualizar">
          <div class="detail-row grid">
            <div class="detail-photo">
              ${aluno.foto_aluno ? `<img id="previewFoto" src="/backend/uploads/${aluno.foto_aluno}" alt="Foto do aluno" style="width: 150px; height: 195px; border-radius: 8px;">` : 'Sem foto'}
              <input type="file" name="foto_aluno" id="foto_aluno" accept="image/*" style="margin-top: 10px;">
            </div>
            <div class="detail-info">
              <p><strong>Número:</strong> <input type="text" name="aluno_numero"  value="${aluno.aluno_numero || ''}" style="padding: 5px; width: 100%;"></p>
              <p><strong>Nome:</strong> <input type="text" name="nome_aluno" id="nome_aluno" value="${aluno.nome_aluno || ''}" style="padding: 5px; width: 100%; "text-transform: uppercase"></p>
              <p><strong>Protocolo:</strong> ${aluno.protocolo_numero || 'N/A'}</p>
              <p><strong>E-mail:</strong> <input type="email" name="email_aluno" value="${aluno.email_aluno || ''}" style="padding: 5px; width: 100%;"></p>
            </div>
          </div>

          <h3>Dados dos Pais</h3>
          <div class="detail-row grid">
            <div class="detail-col">
              <h4>Pai</h4>
              <p><strong>Nome:</strong> <input type="text" name="nome_pai" value="${aluno.nome_pai || ''}" style="padding: 5px; width: 100%; "text-transform: uppercase""></p>
              <p><strong>E-mail:</strong> <input type="email" name="email_pai" value="${aluno.email_pai || ''}" style="padding: 5px; width: 100%;"></p>
              <p><strong>Telefone:</strong> <input type="text" name="telefone_pai" value="${aluno.telefone_pai || ''}" style="padding: 5px; width: 100%;"></p>
            </div>
            <div class="detail-col">
              <h4>Mãe</h4>
              <p><strong>Nome:</strong> <input type="text" name="nome_mae" value="${aluno.nome_mae || ''}" style="padding: 5px; width: 100%; "text-transform: uppercase""></p>
              <p><strong>E-mail:</strong> <input type="email" name="email_mae" value="${aluno.email_mae || ''}" style="padding: 5px; width: 100%;"></p>
              <p><strong>Telefone:</strong> <input type="text" name="telefone_mae" value="${aluno.telefone_mae || ''}" style="padding: 5px; width: 100%;"></p>
            </div>
          </div>

          <h3>Documentos</h3>
    <div class="detail-row grid">
      <div class="documento-input">
        <label>Bloco 1:</label>
        ${aluno.doc_bloco_1 ? `
          <a href="/backend/uploads/${aluno.doc_bloco_1}" target="_blank">Ver atual</a>
          <input type="file" name="doc_bloco_1" accept=".pdf">
        ` : '<input type="file" name="doc_bloco_1" accept=".pdf">'}
      </div>
      
      <div class="documento-input">
        <label>Bloco 2:</label>
        ${aluno.doc_bloco_2 ? `
          <a href="/backend/uploads/${aluno.doc_bloco_2}" target="_blank">Ver atual</a>
          <input type="file" name="doc_bloco_2" accept=".pdf">
        ` : '<input type="file" name="doc_bloco_2" accept=".pdf">'}
      </div>
      
      <div class="documento-input">
        <label>Bloco 3:</label>
        ${aluno.doc_bloco_3 ? `
          <a href="/backend/uploads/${aluno.doc_bloco_3}" target="_blank">Ver atual</a>
          <input type="file" name="doc_bloco_3" accept=".pdf">
        ` : '<input type="file" name="doc_bloco_3" accept=".pdf">'}
      </div>
    </div>

          <div style="display: flex; justify-content: center; gap: 20px; margin-top: 30px;">
            <button type="submit" style="background-color: #1a73e8; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Salvar Alterações</button>
            <button type="button" id="cancelarAtualizacao" style="background-color: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Cancelar</button>
          </div>
        </form>
      </div>
    `;

    // Preview da nova foto
    document.getElementById('foto_aluno').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const preview = document.getElementById('previewFoto');
          if (preview) {
            preview.src = event.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    });

    // Evento para o formulário
    document.getElementById('formAtualizar').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      const inputs = e.target.elements;
      
      // Adiciona arquivos e dados ao FormData
      if (inputs.foto_aluno.files[0]) {
        formData.append('foto_aluno', inputs.foto_aluno.files[0]);
      }
      
      // Adiciona outros campos
      formData.append('aluno_numero', inputs.aluno_numero.value);
      formData.append('nome_aluno', inputs.nome_aluno.value);
      formData.append('email_aluno', inputs.email_aluno.value);
      formData.append('nome_pai', inputs.nome_pai.value);
      formData.append('email_pai', inputs.email_pai.value);
      formData.append('telefone_pai', inputs.telefone_pai.value);
      formData.append('nome_mae', inputs.nome_mae.value);
      formData.append('email_mae', inputs.email_mae.value);
      formData.append('telefone_mae', inputs.telefone_mae.value);

      try {
        const response = await fetch(`http://localhost:3000/atualizar-aluno/${aluno.protocolo_numero}`, {
          method: 'PUT',
          body: formData
        });

        const result = await response.json();
        
        if (result.success) {
          alert('Aluno atualizado com sucesso!');
          buscarAlunos(); // Atualiza a lista
          detailsModal.style.display = 'none';
        } else {
          alert('Erro ao atualizar: ' + result.message);
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar aluno. Por favor, tente novamente.');
      }
    });

    // Evento para o botão cancelar
    document.getElementById('cancelarAtualizacao').addEventListener('click', () => {
      detailsModal.style.display = 'none';
    });

    detailsModal.style.display = 'block';
  }

  // Exclusão
  async function confirmarExclusao(aluno) {
    exibirModalExclusao(aluno);
  }

  async function executarExclusao(protocolo) {
    try {
      const response = await fetch(`http://localhost:3000/excluir-aluno/${protocolo}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      if (result.success) {
        alert('Aluno excluído com sucesso!');
        buscarAlunos(); // Atualiza a lista
      } else {
        alert('Erro ao excluir aluno: ' + result.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao excluir aluno. Por favor, tente novamente.');
    }
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