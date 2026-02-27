'use strict'

import { buscarAlunoPorId, buscarAlunosCurso } from "./alunos.js"

const main = document.querySelector('main')
const btnSair = document.getElementById('btn_sair')

function construirSectionCursos() {
    const sectionCursos = document.createElement('section')

    const aside = document.createElement('aside')
    const h2Escolha = document.createElement('h2')
    const spanCurso = document.createElement('span')
    const imgDevices = document.createElement('img')

    const ulStudent = document.createElement('ul')
    const imgStudent = document.createElement('img')

    const navCursos = document.createElement('nav')
    const divDs = document.createElement('div')
    const imgDsIcon = document.createElement('img')
    const h2Ds = document.createElement('h2')

    const divRedes = document.createElement('div')
    const imgRedesIcon = document.createElement('img')
    const h2Redes = document.createElement('h2')

    const imgVoltar = document.createElement('img')
    const h2Voltar = document.createElement('h2')

    spanCurso.textContent = 'curso'
    h2Escolha.append('Escolha um ', spanCurso, ' para gerenciar')
    imgDevices.src = '../img/devices.svg'
    aside.append(h2Escolha, imgDevices)

    imgStudent.src = '../img/studant.svg'
    ulStudent.append(imgStudent)

    imgDsIcon.src = '../img/ds_icon.svg'
    h2Ds.textContent = 'DS'
    divDs.append(imgDsIcon, h2Ds)

    imgRedesIcon.src = '../img/redes_icon.svg'
    h2Redes.textContent = 'Redes'
    divRedes.append(imgRedesIcon, h2Redes)
    navCursos.append(divDs, divRedes)

    sectionCursos.append(aside, ulStudent, navCursos)
    sectionCursos.classList.add('section-cursos')
    main.append(sectionCursos)

    divDs.addEventListener('click', async () => {
        await construirSectionAlunos(1)
    })

    divRedes.addEventListener('click', async () => {
        await construirSectionAlunos(2)

    })

    imgVoltar.src = '../img/voltar-image.svg'
    h2Voltar.textContent = 'Sair'
    btnSair.textContent = ''
    btnSair.append(imgVoltar, h2Voltar)
}

async function construirSectionAlunos(cursoEscolhido) {
    try {
        const sectionAlunos = document.createElement('section')
        const h2CursoNome = document.createElement('h2')
        const divContainer = document.createElement('div')
        const imgVoltar = document.createElement('img')
        const h2Voltar = document.createElement('h2')

        const alunos = await buscarAlunosCurso(cursoEscolhido)
        alunos.forEach(aluno => {
            const divAluno = document.createElement('div')
            const imgAluno = document.createElement('img')
            const h2NomeAluno = document.createElement('h2')

            h2NomeAluno.textContent = aluno.nome
            imgAluno.src = aluno.foto
            divAluno.append(imgAluno, h2NomeAluno)
            divContainer.append(divAluno)

            divAluno.addEventListener('click', async () => {
                await construirSectionInfoAluno(aluno.id)
            })
        })

        if (cursoEscolhido === 1) {
            h2CursoNome.textContent = 'Desenvolvimento de Sistemas'
            h2CursoNome.classList.add('curso-nome')
        } else if (cursoEscolhido === 2) {
            h2CursoNome.textContent = 'Redes'
            h2CursoNome.classList.add('curso-nome')
        }

        imgVoltar.src = '../img/voltar-image.svg'
        h2Voltar.textContent = 'Voltar'
        btnSair.textContent = ''
        btnSair.append(imgVoltar, h2Voltar)

        divContainer.classList.add('container-alunos')
        sectionAlunos.classList.add('section-alunos')
        sectionAlunos.append(h2CursoNome, divContainer)
        main.textContent = ''
        main.append(sectionAlunos)
    } catch (error) {
        alert('Não foi possivel encontrar o curso escolhido')
    }
}

async function construirSectionInfoAluno(alunoEscolhido) {
    try {
        const sectionInfoAluno = document.createElement('section')
        const divAluno = document.createElement('div')
        const imgAluno = document.createElement('img')
        const h2Nome = document.createElement('h2')

        const ulDesempenho = document.createElement('ul')

        const aluno = await buscarAlunoPorId(alunoEscolhido)

        imgAluno.src = aluno.foto
        h2Nome.textContent = aluno.nome
        divAluno.append(imgAluno, h2Nome)
        divAluno.classList.add('aluno')

        aluno.desempenho.forEach(materia => {
            const liMateria = document.createElement('li')
            const pDesempenho = document.createElement('p')
            const divBarra = document.createElement('div')
            const divPreenchimento = document.createElement('div')
            const pMateria = document.createElement('p')

            pDesempenho.textContent = materia.valor
            pMateria.textContent = materia.categoria

            divPreenchimento.style.height = `${materia.valor}%`
            divBarra.append(divPreenchimento)

            liMateria.append(pDesempenho, divBarra, pMateria)
            ulDesempenho.append(liMateria)

            divBarra.classList.add('barra')
            divPreenchimento.classList.add('preenchimento')

            if (materia.valor >= 70) {
                divPreenchimento.classList.add('azul')
            } else if (materia.valor < 50) {
                divPreenchimento.classList.add('vermelho')
            } else if (materia.categoria >= 50) {
                divPreenchimento.classList.add('amarelo')
            }
        })

        ulDesempenho.classList.add('desempenho')
        sectionInfoAluno.append(divAluno, ulDesempenho)
        sectionInfoAluno.classList.add('section-info-aluno')
        main.textContent = ''
        main.append(sectionInfoAluno)
    } catch (error) {
        alert('Não foi possivel encontrar o desempenho do Aluno selecionado')
    }
}

btnSair.addEventListener('click', function () {
    main.textContent = ''
    construirSectionCursos()
})

window.onload = function () {
    construirSectionCursos()
}