// src/ConfigVisitorImpl.ts
import {ParseTreeVisitor } from 'antlr4';
import ConfigVisitor from './generated/ConfigVisitor';
import {
    ProgContext,
    DeclarationContext,
    NumberValueContext,
    StringValueContext,
    ArrayValueContext,
    RefValueContext,
    ArrayContext,
    ValueContext,
    ReferenceContext
} from './generated/ConfigParser';
import { Value, ConstantsMap } from './types';

export class ConfigVisitorImpl
    extends ParseTreeVisitor<void>
    implements ConfigVisitor<void>
{
    public constants: ConstantsMap = new Map<string, Value>();

    visitNumberValue(ctx: NumberValueContext) {
        return parseFloat(ctx.NUMBER().getText());
    }

    visitStringValue(ctx: StringValueContext) {
        let text = ctx.STRING().getText();
        text = text.slice(1, -1);
        return text.replace(/\\'/g, "'");
    }

    visitArrayValue(ctx: ArrayValueContext) {
        return this.visitArray(ctx.array());
    }

    visitRefValue(ctx: RefValueContext) {
        return this.visitReference(ctx.reference());
    }

    visitProg(ctx: ProgContext): ConstantsMap {
        ctx.declaration_list().forEach(decl => this.visitDeclaration(decl));
        return this.constants
    }

    visitDeclaration(ctx: DeclarationContext): void {
        const name = ctx.NAME().getText();
        const valueCtx = ctx.value();

        const value = this.visitValue(valueCtx);

        if (this.constants.has(name)) {
            throw new Error(`Line ${ctx.start.line}: Duplicate constant '${name}'`);
        }

        this.constants.set(name, value);
    }

    visitValue(ctx: ValueContext): Value {
        if (ctx instanceof NumberValueContext) {
            return this.visitNumberValue(ctx)
        }
        if (ctx instanceof StringValueContext) {
            return this.visitStringValue(ctx)
        }
        if (ctx instanceof ArrayValueContext) {
            return this.visitArrayValue(ctx)
        }
        if (ctx instanceof RefValueContext) {
            return this.visitRefValue(ctx)
        }
        throw new Error(`Line ${ctx.start.line}: Unknown value type`);
    }

    visitArray(ctx: ArrayContext): Value[] {
        const result: Value[] = [];
        const valueList = ctx.value_list();
        for (const v of valueList) {
            result.push(this.visitValue(v));
        }
        return result;
    }

    visitReference(ctx: ReferenceContext): Value {
        const name = ctx.NAME().getText();
        const value = this.constants.get(name);
        if (value === undefined) {
            throw new Error(`Line ${ctx.start.line}: Undefined constant '${name}'`);
        }
        return value;
    }
}