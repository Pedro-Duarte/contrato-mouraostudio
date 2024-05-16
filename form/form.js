document.addEventListener('DOMContentLoaded', function() {
    // Selecionar o formulário pelo ID
    const meuFormulario = document.getElementById('formulario');

    // Adicionar um evento de "submit" ao formulário
    meuFormulario.addEventListener('submit', function(evento) {
        // Impedir o envio padrão do formulário
        evento.preventDefault();

        // Capturar os valores dos campos do formulário
        const nome = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;

        // Exibir os valores capturados no console (exemplo)
        console.log('Nome:', nome);
        console.log('CPF:', cpf);

        // Aqui você pode manipular os dados como desejar, por exemplo, enviar para um servidor via AJAX

        // Limpar os campos do formulário após a captura dos dados (opcional)
        document.getElementById('name').value = '';
        document.getElementById('cpf').value = '';
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
