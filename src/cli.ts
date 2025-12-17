import * as fs from 'fs';
import * as path from 'path';
import { CharStream, CommonTokenStream } from 'antlr4';
import ConfigLexer from './generated/ConfigLexer';
import ConfigParser from './generated/ConfigParser';
import { ConfigVisitorImpl } from './ConfigVisitorImpl';
import { serializeToTOML } from './serializer';

function parseArgs(): { input: string; output: string } {
    const args = process.argv.slice(2);
    let input: string | undefined;
    let output: string | undefined;

    for (let i = 0; i < args.length; i += 2) {
        if (args[i] === '--input' && args[i + 1]) input = args[i + 1];
        if (args[i] === '--output' && args[i + 1]) output = args[i + 1];
    }

    if (!input || !output) {
        console.error('Usage: node dist/index.js --input <source.cfg> --output <config.toml>');
        process.exit(1);
    }

    return { input, output };
}

export function run() {
    const { input, output } = parseArgs();

    try {
        const source = fs.readFileSync(input, 'utf-8');
        const inputStream = new CharStream(source);
        const lexer = new ConfigLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new ConfigParser(tokenStream);
        parser.buildParseTrees = true;
        const tree = parser.prog();

        const visitor = new ConfigVisitorImpl();
        const constants = visitor.visitProg(tree);
        const toml = serializeToTOML(constants);
        fs.writeFileSync(output, toml, 'utf-8');
        console.log(`Successfully compiled ${path.basename(input)} → ${path.basename(output)}`);
    } catch (err: any) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}