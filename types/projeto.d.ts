declare namespace Projeto {
    type Usuario = {
            id?: number;
            nome: string;
            login: string;
            senha: string;
            email: string;
            [key: string]: any;
        };
}
