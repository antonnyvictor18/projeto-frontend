declare namespace Projeto {
    type Usuario = {
        id?: number;
        nome: string;
        login: string;
        senha: string;
        email: string;
        [key: string]: any;
    };

    type Recurso = {
        id?: number;
        nome: string;
        chave: string;
        [key: string]: any;
    }
}

