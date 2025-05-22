// formCadastro

document.getElementById("saveUser").addEventListener("click",  async () => {
  const nome =  document.getElementById("username").value;
  const senha =  document.getElementById("password").value;
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('http://127.0.0.1:3000/usuarios', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        senha,
        email
      })
    });
    
    const data = await response.json();

    console.log(data);
    
    if (data) {
      alert('Aluno cadastrado com sucesso!');
      window.location.href = "login.html"
    } else {
      throw new Error(data.error || 'Erro desconhecido');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Falha no cadastro: ' + error.message);
  }
})

// Consulta
async function carregarAlunos() {
    const resposta = await fetch('http://localhost:3000/alunos');
    const alunos = await resposta.json();
    
    const tabela = document.createElement('table');
    alunos.forEach(aluno => {
        tabela.innerHTML += `
            <tr>
                <td>${aluno.nome_aluno}</td>
                <td>${aluno.turma}</td>
                <!-- Outros campos -->
            </tr>
        `;
    });
    
    document.body.appendChild(tabela);
}

// Edição
async function atualizarAluno(id) {
    const dadosAtualizados = {
        nome: document.getElementById('nome').value,
        // Colete outros campos
    };

    await fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosAtualizados)
    });
}

//Exclusão
async function excluirAluno(id) {
    if (confirm('Confirma a exclusão?')) {
        await fetch(`http://localhost:3000/alunos/${id}`, {method: 'DELETE'});
        alert('Excluído com sucesso!');
    }
}


// Estatísitca
async function carregarEstatisticas() {
  const response = await fetch('/api/alunos/estatisticas');
  const data = await response.json();
  
  if (data.success) {
    return data.data; // { instituicoes, nacionalidades, anos }
  } else {
    throw new Error(data.error || 'Erro ao carregar estatísticas');
  }
}