'use strict'

export async function buscarAlunosCurso(curso_id) {
    const url = `https://lion-school-backend.onrender.com/alunos?curso_id=${curso_id}`
    const response = await fetch(url)
    const alunos = await response.json()
    // console.log(alunos)
    if(alunos.length != 0){
        return alunos
    }else{
        return false
    }
}

export async function buscarAlunoPorId(aluno_id) {
    const url = `https://lion-school-backend.onrender.com/alunos/${aluno_id}`
    const response = await fetch(url)
    const alunos = await response.json()
    // console.log(alunos)
    if(alunos.id){
        return alunos
    }else{
        return false
    }
}