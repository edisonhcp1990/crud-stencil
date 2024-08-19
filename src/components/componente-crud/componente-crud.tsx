import { Component, Host, h, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'componente-crud',
  styleUrl: 'componente-crud.css',
  shadow: true,
})
export class ComponenteCrud {
  @State() tareas: any[] = [];
  @State() tarea: any = { id_tarea: null, nombre_tarea: '', responsable: '', estado: '', fecha_limite: '', prioridad: '' };
  @State() editing: boolean = false;
  @State() viewTarea: any = null;  // Estado para ver los detalles de una tarea

  private apiUrl = 'http://localhost:3000/acciones';

  async componentWillLoad() {
    await this.fetchTareas();
  }

  async fetchTareas() {
    try {
      const response = await axios.get(this.apiUrl);
      this.tareas = response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async createTarea() {
    try {
      await axios.post(this.apiUrl, this.tarea);
      await this.fetchTareas();
      this.resetForm();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  async updateTarea() {
    try {
      await axios.put(`${this.apiUrl}/${this.tarea.id_tarea}`, this.tarea);
      await this.fetchTareas();
      this.resetForm();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  async deleteTarea(id: number) {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
      await this.fetchTareas();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  resetForm() {
    this.tarea = { id_tarea: null, nombre_tarea: '', responsable: '', estado: '', fecha_limite: '', prioridad: '' };
    this.editing = false;
    this.viewTarea = null;  // Reset viewTarea when resetting form
  }

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tarea[input.name] = input.value;
  }

  editTarea(tarea: any) {
    this.tarea = { ...tarea };
    this.editing = true;
    this.viewTarea = null;  // Clear viewTarea when starting to edit
  }

  viewTareaDetails(tarea: any) {
    this.viewTarea = tarea;
  }

  render() {
    return (
      <Host>
        <div class="container">
          <h2>{this.editing ? 'Editar Tarea' : 'Agregar Tarea'}</h2>
          <form onSubmit={(e) => { e.preventDefault(); this.editing ? this.updateTarea() : this.createTarea(); }} class="form">
            <input
              type="text"
              name="nombre_tarea"
              placeholder="Nombre de la tarea"
              value={this.tarea.nombre_tarea}
              onInput={(e) => this.handleInputChange(e)}
              required
            />
            <input
              type="text"
              name="responsable"
              placeholder="Responsable"
              value={this.tarea.responsable}
              onInput={(e) => this.handleInputChange(e)}
              required
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={this.tarea.estado}
              onInput={(e) => this.handleInputChange(e)}
              required
            />
            <input
              type="datetime-local"
              name="fecha_limite"
              placeholder="Fecha Límite"
              value={this.tarea.fecha_limite}
              onInput={(e) => this.handleInputChange(e)}
              required
            />
            <input
              type="text"
              name="prioridad"
              placeholder="Prioridad"
              value={this.tarea.prioridad}
              onInput={(e) => this.handleInputChange(e)}
              required
            />
            <button type="submit" class="btn-submit">{this.editing ? 'Actualizar' : 'Crear'}</button>
            {this.editing && <button type="button" onClick={() => this.resetForm()} class="btn-cancel">Cancelar</button>}
          </form>

          <h2>Lista de Tareas</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th>Fecha Límite</th>
                <th>Prioridad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.tareas.map(tarea => (
                <tr key={tarea.id_tarea}>
                  <td>{tarea.nombre_tarea}</td>
                  <td>{tarea.responsable}</td>
                  <td>{tarea.estado}</td>
                  <td>{tarea.fecha_limite}</td>
                  <td>{tarea.prioridad}</td>
                  <td>
                    <button onClick={() => this.viewTareaDetails(tarea)} class="btn-view">Ver</button>
                    <button onClick={() => this.editTarea(tarea)} class="btn-edit">Editar</button>
                    <button onClick={() => this.deleteTarea(tarea.id_tarea)} class="btn-delete">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {this.viewTarea && (
            <div class="view-details">
              <h2>Detalles de la Tarea</h2>
              <p><strong>Nombre:</strong> {this.viewTarea.nombre_tarea}</p>
              <p><strong>Responsable:</strong> {this.viewTarea.responsable}</p>
              <p><strong>Estado:</strong> {this.viewTarea.estado}</p>
              <p><strong>Fecha Límite:</strong> {this.viewTarea.fecha_limite}</p>
              <p><strong>Prioridad:</strong> {this.viewTarea.prioridad}</p>
              <button onClick={() => this.resetForm()} class="btn-close">Cerrar</button>
            </div>
          )}
        </div>
      </Host>
    );
  }
}

