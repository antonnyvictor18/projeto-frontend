/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProductService } from '../../../../demo/service/ProductService';
import { Projeto } from '@/types';
import { PerfilUsuarioService } from '@/service/PerfilUsuarioService';
import { UsuarioService } from '@/service/UsuarioService';
import { PerfilService } from '@/service/PerfilService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

const PerfilUsuario = () => {
    let perfilUsuarioVazio: Projeto.PerfilUsuario = {
        id: 0,
        usuario: {nome: '', login: '', senha: '', email: ''},
        perfil: {descricao: ''},
    };

    const [perfisUsuario, setPerfisUsuario] = useState<Projeto.Perfil[] |null>(null);
    const [perfilUsuarioDialog, setPerfilUsuarioDialog] = useState(false);
    const [deletePerfilUsuarioDialog, setDeletePerfilUsuarioDialog] = useState(false);
    const [deletePerfisUsuarioDialog, setDeletePerfisUsuarioDialog] = useState(false);
    const [perfilUsuario, setPerfilUsuario] = useState<Projeto.PerfilUsuario>(perfilUsuarioVazio);
    const [selectedPerfisUsuario, setSelectedPerfisUsuario] = useState<Projeto.PerfilUsuario[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const perfilUsuarioService = useMemo(() => new PerfilUsuarioService(), []);
    const usuarioService = useMemo(() => new UsuarioService(), []);
    const perfilService = useMemo(() => new PerfilService(), []);
    const [usuarios, setUsuarios] = useState<Projeto.Usuario[]>([]);
    const [perfis, setPerfis] = useState<Projeto.Perfil[]>([]);


    useEffect(() => {
        if(!perfisUsuario){
            perfilUsuarioService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setPerfisUsuario(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [perfisUsuario]);

    useEffect(() => {

        if(perfilUsuarioDialog){
            usuarioService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setUsuarios(response.data);
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao buscar usuarios',
                });
            });

            perfilService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setPerfis(response.data);
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao buscar perfis',
                });
            });
        }
    }, [perfilUsuarioDialog]);

    const openNew = () => {
        setPerfilUsuario(perfilUsuarioVazio);
        setSubmitted(false);
        setPerfilUsuarioDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPerfilUsuarioDialog(false);
    };

    const hideDeletePerfilUsuarioDialog = () => {
        setDeletePerfilUsuarioDialog(false);
    };

    const hideDeletePerfisUsuarioDialog = () => {
        setDeletePerfisUsuarioDialog(false);
    };

    const savePerfilUsuario = () => {
        setSubmitted(true);

        if(!perfilUsuario.id){
            perfilUsuarioService.inserir(perfilUsuario)
            .then((response) => {
                console.log(response.data);
                setPerfilUsuarioDialog(false);
                setPerfilUsuario(perfilUsuarioVazio);
                    setPerfisUsuario(null);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Sucesso',
                    detail: 'Perfil Usuario criado',
                });
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao criar perfil de usuario',
                });
            });
        } else {
            perfilUsuarioService.alterar(perfilUsuario)
            .then((responde) => {
                console.log(responde.data);
                setPerfilUsuarioDialog(false);
                setPerfilUsuario(perfilUsuarioVazio);
                setPerfisUsuario(null);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Sucesso',
                    detail: 'Perfil de Usuario alterado',
                });
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao alterar perfil de usuario',
                });
            });
        }

    };

    const editPerfilUsuario = (perfilUsuario: Projeto.PerfilUsuario) => {
        setPerfilUsuario({ ...perfilUsuario });
        setPerfilUsuarioDialog(true);
    };

    const confirmDeletePerfilUsuario = (perfilUsuario: Projeto.PerfilUsuario) => {
        setPerfilUsuario(perfilUsuario);
        setDeletePerfilUsuarioDialog(true);
    };

    const deletePerfilUsuario = () => {
        if(perfilUsuario.id){
            perfilUsuarioService.excluir(perfilUsuario.id)
            .then((response) => {
                console.log(response.data);
                setDeletePerfilUsuarioDialog(false);
                setPerfilUsuario(perfilUsuarioVazio);
                setPerfisUsuario(null);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Sucesso',
                    detail: 'Perfil de Usuario excluído',
                });
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao excluir perfil de Usuario',
                });
            });
        }
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePerfisUsuarioDialog(true);
    };

    const deleteSelectedPerfisUsuario = () => {
        Promise.all(selectedPerfisUsuario.map(async (_perfilUsuario) => {
            if (_perfilUsuario.id) {
                await perfilUsuarioService.excluir(_perfilUsuario.id)
            }
        })).then((response) => {
            setPerfisUsuario(null);
            setSelectedPerfisUsuario([]);
            setDeletePerfisUsuarioDialog(false);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Perfis de Usuario excluídos',
                life: 3000
            });
        }).catch((error) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao excluir perfisUsuario',
                life: 3000
            });
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nome: string) => {
        const val = (e.target && e.target.value) || '';
        let _perfilUsuario = { ...perfilUsuario };
        _perfilUsuario[`${nome}`] = val;

        setPerfilUsuario(_perfilUsuario);
    };

    const OnSelectPerfilChange = (perfil: Projeto.Perfil) => {
        let _perfilUsuario = { ...perfilUsuario };
        _perfilUsuario.perfil = perfil;
        setPerfilUsuario(_perfilUsuario);
    };

    const OnSelectUsuarioChange = (usuario: Projeto.Usuario) => {
        let _perfilUsuario = { ...perfilUsuario };
        _perfilUsuario.usuario = usuario;
        setPerfilUsuario(_perfilUsuario);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPerfisUsuario || !(selectedPerfisUsuario as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: Projeto.PerfilUsuario) => {
        return (
            <>
                <span className="p-column-title">Código</span>
                {rowData.id}
            </>
        );
    };

    const perfilBodyTemplate = (rowData: Projeto.PerfilUsuario) => {
        return <>{rowData.perfil.descricao}</>;
    };

    const usuarioBodyTemplate = (rowData: Projeto.PerfilUsuario) => {
        return <>{rowData.usuario.nome}</>;
    };


    const actionBodyTemplate = (rowData: Projeto.PerfilUsuario) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editPerfilUsuario(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeletePerfilUsuario(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Perfis de Usuario</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const perfilUsuarioDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={savePerfilUsuario} />
        </>
    );
    const deletePerfilUsuarioDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePerfilUsuarioDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deletePerfilUsuario} />
        </>
    );
    const deletePerfisUsuarioDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePerfisUsuarioDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedPerfisUsuario} />
        </>
    );



    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={perfisUsuario}
                        selection={selectedPerfisUsuario}
                        onSelectionChange={(e) => setSelectedPerfisUsuario(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} dos {totalRecords} perfisUsuario"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum Perfil de Usuario encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Código" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="perfil" header="Perfil" sortable body={perfilBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="usuario" header="Usuario" sortable body={usuarioBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={perfilUsuarioDialog} style={{ width: '450px' }} header="Detalhes de Perfil do Usuário" modal className="p-fluid" footer={perfilUsuarioDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="perfil">Perfil</label>
                            <Dropdown optionLabel="descricao" value={perfilUsuario.perfil} options={perfis} filter onChange={(e: DropdownChangeEvent) => OnSelectPerfilChange(e.value)} placeholder="Selecione um perfil..." />
                            {submitted && !perfilUsuario.perfil && <small className="p-invalid">Perfil é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="usuario">Usuário</label>
                            <Dropdown optionLabel="nome" value={perfilUsuario.usuario} options={usuarios} filter onChange={(e: DropdownChangeEvent) => OnSelectUsuarioChange(e.value)} placeholder="Selecione um usuário..." />
                            {submitted && !perfilUsuario.usuario && <small className="p-invalid">Usuário é obrigatório.</small>}
                        </div>
                    </Dialog>


                    <Dialog visible={deletePerfilUsuarioDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePerfilUsuarioDialogFooter} onHide={hideDeletePerfilUsuarioDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {perfilUsuario && (
                                <span>
                                    Você realmente deseja excluir o perfil de usuario? <b>{perfilUsuario.descricao}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePerfisUsuarioDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePerfisUsuarioDialogFooter} onHide={hideDeletePerfisUsuarioDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {perfilUsuario && <span>Você realmente deseja excluir os perfis de usuario selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PerfilUsuario;
