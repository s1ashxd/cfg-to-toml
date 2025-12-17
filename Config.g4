grammar Config;

prog
    : (declaration)* EOF
    ;

declaration
    : 'var' NAME ':=' value
    ;

value
    : NUMBER           # numberValue
    | STRING           # stringValue
    | array            # arrayValue
    | reference        # refValue
    ;

array
    : '(' (value (',' value)*)? ')'
    ;

reference
    : '#[' NAME ']'
    ;

MULTILINE_COMMENT
    : '=begin' .*? '=end' -> skip
    ;

WS : [ \t\r\n]+ -> skip ;

NUMBER : [+-]? [0-9]+ '.' [0-9]+ ;

STRING : '\'' ('\\\' ' | ~['])* '\'' ;  // Поддержка экранирования \' и любых символов кроме '

NAME : [a-zA-Z_] [a-zA-Z_0-9]* ;