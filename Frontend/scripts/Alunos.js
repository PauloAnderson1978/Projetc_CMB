document.getElementById('btn-salvar').addEventListener('click', async () => {
    const photoInput = document.getElementById('photoInput');
  if (!photoInput.files[0]) {
    return alert('Selecione uma foto do aluno!');
  }

  // Validação de tipo de arquivo
  const validExtensions = ['image/jpeg', 'image/png'];
  if (!validExtensions.includes(photoInput.files[0].type)) {
    return alert('Formato de imagem inválido! Use JPEG ou PNG.');
  }

    
    // Captura de dados principais
    const formData = new FormData();
    
    // Dados do Aluno
    formData.append('aluno_numero', document.getElementById('num_aluno').value);
    formData.append('turma', document.getElementById('turma_aluno').value);
    formData.append('ano_letivo', document.getElementById('ano_letivo').value);
    formData.append('nome_aluno', document.getElementById('nome_Aluno').value.toUpperCase());
    formData.append('email_aluno', document.getElementById('emailAluno').value);
    formData.append('foto_aluno', document.getElementById('photoInput').files[0]);
    
    // Dados Institucionais
    formData.append('instituicao', document.getElementById('institution').value);
    formData.append('nacionalidade', document.getElementById('nationality').value);
    formData.append('protocolo_numero', document.getElementById('protocolo_input').value);

    // Dados dos Pais
    formData.append('nome_pai', document.getElementById('nome_Pai').value.toUpperCase());
    formData.append('email_pai', document.getElementById('email_Pai').value);
    formData.append('telefone_pai', document.getElementById('telefone_Pai').value);
    formData.append('posto_pai', document.getElementById('setPostoGraduacao_Pai').value);

    formData.append('nome_mae', document.getElementById('nome_Mae').value.toUpperCase());
    formData.append('email_mae', document.getElementById('email_Mae').value);
    formData.append('telefone_mae', document.getElementById('telefone_Mae').value);
    formData.append('posto_mae', document.getElementById('setPostoGraduacao_Mae').value);

    // Dados do Responsável
    formData.append('responsavel_nome', document.getElementById('nome_Responsavel').value.toUpperCase());
    formData.append('responsavel_email', document.getElementById('email_Responsavel').value);
    formData.append('responsavel_endereco', document.getElementById('enderecoResponsavel').value);
    formData.append('responsavel_telefone', document.getElementById('setTelefoneResponsavel').value);
    formData.append('observacoes', document.getElementById('observacoes').value);

    // Documentos PDF
    formData.append('doc_bloco_1', document.getElementById('doc_bloco_1').files[0]);
    formData.append('doc_bloco_2', document.getElementById('doc_bloco_2').files[0]);
    formData.append('doc_bloco_3', document.getElementById('doc_bloco_3').files[0]);

    try {
        const response = await fetch('http://127.0.0.1:3000/alunos', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            // Limpar formulário ou redirecionar se necessário
        } else {
            throw new Error(data.message || 'Erro no servidor');
        }
    } catch (error) {
        console.error('Erro no cadastro:', error);
        alert(`Falha no cadastro: ${error.message}`);
    }
});