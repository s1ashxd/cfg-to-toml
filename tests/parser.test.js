"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// tests/parser.test.ts
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const parser_1 = require("../src/parser");
const serializer_1 = require("../src/serializer");
function parseSource(source) {
    const parser = new parser_1.Parser(source);
    return parser.parse();
}
describe('Учебный конфигурационный язык → TOML компилятор', () => {
    test('Простые значения: число, строка, пустой массив', () => {
        const source = `
var num := 42.0
var str := 'Hello World'
var empty := ()
    `;
        const constants = parseSource(source);
        expect(constants.get('num')).toBe(42.0);
        expect(constants.get('str')).toBe('Hello World');
        expect(constants.get('empty')).toEqual([]);
    });
    test('Массивы с разными типами и вложенностью', () => {
        const source = `
var flat := (1.1, 2.2, 3.3)
var mixed := ('text', 5.5, (1.0, 2.0))
var nested := ((1.0, 2.0), (3.0, 'inner'), ())
    `;
        const constants = parseSource(source);
        expect(constants.get('flat')).toEqual([1.1, 2.2, 3.3]);
        expect(constants.get('mixed')).toEqual(['text', 5.5, [1.0, 2.0]]);
        expect(constants.get('nested')).toEqual([[1.0, 2.0], [3.0, 'inner'], []]);
    });
    test('Многострочные комментарии игнорируются', () => {
        const source = `
=begin
Это большой комментарий
на несколько строк
=end

var value := 10.5

=begin
Еще один
=end
var another := 'test'
    `;
        const constants = parseSource(source);
        expect(constants.get('value')).toBe(10.5);
        expect(constants.get('another')).toBe('test');
        expect(constants.size).toBe(2);
    });
    test('Константные выражения с ссылками #[name]', () => {
        const source = `
var a := 3.14
var b := #[a]
var c := (#[a], #[b], 2.718)
var d := (#[c], 'ref')
    `;
        const constants = parseSource(source);
        expect(constants.get('b')).toBe(3.14);
        expect(constants.get('c')).toEqual([3.14, 3.14, 2.718]);
        expect(constants.get('d')).toEqual([[3.14, 3.14, 2.718], 'ref']);
    });
    test('Сложная вложенность ссылок и массивов', () => {
        const source = `
var base := 1.0
var vec := (#[base], 2.0, 3.0)
var matrix := (#[vec], (4.0, 5.0, 6.0), #[vec])
var config := (#[matrix], 'final')
    `;
        const constants = parseSource(source);
        const expectedVec = [1.0, 2.0, 3.0];
        const expectedMatrix = [expectedVec, [4.0, 5.0, 6.0], expectedVec];
        expect(constants.get('vec')).toEqual(expectedVec);
        expect(constants.get('matrix')).toEqual(expectedMatrix);
        expect(constants.get('config')).toEqual([expectedMatrix, 'final']);
    });
    test('Полный TOML вывод соответствует ожидаемому', () => {
        const source = `
var port := 8080.0
var host := 'localhost'
var tags := ('api', 'v1', 'prod')
var limits := (100.0, 200.0, #[port])
    `;
        const constants = parseSource(source);
        const toml = (0, serializer_1.serializeToTOML)(constants);
        const expected = `port = 8080.0
host = "localhost"
tags = ["api", "v1", "prod"]
limits = [100.0, 200.0, 8080.0]
`;
        expect(toml).toBe(expected);
    });
    describe('Обработка ошибок', () => {
        test('Необъявленная константа в #[ ]', () => {
            expect(() => {
                parseSource(`var x := #[undefined]`);
            }).toThrow(/Undefined constant 'undefined'/);
        });
        test('Повторное объявление константы', () => {
            expect(() => {
                parseSource(`
var dup := 1.0
var dup := 2.0
        `);
            }).toThrow(/Constant 'dup' already defined/);
        });
        test('Незакрытый многострочный комментарий', () => {
            expect(() => {
                parseSource(`=begin\nКомментарий без конца`);
            }).toThrow(/Unclosed multi-line comment/);
        });
        test('Незакрытая строка', () => {
            expect(() => {
                parseSource(`var s := 'незакрытая строка`);
            }).toThrow(/Unclosed string/);
        });
        test('Число без дробной части', () => {
            expect(() => {
                parseSource(`var n := 42`);
            }).toThrow(/Expected decimal point/);
        });
        test('Некорректный синтаксис после var', () => {
            expect(() => {
                parseSource(`var 123 := 1.0`);
            }).toThrow(/Expected decimal point in number at line 1, column 5/);
        });
        test('Неожиданный токен', () => {
            expect(() => {
                parseSource(`@invalid`);
            }).toThrow(/Unexpected character '@'/);
        });
    });
    test('Интеграционный тест с реальным файлом примера', () => {
        const filePath = path.join(__dirname, '../examples/web-server.cfg');
        const source = fs.readFileSync(filePath, 'utf-8');
        const constants = parseSource(source);
        expect(constants.get('port')).toBe(8080.0);
        expect(constants.get('host')).toBe('localhost');
        expect(constants.get('allowed_ips')).toEqual(['127.0.0.1', '192.168.1.1']);
        expect(constants.get('timeout')).toBe(60.0);
    });
});
