import { Lexer } from './lexer';
import { TokenType, Value, ConstantsMap, Token } from './types';

export class Parser {
    private lexer: Lexer;
    private currentToken: Token;
    private constants: ConstantsMap = new Map();

    constructor(source: string) {
        this.lexer = new Lexer(source);
        this.currentToken = this.lexer.nextToken();
    }

    private eat(expectedType: TokenType) {
        if (this.currentToken.type === expectedType) {
            this.currentToken = this.lexer.nextToken();
        } else {
            throw new Error(
                `Expected ${TokenType[expectedType]}, got ${TokenType[this.currentToken.type]} ` +
                `at line ${this.currentToken.line}, column ${this.currentToken.column}`
            );
        }
    }

    private parseValue(): Value {
        switch (this.currentToken.type) {
            case TokenType.NUMBER: {
                const val = this.currentToken.value as number;
                this.eat(TokenType.NUMBER);
                return val;
            }
            case TokenType.STRING: {
                const val = this.currentToken.value as string;
                this.eat(TokenType.STRING);
                return val;
            }
            case TokenType.LPAREN: {
                this.eat(TokenType.LPAREN);
                const arr: Value[] = [];
                // @ts-ignore
                if (this.currentToken.type !== TokenType.RPAREN) {
                    arr.push(this.parseValue());
                    // @ts-ignore
                    while (this.currentToken.type === TokenType.COMMA) {
                        this.eat(TokenType.COMMA);
                        arr.push(this.parseValue());
                    }
                }
                this.eat(TokenType.RPAREN);
                return arr;
            }
            case TokenType.REF_START: {
                this.eat(TokenType.REF_START);
                // @ts-ignore
                if (this.currentToken.type !== TokenType.NAME) {
                    throw new Error(`Expected name after #[ at line ${this.currentToken.line}`);
                }
                const name = this.currentToken.value as string;
                this.eat(TokenType.NAME);
                this.eat(TokenType.REF_END);
                const val = this.constants.get(name);
                if (val === undefined) {
                    throw new Error(`Undefined constant '${name}' at line ${this.currentToken.line}`);
                }
                return val;
            }
            default:
                throw new Error(`Unexpected token in value: ${TokenType[this.currentToken.type]} ` +
                    `at line ${this.currentToken.line}`);
        }
    }

    private parseDeclaration() {
        this.eat(TokenType.VAR);
        if (this.currentToken.type !== TokenType.NAME) {
            throw new Error(`Expected identifier after 'var' at line ${this.currentToken.line}`);
        }
        const name = this.currentToken.value as string;
        this.eat(TokenType.NAME);
        this.eat(TokenType.ASSIGN);
        const value = this.parseValue();
        if (this.constants.has(name)) {
            throw new Error(`Constant '${name}' already defined at line ${this.currentToken.line}`);
        }
        this.constants.set(name, value);
    }

    parse(): ConstantsMap {
        while (this.currentToken.type !== TokenType.EOF) {
            if (this.currentToken.type === TokenType.VAR) {
                this.parseDeclaration();
            } else {
                throw new Error(`Unexpected token ${TokenType[this.currentToken.type]} ` +
                    `at line ${this.currentToken.line}`);
            }
        }
        return this.constants;
    }
}