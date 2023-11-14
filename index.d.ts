import { Application, Request, Response, NextFunction } from "express";
import { Pool, PoolConfig, QueryOptions } from "mysql";
import { Strategy } from "passport-strategy";
import _bcrypt from "bcrypt";
import { RequestOptions } from "http";

interface ResponseOptions { id?: string, status?: number, data?: Array<T> | object | string, errors?: Array<T> | string };
function RequestHandle(req: Request, res: Response, next: NextFunction): any;

class Util {
    data(path: string, use_FS: boolean): object;
    random(length: number, size: number, splitter: "-" | string): String;
    lang(text: string, values: Array<T> | string | 0, language: "tr"): String;
    log(text: string, values: Array<T> | string | 0, path: string, platform?: "discord" | "mysql" | "web" | 0, type?: "log" | "warn" | "error"): any;
    response(request: request, options?: ResponseOptions | string | number): any;

    options = require("../data/system/config.json");
    page_options(page: string): object;
    render(req: Request, page: string, customJson: object): any;
}

const src = new class CagatayD extends Util {
    /** @example .db({ sql: "SELECT 1=?", values:[1] }).then(...) */
    db(query: QueryOptions): Promise<{ error: boolean, data: Array<T> }>;

    fetch(uri: string, options?: RequestOptions, no_json?: boolean): Promise<{ success: boolean, response: object } | { success: boolean, error: object }>;

    crypto = new class Crypto {
        private module = _bcrypt;
        hash(text: string): Promise<String>;
        compare(text: string, hash: string): Promise<boolean>;
    }
    Middleware = class Middleware {
        constructor(...arg: Array<T>): any;
        /** @example new Middleware(["GET", "POST"]).allowMethod */
        allowMethod = RequestHandle;
        /** @example new Middleware(permLevel: Number).permission */
        permission = RequestHandle;
    }
    passport = new class Passport {
        cagataydcom: (options: object, verify: Function) => Strategy;
        local: (options: object, verify: Function) => Strategy;
    }
    schema = new class Schema {
        user(arg: object): { id: Number, uuid: String, username: String };
    }
    struct = new class Struct {
        express(app: Application, options?: { passport: boolean }): Application;
        mysql(config?: PoolConfig): Pool;
    }
}

export = src;