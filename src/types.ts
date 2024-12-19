export interface Project {
    id: number;
    nombre: string;
    descripcion: string;
    creador_id: number;
    creado_en: string;
  }

  export interface Simulator {
    id: number;
    nombre: string;
    tipo_id: number;
    descripcion: string;
  }
  
  export interface Simulation {
    id: number;
    usuario_id: number;
    parametros: string;
    resultado: string;
    creado_en: string;
  }
  
  export interface Evaluation {
    id: number;
    usuario_id: number;
    proyecto_id: number;
    simulacion_id: number;
    resultado: string;
    creado_en: string;
  }
  
  export type ProjectResponse = Project[];
  export type SimulationResponse = Simulation[];
  export type EvaluationResponse = Evaluation[];
  export type SimulatorResponse = Simulator[];
  