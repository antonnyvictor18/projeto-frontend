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

    type Perfil = {
        id?: number;
        descricao: string;
        [key: string]: any;
    }

    type PerfilUsuario = {
        id?: number;
        usuario: Usuario;
        perfil: Perfil;
        [key: string]: any;
    }
}

