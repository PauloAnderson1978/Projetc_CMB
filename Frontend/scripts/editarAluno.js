// editar.js
document.addEventListener('DOMContentLoaded', function () {
    const editModal = document.getElementById('editModal');
    const closeEditModal = document.querySelector('.close-edit');
    const editForm = document.getElementById('editForm');
    let currentAlunoId = null;

    // Função para abrir o modal de edição
    function openEditModal(aluno) {
        currentAlunoId = aluno.id_aluno; // Supondo que o endpoint use ID
        document.getElementById('editNumero').value = aluno.aluno_numero || '';
        document.getElementById('editNome').value = aluno.nome_aluno || '';
        document.getElementById('editTurma').value = aluno.turma || '';
        document.getElementById('editAno').value = aluno.ano_letivo || '';
        document.getElementById('editEmail').value = aluno.email_aluno || '';
        editModal.style.display = 'block';
    }

   // Captura o parâmetro 'id' da URL (por exemplo: http://127.0.0.1:5500/editar.html?id=1)
const params = new URLSearchParams(window.location.search);
const protocolo_numero = params.get('protocolo_numero'); // "1" se a URL for http://127.0.0.1:5500/editar.html?id=1

async function buscarAlunos() {
    try {
        let url = 'http://localhost:3000/consulta';
       
        // Fazendo a requisição
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const alunos = await response.json();
        exibirResultados(alunos);  // Chama a função para exibir os resultados
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar alunos. Por favor, tente novamente.');
    }
}


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
});