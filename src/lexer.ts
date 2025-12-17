import { Token, TokenType } from './types';

export class Lexer {
    private input: string;
    private pos: number = 0;
    private line: number = 1;
    private column: number = 1;

    constructor(input: string) {
        this.input = input.trim() + '\n';
    }

    private advance() {
        if (this.input[this.pos] === '\n') {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
        }
        this.pos++;
    }

    private skipWhitespace() {
        while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
            this.advance();
        }
    }

    private skipMultiLineComment(): boolean {
        if (this.input.startsWith('=begin', this.pos)) {
            const startPos = this.pos;
            this.pos += 6;
            this.column += 6;
            const endIndex = this.input.indexOf('=end', this.pos);
            if (endIndex === -1) {
                throw new Error(`Unclosed multi-line comment starting at line ${this.line}`);
            }
            const commentContent = this.input.substring(startPos, endIndex + 4);
            const lines = commentContent.split('\n').length - 1;
            this.line += lines;
            this.pos = endIndex + 4;
            this.column = 1;
            return true;
        }
        return false;
    }

    nextToken(): Token {
        this.skipWhitespace();

        if (this.pos >= this.input.length) {
            return { type: TokenType.EOF, value: null, line: this.line, column: this.column };
        }

        if (this.skipMultiLineComment()) {
            return this.nextToken();
        }

        const ch = this.input[this.pos];
        const startColumn = this.column;

        if (this.input.startsWith('var', this.pos) && !/[_a-zA-Z0-9]/.test(this.input[this.pos + 3] || '')) {
            this.pos += 3;
            this.column += 3;
            return { type: TokenType.VAR, value: 'var', line: this.line, column: startColumn };
        }

        if (this.input.startsWith(':=', this.pos)) {
            this.pos += 2;
            this.column += 2;
            return { type: TokenType.ASSIGN, value: ':=', line: this.line, column: startColumn };
        }

        if (this.input.startsWith('#[', this.pos)) {
            this.pos += 2;
            this.column += 2;
            return { type: TokenType.REF_START, value: '#[', line: this.line, column: startColumn };
        }

        if (ch === ']') { this.advance(); return { type: TokenType.REF_END, value: ']', line: this.line, column: startColumn }; }
        if (ch === '(') { this.advance(); return { type: TokenType.LPAREN, value: '(', line: this.line, column: startColumn }; }
        if (ch === ')') { this.advance(); return { type: TokenType.RPAREN, value: ')', line: this.line, column: startColumn }; }
        if (ch === ',') { this.advance(); return { type: TokenType.COMMA, value: ',', line: this.line, column: startColumn }; }

        if (/[_a-zA-Z]/.test(ch)) {
            let name = '';
            while (this.pos < this.input.length && /[_a-zA-Z0-9]/.test(this.input[this.pos])) {
                name += this.input[this.pos];
                this.advance();
            }
            return { type: TokenType.NAME, value: name, line: this.line, column: startColumn };
        }

        if (/[+-]?\d/.test(ch)) {
            let numStr = '';
            if (ch === '+' || ch === '-') {
                numStr += ch;
                this.advance();
            }
            while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
                numStr += this.input[this.pos];
                this.advance();
            }
            if (this.input[this.pos] !== '.') {
                throw new Error(`Expected decimal point in number at line ${this.line}, column ${startColumn}`);
            }
            numStr += '.';
            this.advance();
            if (!/\d/.test(this.input[this.pos])) {
                throw new Error(`Expected digit after decimal point at line ${this.line}, column ${this.column}`);
            }
            while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
                numStr += this.input[this.pos];
                this.advance();
            }
            return { type: TokenType.NUMBER, value: parseFloat(numStr), line: this.line, column: startColumn };
        }

        if (ch === "'") {
            this.advance();
            let str = '';
            while (this.pos < this.input.length && this.input[this.pos] !== "'") {
                if (this.input[this.pos] === '\n') {
                    throw new Error(`Unclosed string starting at line ${this.line}`);
                }
                str += this.input[this.pos];
                this.advance();
            }
            if (this.pos >= this.input.length) {
                throw new Error(`Unclosed string at line ${this.line}`);
            }
            this.advance();
            return { type: TokenType.STRING, value: str, line: this.line, column: startColumn };
        }

        throw new Error(`Unexpected character '${ch}' at line ${this.line}, column ${this.column}`);
    }
}