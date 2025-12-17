import {ErrorListener, RecognitionException, Token} from 'antlr4';

export class ThrowingErrorListener<T = Token> extends ErrorListener<T>{
    syntaxError(
        _0: any,
        _1: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        _2: RecognitionException | undefined
    ): void {
        throw new Error(`line ${line}:${charPositionInLine} ${msg}`);
    }
}