const { Soma } = require("../../common/calc")
const { Sub } = require("../../common/calc")
const { Mult } = require("../../common/calc")
const { Div } = require("../../common/calc")



// Todo teste ocorre dentro de describe
describe('Calculadora', () => {
    it('deve retornar o resultado da soma de 1+2', () => {
        const res = Soma(1, 2);
        expect(res).toBe(3);
    })
    it('deve retornar o resultado da subtração de 2-1', () => {
        const res = Sub(2, 1);
        expect(res).toBe(1);
    })
    it('deve retornar o resultado da multiplicação de 2x1', () => {
        const res = Mult(2, 1);
        expect(res).toBe(2);
    })
    it('deve retornar o resultado da divisão de 10/5', () => {
        const res = Div(10, 5);
        expect(res).toBe(2);
    })
})