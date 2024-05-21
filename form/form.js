document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');

    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault(); // Impedir o envio padrão do formulário

            // Capturar os valores dos campos do formulário
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const rg = document.getElementById('rg').value;
            const nomes = document.getElementById('name-Noiva_Noivo').value;
            const endereco = document.getElementById('endereco').value;
            const contato = document.getElementById('contato').value;
            const email = document.getElementById('email').value;
            const pacote = document.querySelector('input[name="pacote"]:checked').value;
            const data = document.getElementById('data').value;
            const cerimonia = document.getElementById('cerimonia').value;
            const hora1 = document.getElementById('hora-cerimonia').value;
            const recepcao = document.getElementById('recepcao').value;
            const hora2 = document.getElementById('hora-recepcao').value;
            const convidados = document.getElementById('convidados').value;

            // Armazenar os dados no localStorage
            localStorage.setItem('nome', nome);
            localStorage.setItem('cpf', cpf);
            localStorage.setItem('rg', rg);
            localStorage.setItem('nomes', nomes);
            localStorage.setItem('endereco', endereco);
            localStorage.setItem('contato', contato);
            localStorage.setItem('email', email);
            localStorage.setItem('pacote', pacote);
            localStorage.setItem('data', data);
            localStorage.setItem('cerimonia', cerimonia);
            localStorage.setItem('hora1', hora1);
            localStorage.setItem('recepcao', recepcao);
            localStorage.setItem('hora2', hora2);
            localStorage.setItem('convidados', convidados);

            // Redirecionar com base no pacote
            if (pacote === "Prata – Assessoria do Dia") {
                window.location.href = "../contrato-prata/contrato-prata.html";
            } else if (pacote === "Ouro - Assessoria Parcial") {
                window.location.href = "../contrato-ouro/contrato-ouro.html";
            } else if (pacote === "Diamante - Assessoria Completa") {
                window.location.href = "../contrato-diamante/contrato-diamante.html";
            }
        });
    }

    if (window.location.pathname.includes('contrato-prata.html'||'contrato-ouro.html'||'contrato-diamante.html')) {
        // Recuperar os dados do localStorage
        const nome = localStorage.getItem('nome');
        const cpf = localStorage.getItem('cpf');
        const rg = localStorage.getItem('rg');
        const nomes = localStorage.getItem('nomes');
        const endereco = localStorage.getItem('endereco');
        const contato = localStorage.getItem('contato');
        const email = localStorage.getItem('email');
        const pacote = localStorage.getItem('pacote');
        const data = localStorage.getItem('data');
        const cerimonia = localStorage.getItem('cerimonia');
        const hora1 = localStorage.getItem('hora1');
        const recepcao = localStorage.getItem('recepcao');
        const hora2 = localStorage.getItem('hora2');
        const convidados = localStorage.getItem('convidados');

        // Atualizar o texto existente com os dados capturados
        document.getElementById('nome_contratante').textContent = nome || '';
        document.getElementById('cpf_contratante').textContent = cpf || '';
        document.getElementById('rg_contratante').textContent = rg || '';
        document.getElementById('noivo_noiva').textContent = nomes || '';
        document.getElementById('endereco_contratante').textContent = endereco || '';
        document.getElementById('contato_contratante').textContent = contato || '';
        document.getElementById('email_contratante').textContent = email || '';
        document.getElementById('pacote_evento').textContent = pacote || '';
        document.getElementById('data_evento').textContent = data || '';
        document.getElementById('local_cerimonia').textContent = cerimonia || '';
        document.getElementById('horario_evento').textContent = hora1 || '';
        document.getElementById('local_recepcao').textContent = recepcao || '';
        document.getElementById('horario_recepcao').textContent = hora2 || '';
        document.getElementById('numero_convidados').textContent = convidados || '';
    }
});
