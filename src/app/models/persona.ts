
export interface Persona {
    pregnancies: number;
    plasmaGlucose: number;
    bloodPressure: number;
    skinThickness: number;
    insulin: number;
    bmi: number;
    diabetesPedigreeFunction: number;
    age: number;
  }
  
  export interface resultadoModelo {
    recomendacion: any;
    persona: Persona;
    resultado: string;
  }
  