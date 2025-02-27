import axios  from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_API,
});

export class BaseService {

    url: string;

    constructor(url: string){
        this.url = url;

        axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('TOKEN_APLICACAO_FRONTEND');
                if(token){
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if(error.response.status === 401){
                    localStorage.removeItem('TOKEN_APLICACAO_FRONTEND');
                    window.location.href = '/auth/login';
                }
                return Promise.reject(error);
            }
        );
    }


    listarTodos() {
        return axiosInstance.get(this.url);
    }

    buscarPorId(id: number){
        return axiosInstance.get(this.url + '/' + id);
    }

    inserir(objeto:any){
        return axiosInstance.post(this.url, objeto);
    }

    alterar(objeto: any){
        return axiosInstance.put(this.url, objeto);
    }

    excluir(id: number){
        return axiosInstance.delete(this.url + '/' + id);
    }
}
