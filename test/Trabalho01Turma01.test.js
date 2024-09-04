const GerenciadorDeTarefas = require('../src/Trabalho01Turma01'); 

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
        gerenciador.adicionarTarefa({ id: 1, descricao: 'Tarefa 1', concluida: false });
        gerenciador.adicionarTarefa({ id: 2, descricao: 'Tarefa 2', concluida: false });
        gerenciador.adicionarTarefa({ id: 3, descricao: 'Tarefa 3', concluida: false });
    });

    test('deve adicionar uma nova tarefa com sucesso', () => {
        const tarefa = { id: 1, descricao: 'Tarefa importante', data: '2024-09-04', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);

        expect(gerenciador.listarTarefas()).toContainEqual(tarefa);
    });

    test('deve remover a tarefa corretamente pelo id', () => {
        gerenciador.removerTarefa(2);
        
        const tarefasEsperadas = [
            { id: 1, descricao: 'Tarefa 1', concluida: false },
            { id: 3, descricao: 'Tarefa 3', concluida: false },
        ];

        expect(gerenciador.listarTarefas()).toEqual(tarefasEsperadas);
    });

    test('não deve remover tarefa se o id não existir', () => {

        gerenciador.removerTarefa(99);

        const tarefasEsperadas = [
            { id: 1, descricao: 'Tarefa 1', concluida: false },
            { id: 2, descricao: 'Tarefa 2', concluida: false },
            { id: 3, descricao: 'Tarefa 3', concluida: false },
        ];

        expect(gerenciador.listarTarefas()).toEqual(tarefasEsperadas);
    });

    test('deve retornar a tarefa correta pelo id', () => {

        const tarefa = gerenciador.buscarTarefaPorId(2);
        
        const tarefaEsperada = { id: 2, descricao: 'Tarefa 2', concluida: false };

        expect(tarefa).toEqual(tarefaEsperada);
    });

    test('deve retornar undefined se a tarefa não existir', () => {

        const tarefa = gerenciador.buscarTarefaPorId(99);

        expect(tarefa).toBeUndefined();
    });

    test('deve atualizar os dados da tarefa corretamente', () => {
        const novosDados = { descricao: 'Tarefa Atualizada', concluida: true, prioridade: 5 };
        
        gerenciador.atualizarTarefa(2, novosDados);
        
        const tarefaEsperada = { id: 2, descricao: 'Tarefa Atualizada', concluida: true, prioridade: 5 };

        expect(gerenciador.buscarTarefaPorId(2)).toEqual(tarefaEsperada);
    });

    test('não deve atualizar a tarefa se o id não existir', () => {
        const novosDados = { descricao: 'Nova Descrição', concluida: true, prioridade: 5 };

        const tarefasIniciais = gerenciador.listarTarefas().map(t => ({ ...t }));

        gerenciador.atualizarTarefa(99, novosDados);
        
        expect(gerenciador.listarTarefas()).toEqual(tarefasIniciais);
    });


    test('deve retornar uma lista vazia se não houver tarefas', () => {
        const novoGerenciador = new GerenciadorDeTarefas();
        
        expect(novoGerenciador.listarTarefas()).toEqual([]);
    });

    test('deve listar todas as tarefas corretamente após adição', () => {

        const tarefasEsperadas = [
            { id: 1, descricao: 'Tarefa 1', concluida: false },
            { id: 2, descricao: 'Tarefa 2', concluida: false },
            { id: 3, descricao: 'Tarefa 3', concluida: false },
        ];

        const tarefasRetornadas = gerenciador.listarTarefas().sort((a, b) => a.id - b.id);

        expect(tarefasRetornadas).toEqual(tarefasEsperadas);
    });
    test('deve marcar uma tarefa como concluída corretamente', () => {

        gerenciador.marcarTarefaComoConcluida(1);

        const tarefa = gerenciador.buscarTarefaPorId(1);
        expect(tarefa.concluida).toBe(true);
    });

    test('deve marcar todas as tarefas como concluídas mesmo que algumas já estejam concluídas', () => {

        gerenciador.marcarTodasComoConcluidas();

        const tarefas = gerenciador.listarTarefas();
        tarefas.forEach(tarefa => {
            expect(tarefa.concluida).toBe(true);
        });
    });

});