import { promises } from 'fs';
import express from 'express';
import timesRouter from './routes/times.js'

const { readFile, writeFile } = promises;
const times = [];

init();

const app = express();
app.use(express.json());

app.use('/times', timesRouter);

app.listen(3000, () => {
    console.log("API Started");
})


async function init() {
    try {
        const resp = await readFile('./2012.json');
        const data = JSON.parse(resp);

        //Montando array de times
        data[0].partidas.forEach(partida => {
            times.push({ time: partida.mandante, pontuacao: 0 });
            times.push({ time: partida.visitante, pontuacao: 0 });
        });
        //Montando pontuação do times no array criado
        data.forEach(rodada => {
            rodada.partidas.forEach(partida => {
                const indexMandante = times.findIndex(item => item.time === partida.mandante);
                const indexVisitante = times.findIndex(item => item.time === partida.visitante);
                let timeMandante = times[indexMandante];
                let timeVisitante = times[indexVisitante]

                if (partida.placar_visitante > partida.placar_mandante) {

                    timeVisitante.pontuacao += 3;
                    times[indexVisitante] = timeVisitante;

                } else if (partida.placar_mandante > partida.placar_visitante) {

                    timeMandante.pontuacao += 3;
                    times[indexMandante] = timeMandante;

                } else {

                    timeMandante.pontuacao += 1;
                    times[indexMandante] = timeMandante;

                    timeVisitante.pontuacao += 1;
                    times[indexVisitante] = timeVisitante;
                }
            });
        });

        //orders times pela pontuação
        times.sort((a, b) => {
            return b.pontuacao - a.pontuacao;
        });

        //Salvando o Array de times ordenado pela pontuação
        await writeFile('times.json', JSON.stringify(times));

        //returnChampion();

    } catch (err) {
        console.error(err);
    }
}

// function returnChampion() {
//     return times[0];
// }