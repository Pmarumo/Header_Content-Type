const listaCompras = {
    batata: 13,
    sabao: 3, 
    abobrinha: 5, 
    toalha: 1,
    cenoura: 8, 
    balas: 10,
    xuxu: 0
}

console.log('----------> DESAFIO 1 <----------')

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)) 
}

const pegarQtdItem = async (item) => {
    await sleep(3000);
    return listaCompras[item]
}

const looping = async _ => {
    try {    
        console.log('Começou')
        for (const key of Object.keys(listarCompras)) {
            const qtdItem = await pegarQtdItem(key) // o node vai na que for mais rápido, se não colocar await...OPS
            console.log(key, qtdItem);
        }
        console.log('Terminou')
    } catch (error) {
        console.log()
    }
}