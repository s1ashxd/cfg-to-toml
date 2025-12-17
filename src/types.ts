export type Value = number | string | Value[];

export type ConstantsMap = Map<string, Value>;

export enum TokenType {
    VAR,
    NAME,
    ASSIGN,        // :=
    NUMBER,
    STRING,
    LPAREN,        // (
    RPAREN,        // )
    COMMA,
    REF_START,     // #[
    REF_END,       // ]
    COMMENT_START, // =begin
    COMMENT_END,   // =end
    EOF,
}

export interface Token {
    type: TokenType;
    value: string | number | null;
    line: number;
    column: number;
}