// Generated from ./Config.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { ProgContext } from "./ConfigParser";
import { DeclarationContext } from "./ConfigParser";
import { NumberValueContext } from "./ConfigParser";
import { StringValueContext } from "./ConfigParser";
import { ArrayValueContext } from "./ConfigParser";
import { RefValueContext } from "./ConfigParser";
import { ArrayContext } from "./ConfigParser";
import { ReferenceContext } from "./ConfigParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ConfigParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class ConfigVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ConfigParser.prog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProg?: (ctx: ProgContext) => Result;
	/**
	 * Visit a parse tree produced by `ConfigParser.declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclaration?: (ctx: DeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberValue?: (ctx: NumberValueContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringValue?: (ctx: StringValueContext) => Result;
	/**
	 * Visit a parse tree produced by the `arrayValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayValue?: (ctx: ArrayValueContext) => Result;
	/**
	 * Visit a parse tree produced by the `refValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRefValue?: (ctx: RefValueContext) => Result;
	/**
	 * Visit a parse tree produced by `ConfigParser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;
	/**
	 * Visit a parse tree produced by `ConfigParser.reference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReference?: (ctx: ReferenceContext) => Result;
}

