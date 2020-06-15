const formater = Intl.NumberFormat('pt-BR');

function formatNunbers(value) {
    return formater.format(value);
}
export { formatNunbers };