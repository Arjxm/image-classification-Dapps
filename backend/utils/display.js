import Table from 'cli-table';

const table = new Table({
    head: ["Request Id", "Challenge", "Difficulty"],
    colWidths: [12, 75, 15],
})

export default function display({id, challenge, difficulty}){
    table.pop();
    table.push([id, challenge, difficulty]);
    console.log(table.toString());
}