

document.getElementById('loginForm').addEventListener('submit',  async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                senha
            })
        })
        
        const data =  await res.json();

       console.log(data);

        if(data.success) {
            alert(`Usuario logado com sucesso`);
          window.location.href = 'tela_Inicio.html';
        } else {
            alert(`Usuario e senhas invalidos`);
        }
    } catch (error) {
        console.log(`Erroooou ${error}`);
        alert(`Deu ruim`);
    }
});