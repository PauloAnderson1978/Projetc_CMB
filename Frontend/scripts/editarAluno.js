// editar.js
document.addEventListener('DOMContentLoaded', function () {
    const editModal = document.getElementById('editModal');
    const closeEditModal = document.querySelector('.close-edit');
    const editForm = document.getElementById('editForm');

    function exibirDetalhes(aluno) {
        editModal.innerHTML = `
            <div class="modal-details">
              <div class="detail-row grid">
                <div class="detail-photo">
                  ${aluno.foto_aluno ? `<img src="/backend/uploads/${aluno.foto_aluno}" alt="Foto do aluno" style="width: 150px; height: 170px; border-radius: 8px;">` : 'Sem foto'}
                </div>
                <div class="detail-info">
                  <p><strong>Número:</strong> <input type="text" id="editNumero" value="${aluno.aluno_numero || ''}" /></p>
                  <p><strong>Nome:</strong> <input type="text" id="editNome" value="${aluno.nome_aluno || ''}" /></p>
                  <p><strong>Protocolo:</strong> <input type="text" id="editProtocolo" value="${aluno.protocolo_numero || ''}" /></p>
                  <p><strong>E-mail:</strong> <input type="email" id="editEmail" value="${aluno.email_aluno || ''}" /></p>
                </div>
              </div>
    
              <h3>Dados dos Pais</h3>
              <div class="detail-row grid">
                <div class="detail-col">
                  <h4>Pai</h4>
                  <p><strong>Nome:</strong> <input type="text" id="editNomePai" value="${aluno.nome_pai || ''}" /></p>
                  <p><strong>E-mail:</strong> <input type="email" id="editEmailPai" value="${aluno.email_pai || ''}" /></p>
                  <p><strong>Telefone:</strong> <input type="text" id="editTelefonePai" value="${aluno.telefone_pai || ''}" /></p>
                  <p><strong>Posto/Graduação:</strong> <input type="text" id="editPostoPai" value="${aluno.posto_pai || ''}" /></p>
                </div>
                <div class="detail-col">
                  <h4>Mãe</h4>
                  <p><strong>Nome:</strong> <input type="text" id="editNomeMae" value="${aluno.nome_mae || ''}" /></p>
                  <p><strong>E-mail:</strong> <input type="email" id="editEmailMae" value="${aluno.email_mae || ''}" /></p>
                  <p><strong>Telefone:</strong> <input type="text" id="editTelefoneMae" value="${aluno.telefone_mae || ''}" /></p>
                  <p><strong>Posto/Graduação:</strong> <input type="text" id="editPostoMae" value="${aluno.posto_mae || ''}" /></p>
                </div>
              </div>
    
              <h3>Responsável</h3>
              <div class="detail-row grid">
                <p><strong>Nome:</strong> <input type="text" id="editResponsavelNome" value="${aluno.responsavel_nome || ''}" /></p>
                <p><strong>E-mail:</strong> <input type="email" id="editResponsavelEmail" value="${aluno.responsavel_email || ''}" /></p>
                <p><strong>Telefone:</strong> <input type="text" id="editResponsavelTelefone" value="${aluno.responsavel_telefone || ''}" /></p>
                <p><strong>Endereço:</strong> <input type="text" id="editResponsavelEndereco" value="${aluno.responsavel_endereco || ''}" /></p>
                <p><strong>Observações:</strong> <textarea id="editObservacoes">${aluno.observacoes || ''}</textarea></p>
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
    
              <button id="saveBtn">Salvar</button>
            </div>
        `;
    
        editModal.style.display = 'block';
    }
    // Função para abrir o modal de edição
    // function openEditModal(aluno) {
    //     currentAlunoId = aluno.id_aluno; // Supondo que o endpoint use ID
    //     document.getElementById('editNumero').value = aluno.aluno_numero || '';
    //     document.getElementById('editNome').value = aluno.nome_aluno || '';
    //     document.getElementById('editTurma').value = aluno.turma || '';
    //     document.getElementById('editAno').value = aluno.ano_letivo || '';
    //     document.getElementById('editEmail').value = aluno.email_aluno || '';
    //     editModal.style.display = 'block';
    // }

    // Captura o parâmetro 'protocolo_numero' da URL (por exemplo: http://127.0.0.1:5500/editar.html?protocolo_numero=1)
    const params = new URLSearchParams(window.location.search);
    const protocolo_numero = params.get('protocolo_numero'); // "1" se a URL for http://127.0.0.1:5500/editar.html?protocolo_numero=1

    // Função para buscar alunos
    async function buscarAlunos() {
        try {
            let url = 'http://localhost:3000/consulta';

            // Se o protocolo_numero estiver presente, adiciona à URL
            if (protocolo_numero) {
                url += `?protocolo_numero=${encodeURIComponent(protocolo_numero)}`;
            }

            // Fazendo a requisição
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const alunos = await response.json();
            exibirDetalhes(alunos);  // Chama a função para exibir os resultados
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao buscar alunos. Por favor, tente novamente.');
        }
    }

    // Executa a busca logo que a página carregar
    buscarAlunos();

    // Evento de submit do formulário
    editForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const formData = {
            aluno_numero: document.getElementById('editNumero').value,
            nome_aluno: document.getElementById('editNome').value,
            turma: document.getElementById('editTurma').value,
            ano_letivo: document.getElementById('editAno').value,
            email_aluno: document.getElementById('editEmail').value
            // Adicione mais campos conforme necessário
        };

        try {
            const response = await fetch(`http://localhost:3000/alunos/${currentAlunoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Aluno atualizado com sucesso!');
                editModal.style.display = 'none';
                // Atualizar a lista de resultados
                buscarAlunos();
            } else {
                alert('Erro ao atualizar aluno');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro na comunicação com o servidor');
        }
    });

    // Fechar modal
    closeEditModal.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });


    // document.getElementById('saveBtn').addEventListener('click', async function() {
    //     const updatedAluno = {
    //         aluno_numero: document.getElementById('editNumero').value,
    //         nome_aluno: document.getElementById('editNome').value,
    //         protocolo_numero: document.getElementById('editProtocolo').value,
    //         email_aluno: document.getElementById('editEmail').value,
    //         nome_pai: document.getElementById('editNomePai').value,
    //         email_pai: document.getElementById('editEmailPai').value,
    //         telefone_pai: document.getElementById('editTelefonePai').value,
    //         posto_pai: document.getElementById('editPostoPai').value,
    //         nome_mae: document.getElementById('editNomeMae').value,
    //         email_mae: document.getElementById('editEmailMae').value,
    //         telefone_mae: document.getElementById('editTelefoneMae').value,
    //         posto_mae: document.getElementById('editPostoMae').value,
    //         responsavel_nome: document.getElementById('editResponsavelNome').value,
    //         responsavel_email: document.getElementById('editResponsavelEmail').value,
    //         responsavel_telefone: document.getElementById('editResponsavelTelefone').value,
    //         responsavel_endereco: document.getElementById('editResponsavelEndereco').value,
    //         observacoes: document.getElementById('editObservacoes').value
    //     };

    //     try {
    //         const response = await fetch(`http://localhost:3000/alunos/${aluno.id_aluno}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(updatedAluno)
    //         });

    //         if (response.ok) {
    //             alert('Aluno atualizado com sucesso!');
    //             editModal.style.display = 'none';
    //             // Se você precisar atualizar a lista de alunos após a edição, pode chamar uma função de busca ou atualização de dados aqui.
    //         } else {
    //             alert('Erro ao atualizar aluno');
    //         }
    //     } catch (error) {
    //         console.error('Erro:', error);
    //         alert('Erro na comunicação com o servidor');
    //     }
    // });
});
