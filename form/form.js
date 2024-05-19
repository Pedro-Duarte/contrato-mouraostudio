document.addEventListener('DOMContentLoaded', function() {
    // Selecionar o formulário pelo ID
    const meuFormulario = document.getElementById('formulario');

    // Adicionar um evento de "submit" ao formulário
    meuFormulario.addEventListener('submit', function(evento) {
        // Impedir o envio padrão do formulário
        evento.preventDefault();

        // Capturar os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const nomes = document.getElementById('name-Noiva_Noivo').value;
        const endereco = document.getElementById('endereco').value;
        const contato = document.getElementById('contato').value;
        const email = document.getElementById('email').value;
        const pacote = document.getElementsByName('pacote').value;
        const data = document.getElementById('data').value;
        const cerimonia = document.getElementById('cerimonia').value;
        const hora1 = document.getElementById('hora-cerimonia').value;
        const recepcao = document.getElementById('recepcao').value;
        const hora2 = document.getElementById('hora-recepcao').value;
        const convidados = document.getElementById('convidados').value;

        localStorage.setItem('name', nome);
        localStorage.setItem('cpf', cpf);
        localStorage.setItem('nomes', nomes);
        localStorage.setItem('endereço', endereco);
        localStorage.setItem('contato', contato);
        localStorage.setItem('email', email);
        localStorage.setItem('pacote', pacote);
        localStorage.setItem('data', data);
        localStorage.setItem('cerimonia', cerimonia);
        localStorage.setItem('hora1', hora1);
        localStorage.setItem('recepcao', recepcao);
        localStorage.setItem('hora2', hora2);

        // Atualizar o texto existente com os dados capturados e iserir no contrato
        // Atualizar
        const nomeContratante = document.getElementById('nomeContratante');
        const emailUsuario = document.getElementById('emailUsuario');

        // Inserir
        nomeUsuario.textContent = nome;
        emailUsuario.textContent = email;


        // Limpar os campos do formulário após a captura dos dados (opcional)
        document.getElementById('name').value = '';
        document.getElementById('name-Noiva_Noivo').value = '';
        document.getElementById('cpf').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('contato').value = '';
        document.getElementById('email').value = '';
        document.getElementById('data').value = '';
        document.getElementById('cerimonia').value = '';
        document.getElementById('hora-cerimonia').value = '';
        document.getElementById('recepcao').value = '';
        document.getElementById('hora-recepcao').value = '';
        document.getElementById('convidados').value = '';
    });

    // Adicionar um evento de "submit" ao formulário
    meuFormulario.addEventListener('submit', function(evento) {
        // Verificar qual opção foi selecionada
        const pacote = document.querySelector('input[name="pacote"]:checked');

        // Verificar se uma opção foi selecionada
        if (pacote) {
            // Redirecionar com base no pacote
            if (pacote.value === "prata") {
                window.location.href = "../contrato-prata/contrato-prata.html";
            } else if (pacote.value === "ouro") {
                window.location.href = "../contrato-ouro/contrato-ouro.html";
            } else if (pacote.value === "diamante") {
                window.location.href = "../contrato-diamante/contrato-diamante.html";
            }

            // Impedir o envio padrão do formulário
            evento.preventDefault(); // Evita o envio do formulário após o redirecionamento
        } else {
            // Caso nenhuma opção seja selecionada, exibir mensagem de erro
            alert("Por favor, selecione uma opção.");
            evento.preventDefault(); // Evita o envio do formulário sem opção selecionada
        }
    });
});
