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
import {PermissaoPerfilRecursoService} from '@/service/PermissaoPerfilRecursoService';
import { RecursoService } from '@/service/RecursoService';
import { PerfilService } from '@/service/PerfilService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

const PermissaoPerfilRecurso = () => {
    let permissaoPerfilRecursoVazio: Projeto.PermissaoPerfilRecurso = {
        id: 0,
        recurso: {nome: '', chave: ''},
        perfil: {descricao: ''},
    };

    const [permissoesPerfilRecurso, setPermissoesPerfilRecurso] = useState<Projeto.Perfil[] |null>(null);
    const [permissaoPerfilRecursoDialog, setPermissaoPerfilRecursoDialog] = useState(false);
    const [deletePermissaoPerfilRecursoDialog, setDeletePermissaoPerfilRecursoDialog] = useState(false);
    const [deletePermissoesPerfilRecursoDialog, setDeletePermissoesPerfilRecursoDialog] = useState(false);
    const [permissaoPerfilRecurso, setPermissaoPerfilRecurso] = useState<Projeto.PermissaoPerfilRecurso>(permissaoPerfilRecursoVazio);
    const [selectedPermissoesPerfilRecurso, setSelectedPermissoesPerfilRecurso] = useState<Projeto.PermissaoPerfilRecurso[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const permissaoPerfilRecursoService = useMemo(() => new PermissaoPerfilRecursoService(), []);
    const recursoService = useMemo(() => new RecursoService(), []);
    const perfilService = useMemo(() => new PerfilService(), []);
    const [recursos, setRecursos] = useState<Projeto.Recurso[]>([]);
    const [perfis, setPerfis] = useState<Projeto.Perfil[]>([]);


    useEffect(() => {
        if(!permissoesPerfilRecurso){
            permissaoPerfilRecursoService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setPermissoesPerfilRecurso(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [permissoesPerfilRecurso]);

    useEffect(() => {

        if(permissaoPerfilRecursoDialog){
            recursoService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setRecursos(response.data);
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao buscar recursos',
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
    }, [permissaoPerfilRecursoDialog]);

    const openNew = () => {
        setPermissaoPerfilRecurso(permissaoPerfilRecursoVazio);
        setSubmitted(false);
        setPermissaoPerfilRecursoDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPermissaoPerfilRecursoDialog(false);
    };

    const hideDeletePermissaoPerfilRecursoDialog = () => {
        setDeletePermissaoPerfilRecursoDialog(false);
    };

    const hideDeletePermissoesPerfilRecursoDialog = () => {
        setDeletePermissoesPerfilRecursoDialog(false);
    };

    const savePermissaoPerfilRecurso = () => {
        setSubmitted(true);

        if(!permissaoPerfilRecurso.id){
            permissaoPerfilRecursoService.inserir(permissaoPerfilRecurso)
            .then((response) => {
                console.log(response.data);
                setPermissaoPerfilRecursoDialog(false);
                setPermissaoPerfilRecurso(permissaoPerfilRecursoVazio);
                    setPermissoesPerfilRecurso(null);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Sucesso',
                    detail: 'Perfil Recurso criado',
                });
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao criar perfil de recurso',
                });
            });
        } else {
            permissaoPerfilRecursoService.alterar(permissaoPerfilRecurso)
            .then((responde) => {
                console.log(responde.data);
                setPermissaoPerfilRecursoDialog(false);
                setPermissaoPerfilRecurso(permissaoPerfilRecursoVazio);
                setPermissoesPerfilRecurso(null);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Sucesso',
                    detail: 'Perfil de recurso alterado',
                });
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao alterar perfil de recurso',
                });
            });
        }

    };

    const editPermissaoPerfilRecurso = (permissaoPerfilRecurso: Projeto.PermissaoPerfilRecurso) => {
        setPermissaoPerfilRecurso({ ...permissaoPerfilRecurso });
        setPermissaoPerfilRecursoDialog(true);
    };

    const confirmDeletePermissaoPerfilRecurso = (permissaoPerfilRecurso: Projeto.PermissaoPerfilRecurso) => {
        setPermissaoPerfilRecurso(permissaoPerfilRecurso);
        setDeletePermissaoPerfilRecursoDialog(true);
    };

    const deletePermissaoPerfilRecurso = () => {
        if(permissaoPerfilRecurso.id){
            permissaoPerfilRecursoService.excluir(permissaoPerfilRecurso.id)
            .then((response) => {
                console.log(response.data);
                setDeletePermissaoPerfilRecursoDialog(false);
                setPermissaoPerfilRecurso(permissaoPerfilRecursoVazio);
                setPermissoesPerfilRecurso(null);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Sucesso',
                    detail: 'Perfil de Recurso excluído',
                });
            }).catch((error) => {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao excluir perfil de Recurso',
                });
            });
        }
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePermissoesPerfilRecursoDialog(true);
    };

    const deleteSelectedPermissoesPerfilRecurso = () => {
        Promise.all(selectedPermissoesPerfilRecurso.map(async (_permissaoPerfilRecurso) => {
            if (_permissaoPerfilRecurso.id) {
                await permissaoPerfilRecursoService.excluir(_permissaoPerfilRecurso.id)
            }
        })).then((response) => {
            setPermissoesPerfilRecurso(null);
            setSelectedPermissoesPerfilRecurso([]);
            setDeletePermissoesPerfilRecursoDialog(false);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Perfis de Recurso excluídos',
                life: 3000
            });
        }).catch((error) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao excluir permissoesPerfilRecurso',
                life: 3000
            });
        });
    };

    const OnSelectPerfilChange = (perfil: Projeto.Perfil) => {
        let _permissaoPerfilRecurso = { ...permissaoPerfilRecurso };
        _permissaoPerfilRecurso.perfil = perfil;
        setPermissaoPerfilRecurso(_permissaoPerfilRecurso);
    };

    const OnSelectRecursoChange = (recurso: Projeto.Recurso) => {
        let _permissaoPerfilRecurso = { ...permissaoPerfilRecurso };
        _permissaoPerfilRecurso.recurso = recurso;
        setPermissaoPerfilRecurso(_permissaoPerfilRecurso);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPermissoesPerfilRecurso || !(selectedPermissoesPerfilRecurso as any).length} />
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

    const idBodyTemplate = (rowData: Projeto.PermissaoPerfilRecurso) => {
        return (
            <>
                <span className="p-column-title">Código</span>
                {rowData.id}
            </>
        );
    };

    const perfilBodyTemplate = (rowData: Projeto.PermissaoPerfilRecurso) => {
        return <>{rowData.perfil.descricao}</>;
    };

    const recursoBodyTemplate = (rowData: Projeto.PermissaoPerfilRecurso) => {
        return <>{rowData.recurso.nome}</>;
    };


    const actionBodyTemplate = (rowData: Projeto.PermissaoPerfilRecurso) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editPermissaoPerfilRecurso(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeletePermissaoPerfilRecurso(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Perfis de Recurso</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const permissaoPerfilRecursoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={savePermissaoPerfilRecurso} />
        </>
    );
    const deletePermissaoPerfilRecursoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePermissaoPerfilRecursoDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deletePermissaoPerfilRecurso} />
        </>
    );
    const deletePermissoesPerfilRecursoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePermissoesPerfilRecursoDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedPermissoesPerfilRecurso} />
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
                        value={permissoesPerfilRecurso}
                        selection={selectedPermissoesPerfilRecurso}
                        onSelectionChange={(e) => setSelectedPermissoesPerfilRecurso(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} dos {totalRecords} permissoesPerfilRecurso"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum Perfil de Recurso encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Código" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="perfil" header="Perfil" sortable body={perfilBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="recurso" header="Recurso" sortable body={recursoBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={permissaoPerfilRecursoDialog} style={{ width: '450px' }} header="Detalhes de Perfil do Recurso" modal className="p-fluid" footer={permissaoPerfilRecursoDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="perfil">Perfil</label>
                            <Dropdown optionLabel="descricao" value={permissaoPerfilRecurso.perfil} options={perfis} filter onChange={(e: DropdownChangeEvent) => OnSelectPerfilChange(e.value)} placeholder="Selecione um perfil..." />
                            {submitted && !permissaoPerfilRecurso.perfil && <small className="p-invalid">Perfil é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="recurso">Recurso</label>
                            <Dropdown optionLabel="nome" value={permissaoPerfilRecurso.recurso} options={recursos} filter onChange={(e: DropdownChangeEvent) => OnSelectRecursoChange(e.value)} placeholder="Selecione um usuário..." />
                            {submitted && !permissaoPerfilRecurso.recurso && <small className="p-invalid">Recurso é obrigatório.</small>}
                        </div>
                    </Dialog>


                    <Dialog visible={deletePermissaoPerfilRecursoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePermissaoPerfilRecursoDialogFooter} onHide={hideDeletePermissaoPerfilRecursoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {permissaoPerfilRecurso && (
                                <span>
                                    Você realmente deseja excluir o perfil de recurso? <b>{permissaoPerfilRecurso.descricao}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePermissoesPerfilRecursoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePermissoesPerfilRecursoDialogFooter} onHide={hideDeletePermissoesPerfilRecursoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {permissaoPerfilRecurso && <span>Você realmente deseja excluir os perfis de recurso selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PermissaoPerfilRecurso;
