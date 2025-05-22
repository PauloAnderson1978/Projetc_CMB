// cadastrarUsuarios

document.getElementById("saveUser").addEventListener("click",  async () => {
  const nome =  document.getElementById("username").value;
  const senha =  document.getElementById("password").value;
  const email = document.getElementById('email').value;
  const confirmSenha = document.getElementById('confirmPassword').value;

  try {
    if(senha != confirmSenha) {
      throw new Error("Senhas nao conferem")
   }
    const response = await fetch('http://127.0.0.1:3000/usuarios', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        senha,
        email,
      })
    });
    const data = await response.json();

    console.log(data);
    
    if (data) {
      alert('Usuário cadastrado com sucesso!');
      window.location.href = "login.html"
    } else {
      throw new Error(data.error || 'Erro desconhecido');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Falha no cadastro: ' + error.message);
  }
})

