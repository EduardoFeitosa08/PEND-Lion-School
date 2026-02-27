const alunos = require('../alunos.js')

test('Buscar Alunos do Id Curso', async () =>{
    const resultado = await alunos.buscarAlunosCurso(1)
    expect(Array.isArray(resultado)).toBe(true)
})

test('Buscar Alunos do Id Curso', async () =>{
    const resultado = await alunos.buscarAlunosCurso(3)
    expect(resultado).toBe(false)
})

test('Buscar Aluno pelo Id', async () => {
    const resultado = await alunos.buscarAlunoPorId(1)
    expect(resultado).toHaveProperty('id')
})

test('Buscar Aluno pelo Id', async () => {
    const resultado = await alunos.buscarAlunoPorId(100)
    expect(resultado).toBe(false)
})