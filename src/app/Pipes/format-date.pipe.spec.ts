import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  // declaramos la varibale de tipo FormatDatePipe
  let pipe: FormatDatePipe;

  // antes de cada prueba instanciamos la variable pipe
  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  // Test 1, que se cree el pipe correctamente
  it('create an FormatDatePipe', () => {
    expect(pipe).toBeTruthy();
  });
  // Test 2, dada una fecha y el argumento 1 devuelve el formato esperado
  it('FormatDatePipe: should return the expected format 1', () => {
    const date = new Date('2021-01-01');
    const result = pipe.transform(date, 1);
    expect(result).toBe('01012021');
  });
  // Test 3, dada una fecha y el argumento 2 devuelve el formato esperado
  it('FormatDatePipe: should return the expected format 2', () => {
    const date = new Date('2021-01-01');
    const result = pipe.transform(date, 2);
    expect(result).toBe('01 / 01 / 2021');
  });

  // Test 4, dada una fecha y el argumento 3 devuelve el formato esperado
  it('FormatDatePipe: should return the expected format 3', () => {
    const date = new Date('2021-01-01');
    const result = pipe.transform(date, 3);
    expect(result).toBe('01/01/2021');
  });
  // Test 5, dada una fecha y el argumento 4 devuelve el formato esperado
  it('FormatDatePipe: should return the expected format 4', () => {
    const date = new Date('2021-01-01');
    const result = pipe.transform(date, 4);
    expect(result).toBe('2021-01-01');
  });
});
