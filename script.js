async function searchAdress(cep){

    var msgErro = document.getElementById('erro');
    msgErro.innerHTML = "";

    try {
        var checkCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var queryCepConverted = await checkCEP.json();
        if (queryCepConverted.erro){
            throw Error('CEP nao existe!');
        }
        var city = document.getElementById('cidade');
        var logrador = document.getElementById('endereco');
        var state = document.getElementById('estado');

//Selecionando as variaveis que serao auto completadas com esta funcao. Drepois do `.` o que esta descrito sao exatamente as variaveis que sao obrigatoria o retorno para o preencher do formulario

        city.value = queryCepConverted.localidade;
        logrador.value = queryCepConverted.logradouro;
        state.value = queryCepConverted.uf;

        console.log(queryCepConverted);
        return queryCepConverted;
    } catch (erro){
        msgErro.innerHTML = `<p>CEP invalido, tente novamente!</p>`
        console.log(erro)
    }
}

//esta parte do codigo faz com que depois que eu digito o CEP e tiro o mouse do campo que digitei, retorne o endereco linkado ao CEP
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => searchAdress(cep.value));