// Generated from ./Config.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { ProgContext } from "./ConfigParser";
import { DeclarationContext } from "./ConfigParser";
import { NumberValueContext } from "./ConfigParser";
import { StringValueContext } from "./ConfigParser";
import { ArrayValueContext } from "./ConfigParser";
import { RefValueContext } from "./ConfigParser";
import { ArrayContext } from "./ConfigParser";
import { ReferenceContext } from "./ConfigParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ConfigParser`.
 */
export default class ConfigListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ConfigParser.prog`.
	 * @param ctx the parse tree
	 */
	enterProg?: (ctx: ProgContext) => void;
	/**
	 * Exit a parse tree produced by `ConfigParser.prog`.
	 * @param ctx the parse tree
	 */
	exitProg?: (ctx: ProgContext) => void;
	/**
	 * Enter a parse tree produced by `ConfigParser.declaration`.
	 * @param ctx the parse tree
	 */
	enterDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ConfigParser.declaration`.
	 * @param ctx the parse tree
	 */
	exitDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Enter a parse tree produced by the `numberValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 */
	enterNumberValue?: (ctx: NumberValueContext) => void;
	/**
	 * Exit a parse tree produced by the `numberValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 */
	exitNumberValue?: (ctx: NumberValueContext) => void;
	/**
	 * Enter a parse tree produced by the `stringValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 */
	enterStringValue?: (ctx: StringValueContext) => void;
	/**
	 * Exit a parse tree produced by the `stringValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 */
	exitStringValue?: (ctx: StringValueContext) => void;
	/**
	 * Enter a parse tree produced by the `arrayValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 */
	enterArrayValue?: (ctx: ArrayValueContext) => void;
	/**
	 * Exit a parse tree produced by the `arrayValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 */
	exitArrayValue?: (ctx: ArrayValueContext) => void;
	/**
	 * Enter a parse tree produced by the `refValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 */
	enterRefValue?: (ctx: RefValueContext) => void;
	/**
	 * Exit a parse tree produced by the `refValue`
	 * labeled alternative in `ConfigParser.value`.
	 * @param ctx the parse tree
	 */
	exitRefValue?: (ctx: RefValueContext) => void;
	/**
	 * Enter a parse tree produced by `ConfigParser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `ConfigParser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;
	/**
	 * Enter a parse tree produced by `ConfigParser.reference`.
	 * @param ctx the parse tree
	 */
	enterReference?: (ctx: ReferenceContext) => void;
	/**
	 * Exit a parse tree produced by `ConfigParser.reference`.
	 * @param ctx the parse tree
	 */
	exitReference?: (ctx: ReferenceContext) => void;
}

