// https://swc.rs/docs/usage/plugins#visitor-api

const classAsTranspiledString = `
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
        this.dynamicMethod = function () { return "dynamicMethod"; };
    }
    Foo.prototype.getBar = function () {
        this.dynamicMethodInFunction = function () { return "dynamicMethodInFunction"; };
        return "bar";
    };
    Foo.prototype.concatStringWithNumber = function (sampleString, sampleNumber) {
        return sampleString + sampleNumber;
    };
    Foo.prototype.convertNumberToString = function (value) {
        return value.toString();
    };
    Foo.prototype.getStringById = function (value) {
        return value.toString();
    };
    Foo.prototype.sumTwoNumbers = function (a, b) {
        return a + b;
    };
    Foo.prototype.sampleMethodWithOptionalArgument = function (a, b) {
        return a + b;
    };
    Foo.prototype.sampleMethodWithTwoOptionalArguments = function (a, b) {
        return a + b;
    };
    Foo.prototype.sampleMethodReturningPromise = function (value) {
        return Promise.resolve(value);
    };
    Foo.prototype.sampleMethodReturningVoidPromise = function (value) {
        return Promise.resolve();
    };
    Foo.prototype.sampleMethodReturningVoidPromiseWithoutParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    return Foo;
}());
exports.Foo = Foo;

`;

const Visitor = require('@swc/core/Visitor.js').Visitor;
const swc = require('@swc/core');

const names = [];
class ExVisitor extends Visitor {
  visitFunction(n) {
    !!n.identifier?.value && names.push(n.identifier.value);
    return super.visitFunction(n);
  }
  visitAssignmentExpression(n) {
    if (n.right?.type === 'FunctionExpression') {
      n.left?.type === 'MemberExpression' && names.push(n.left.property.value);
    }
    return super.visitAssignmentExpression(n);
  }
}

class Transformer {
  static run() {
     swc.transformSync(classAsTranspiledString, {
      plugin: (program) => new ExVisitor().visitProgram(program),
    });
    console.log('names', names);
  }
}

Transformer.run();
