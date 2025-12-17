// Generated from ./Config.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import ConfigListener from "./ConfigListener.js";
import ConfigVisitor from "./ConfigVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class ConfigParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly MULTILINE_COMMENT = 8;
	public static readonly WS = 9;
	public static readonly NUMBER = 10;
	public static readonly STRING = 11;
	public static readonly NAME = 12;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_prog = 0;
	public static readonly RULE_declaration = 1;
	public static readonly RULE_value = 2;
	public static readonly RULE_array = 3;
	public static readonly RULE_reference = 4;
	public static readonly literalNames: (string | null)[] = [ null, "'var'", 
                                                            "':='", "'('", 
                                                            "','", "')'", 
                                                            "'#['", "']'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "MULTILINE_COMMENT", 
                                                             "WS", "NUMBER", 
                                                             "STRING", "NAME" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "declaration", "value", "array", "reference",
	];
	public get grammarFileName(): string { return "Config.g4"; }
	public get literalNames(): (string | null)[] { return ConfigParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return ConfigParser.symbolicNames; }
	public get ruleNames(): string[] { return ConfigParser.ruleNames; }
	public get serializedATN(): number[] { return ConfigParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, ConfigParser._ATN, ConfigParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public prog(): ProgContext {
		let localctx: ProgContext = new ProgContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, ConfigParser.RULE_prog);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 13;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1) {
				{
				{
				this.state = 10;
				this.declaration();
				}
				}
				this.state = 15;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 16;
			this.match(ConfigParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declaration(): DeclarationContext {
		let localctx: DeclarationContext = new DeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, ConfigParser.RULE_declaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 18;
			this.match(ConfigParser.T__0);
			this.state = 19;
			this.match(ConfigParser.NAME);
			this.state = 20;
			this.match(ConfigParser.T__1);
			this.state = 21;
			this.value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, ConfigParser.RULE_value);
		try {
			this.state = 27;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
				localctx = new NumberValueContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 23;
				this.match(ConfigParser.NUMBER);
				}
				break;
			case 11:
				localctx = new StringValueContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 24;
				this.match(ConfigParser.STRING);
				}
				break;
			case 3:
				localctx = new ArrayValueContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 25;
				this.array();
				}
				break;
			case 6:
				localctx = new RefValueContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 26;
				this.reference();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public array(): ArrayContext {
		let localctx: ArrayContext = new ArrayContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, ConfigParser.RULE_array);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 29;
			this.match(ConfigParser.T__2);
			this.state = 38;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3144) !== 0)) {
				{
				this.state = 30;
				this.value();
				this.state = 35;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===4) {
					{
					{
					this.state = 31;
					this.match(ConfigParser.T__3);
					this.state = 32;
					this.value();
					}
					}
					this.state = 37;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 40;
			this.match(ConfigParser.T__4);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public reference(): ReferenceContext {
		let localctx: ReferenceContext = new ReferenceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, ConfigParser.RULE_reference);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 42;
			this.match(ConfigParser.T__5);
			this.state = 43;
			this.match(ConfigParser.NAME);
			this.state = 44;
			this.match(ConfigParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,12,47,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,5,0,12,8,0,10,0,12,0,15,9,0,1,0,1,0,1,
	1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,3,2,28,8,2,1,3,1,3,1,3,1,3,5,3,34,8,3,
	10,3,12,3,37,9,3,3,3,39,8,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,0,0,5,0,2,4,6,8,
	0,0,47,0,13,1,0,0,0,2,18,1,0,0,0,4,27,1,0,0,0,6,29,1,0,0,0,8,42,1,0,0,0,
	10,12,3,2,1,0,11,10,1,0,0,0,12,15,1,0,0,0,13,11,1,0,0,0,13,14,1,0,0,0,14,
	16,1,0,0,0,15,13,1,0,0,0,16,17,5,0,0,1,17,1,1,0,0,0,18,19,5,1,0,0,19,20,
	5,12,0,0,20,21,5,2,0,0,21,22,3,4,2,0,22,3,1,0,0,0,23,28,5,10,0,0,24,28,
	5,11,0,0,25,28,3,6,3,0,26,28,3,8,4,0,27,23,1,0,0,0,27,24,1,0,0,0,27,25,
	1,0,0,0,27,26,1,0,0,0,28,5,1,0,0,0,29,38,5,3,0,0,30,35,3,4,2,0,31,32,5,
	4,0,0,32,34,3,4,2,0,33,31,1,0,0,0,34,37,1,0,0,0,35,33,1,0,0,0,35,36,1,0,
	0,0,36,39,1,0,0,0,37,35,1,0,0,0,38,30,1,0,0,0,38,39,1,0,0,0,39,40,1,0,0,
	0,40,41,5,5,0,0,41,7,1,0,0,0,42,43,5,6,0,0,43,44,5,12,0,0,44,45,5,7,0,0,
	45,9,1,0,0,0,4,13,27,35,38];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ConfigParser.__ATN) {
			ConfigParser.__ATN = new ATNDeserializer().deserialize(ConfigParser._serializedATN);
		}

		return ConfigParser.__ATN;
	}


	static DecisionsToDFA = ConfigParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgContext extends ParserRuleContext {
	constructor(parser?: ConfigParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(ConfigParser.EOF, 0);
	}
	public declaration_list(): DeclarationContext[] {
		return this.getTypedRuleContexts(DeclarationContext) as DeclarationContext[];
	}
	public declaration(i: number): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, i) as DeclarationContext;
	}
    public get ruleIndex(): number {
    	return ConfigParser.RULE_prog;
	}
	public enterRule(listener: ConfigListener): void {
	    if(listener.enterProg) {
	 		listener.enterProg(this);
		}
	}
	public exitRule(listener: ConfigListener): void {
	    if(listener.exitProg) {
	 		listener.exitProg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConfigVisitor<Result>): Result {
		if (visitor.visitProg) {
			return visitor.visitProg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationContext extends ParserRuleContext {
	constructor(parser?: ConfigParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NAME(): TerminalNode {
		return this.getToken(ConfigParser.NAME, 0);
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
    public get ruleIndex(): number {
    	return ConfigParser.RULE_declaration;
	}
	public enterRule(listener: ConfigListener): void {
	    if(listener.enterDeclaration) {
	 		listener.enterDeclaration(this);
		}
	}
	public exitRule(listener: ConfigListener): void {
	    if(listener.exitDeclaration) {
	 		listener.exitDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConfigVisitor<Result>): Result {
		if (visitor.visitDeclaration) {
			return visitor.visitDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	constructor(parser?: ConfigParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ConfigParser.RULE_value;
	}
	public copyFrom(ctx: ValueContext): void {
		super.copyFrom(ctx);
	}
}
export class StringValueContext extends ValueContext {
	constructor(parser: ConfigParser, ctx: ValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(ConfigParser.STRING, 0);
	}
	public enterRule(listener: ConfigListener): void {
	    if(listener.enterStringValue) {
	 		listener.enterStringValue(this);
		}
	}
	public exitRule(listener: ConfigListener): void {
	    if(listener.exitStringValue) {
	 		listener.exitStringValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConfigVisitor<Result>): Result {
		if (visitor.visitStringValue) {
			return visitor.visitStringValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberValueContext extends ValueContext {
	constructor(parser: ConfigParser, ctx: ValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NUMBER(): TerminalNode {
		return this.getToken(ConfigParser.NUMBER, 0);
	}
	public enterRule(listener: ConfigListener): void {
	    if(listener.enterNumberValue) {
	 		listener.enterNumberValue(this);
		}
	}
	public exitRule(listener: ConfigListener): void {
	    if(listener.exitNumberValue) {
	 		listener.exitNumberValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConfigVisitor<Result>): Result {
		if (visitor.visitNumberValue) {
			return visitor.visitNumberValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayValueContext extends ValueContext {
	constructor(parser: ConfigParser, ctx: ValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public array(): ArrayContext {
		return this.getTypedRuleContext(ArrayContext, 0) as ArrayContext;
	}
	public enterRule(listener: ConfigListener): void {
	    if(listener.enterArrayValue) {
	 		listener.enterArrayValue(this);
		}
	}
	public exitRule(listener: ConfigListener): void {
	    if(listener.exitArrayValue) {
	 		listener.exitArrayValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConfigVisitor<Result>): Result {
		if (visitor.visitArrayValue) {
			return visitor.visitArrayValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RefValueContext extends ValueContext {
	constructor(parser: ConfigParser, ctx: ValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public reference(): ReferenceContext {
		return this.getTypedRuleContext(ReferenceContext, 0) as ReferenceContext;
	}
	public enterRule(listener: ConfigListener): void {
	    if(listener.enterRefValue) {
	 		listener.enterRefValue(this);
		}
	}
	public exitRule(listener: ConfigListener): void {
	    if(listener.exitRefValue) {
	 		listener.exitRefValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConfigVisitor<Result>): Result {
		if (visitor.visitRefValue) {
			return visitor.visitRefValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayContext extends ParserRuleContext {
	constructor(parser?: ConfigParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public value_list(): ValueContext[] {
		return this.getTypedRuleContexts(ValueContext) as ValueContext[];
	}
	public value(i: number): ValueContext {
		return this.getTypedRuleContext(ValueContext, i) as ValueContext;
	}
    public get ruleIndex(): number {
    	return ConfigParser.RULE_array;
	}
	public enterRule(listener: ConfigListener): void {
	    if(listener.enterArray) {
	 		listener.enterArray(this);
		}
	}
	public exitRule(listener: ConfigListener): void {
	    if(listener.exitArray) {
	 		listener.exitArray(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConfigVisitor<Result>): Result {
		if (visitor.visitArray) {
			return visitor.visitArray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReferenceContext extends ParserRuleContext {
	constructor(parser?: ConfigParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NAME(): TerminalNode {
		return this.getToken(ConfigParser.NAME, 0);
	}
    public get ruleIndex(): number {
    	return ConfigParser.RULE_reference;
	}
	public enterRule(listener: ConfigListener): void {
	    if(listener.enterReference) {
	 		listener.enterReference(this);
		}
	}
	public exitRule(listener: ConfigListener): void {
	    if(listener.exitReference) {
	 		listener.exitReference(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConfigVisitor<Result>): Result {
		if (visitor.visitReference) {
			return visitor.visitReference(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
