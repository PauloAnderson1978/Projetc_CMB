
// script para deletar usuário
document.querySelector('#btnExcluir').addEventListener('click', async (e) => {
    e.preventDefault();

    const numero = document.querySelector("#filterNumber").value;
    const turma = document.querySelector("#filterClass").value;

    if(!numero || !turma) {
        return alert("Preencha os campos!");
    }

    const url = `http://localhost:3000/aluno/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });
        const data = await res.json();
        if(data.ok) {
            alert("Usuário excluído com sucesso!");
        } else {
            throw alert("Erro ao excluir o usuário!");
        }
    } catch (e) {
        console.error(`Erro ao excluir o usuário ${e}`);
        alert(`Falha ao deletar usuário ${e.message}`);
    }
});