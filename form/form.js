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
});
