import pegaArquivo from '../index.js';

const arrayResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
];

describe('pegaArquivo::', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function');
    });

    it('deve retornar array com resultados', async () => {
        const resultado = await pegaArquivo('C:\\Users\\013997631\\FormacaoNode\\lib-markdown\\test\\arquivos\\texto1.md');
        expect(resultado).toEqual(arrayResult);
    });

    it('deve retornar mensagem "não há links"', async () => {
        const resultado = await pegaArquivo('C:\\Users\\013997631\\FormacaoNode\\lib-markdown\\test\\arquivos\\texto1_semlinks.md');
        expect(resultado).toBe('Não há links');
    });

    it('dfeve lançar um erro na falta de arquivo', async() => {
        await expect(pegaArquivo('C:\\Users\\013997631\\FormacaoNode\\lib-markdown\\test\\arquivos'))
        .rejects.toThrow(/EISDIR/);
    });

    //testing if promises solved
    it('deve resolver a função com sucesso', async() => {
        await expect(pegaArquivo('C:\\Users\\013997631\\FormacaoNode\\lib-markdown\\test\\arquivos\\texto1.md'))
        .resolves.toEqual(arrayResult);
    })
});