export default function jsonl (data) {
    const jsonl = data.map(product => JSON.stringify(product));
    return jsonl.join('\n');
}
