export declare class ComponenteCrud {
    tareas: any[];
    tarea: any;
    editing: boolean;
    viewTarea: any;
    private apiUrl;
    componentWillLoad(): Promise<void>;
    fetchTareas(): Promise<void>;
    createTarea(): Promise<void>;
    updateTarea(): Promise<void>;
    deleteTarea(id: number): Promise<void>;
    resetForm(): void;
    handleInputChange(event: Event): void;
    editTarea(tarea: any): void;
    viewTareaDetails(tarea: any): void;
    render(): any;
}
