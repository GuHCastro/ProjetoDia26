import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0';
const listaUSU = [];

function processaCadastroUsuario(req, res) {
    const dados = req.body;

    let conteudoResposta = '';

    if (!(dados.nomeFIRST && dados.nomeSECOND && dados.nomeUSU && dados.em && dados.num)) {
        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/x-icon" href="favicon.ico">
            <link rel="stylesheet" type="text/css" href="estilizacao.css">
            <title>Cadastro</title>
        </head>
        <body>
            <div id="caixa">
                <form action="/formulario.html" method="POST">
        
                    <h3>CADASTRO</h3>
                    <label class="rotul" for="nomeFIRST">Nome:</label>
                    <input type="text" id="nomeFIRST" name="nomeFIRST" placeholder="Insira seu nome" value="${dados.nomeFIRST}" required>
        `;
        if (!dados.nomeFIRST) {
            conteudoResposta += `
                    <p class="rockDanger">O campo Nome é obrigatório</p>
            `;
        }

        conteudoResposta += `
                    <label class="rotul" for="nomeSECOND">Sobrenome:</label>
                        <input type="text" id="nomeSECOND" name="nomeSECOND" placeholder="Insira seu sobrenome" value="${dados.nomeSECOND}" required>
        `;
        if (!dados.nomeSECOND) {
            conteudoResposta += `
                    <p class="rockDanger">O campo Sobrenome é obrigatório</p>
            `;
        }
        
        conteudoResposta += `
                    <label class="rotul" for="nomeUSU">Nome de Usuário:</label>
                        <input type="text" id="nomeUSU" name="nomeUSU" placeholder="Insira seu nome de usuário" value="${dados.nomeUSU}" required>
        `;   
        if (!dados.nomeUSU) {
            conteudoResposta += `
                    <p class="rockDanger">O campo Nome de Usuário é obrigatório</p>
            `;
        }
        
        conteudoResposta += `
                    <label class="rotul" for="em">Email:</label>
                        <input type="email" id="em" name="em" placeholder="Insira seu email" value="${dados.em}" required>
        `;   
        if (!dados.em) {
            conteudoResposta += `
                    <p class="rockDanger">O campo Email é obrigatório</p>
            `;
        }
        
        conteudoResposta += `
                    <label class="rotul" for="num">Número de Celular:</label>
                        <input type="text" id="num" name="num" placeholder="Insira seu número" value="${dados.num}" required>
        `;   
        if (!dados.num) {
            conteudoResposta += `
                    <p class="rockDanger">O campo Número de Celular é obrigatório</p>
            `;
        }  

        conteudoResposta += `
                    <br>
                    <button id="BotCad" type="submit">Cadastrar</button>
    
                </form>
            </div>
        </body>
        </html>
        `;
        
        res.end(conteudoResposta);

    } else {
        const usu = {
            nome: dados.nomeFIRST,
            sobrenome: dados.nomeSECOND,
            nomeUSUARIO: dados.nomeUSU,
            email: dados.em,
            celular: dados.num,
        }

        listaUSU.push(usu);

        conteudoResposta = `
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <title>Cadastro de Usuário</title>
        </head>
        <body>
            <h1>Usuários Cadastrados</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome de Usuário</th>
                        <th>Email</th>
                        <th>Celular</th>
                    </tr>
                </thead>
                <tbody>`;
        
        for (const usu of listaUSU) {
            conteudoResposta += `
                <tr>
                    <td>${usu.nome}</td>
                    <td>${usu.sobrenome}</td>
                    <td>${usu.nomeUSUARIO}</td>
                    <td>${usu.email}</td>
                    <td>${usu.celular}</td>
                </tr>
                    `;
        }

        conteudoResposta += `
                </tbody>
            </table>
            <a class="btn btn-primary" href="/" role="button">Voltar ao Menu</a>
            <a class="btn btn-outline-info" href="/formulario.html" role="button">Acessar Cadastro</a>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>    
            </body>
            </html>
                `;

        res.end(conteudoResposta);

    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), './Paginashtml')));

app.get('/formulario.html', (req, res) => {
    res.end(`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
        <link rel="stylesheet" type="text/css" href="estilizacao.css">
        <title>Menu do Sistema</title>
    </head>
    <body>
        <h1>MENU</h1>
        <ul>
            <li><a href="/formulario.html">Cadastro</a></li>
        </ul>
    </body>
    </html>
    `)
});

app.post('/formulario.html', processaCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor rodando na url http://localhost:3000/formulario.html`);
});
