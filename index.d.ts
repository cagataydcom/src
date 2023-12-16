import { Application, Request, Response, NextFunction } from "express";
import { Pool, PoolConfig, QueryOptions } from "mysql";
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
    hostConfig(__dirname: string): { id: string, devMode: number, hostname: string, hosts: object };
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

    discord = new class Discord {
        message(options: Discord_Message): Discord_Message;
        embed(options: Discord_Embed): Discord_Embed;
        components(array: Array<Dc_Comp_button | Dc_Comp_string_select | Dc_Comp_text_input | Dc_Comp_user_select | Dc_Comp_role_select | Dc_Comp_mentionable_select | Dc_Comp_channel_select>, object: boolean): [{ type: 1, components: Array<Dc_Comp_button | Dc_Comp_string_select | Dc_Comp_text_input | Dc_Comp_user_select | Dc_Comp_role_select | Dc_Comp_mentionable_select | Dc_Comp_channel_select> }];
        component: {
            button(options: Dc_Comp_button): Dc_Comp_button,
            string_select(options: Dc_Comp_string_select): Dc_Comp_string_select,
            text_input(options: Dc_Comp_text_input): Dc_Comp_text_input,
            user_select(options: Dc_Comp_user_select): Dc_Comp_user_select,
            role_select(options: Dc_Comp_role_select): Dc_Comp_role_select,
            mentionable_select(options: Dc_Comp_mentionable_select): Dc_Comp_mentionable_select,
            channel_select(options: Dc_Comp_channel_select): Dc_Comp_channel_select
        };
        attachment(options: Discord_Attachment): Discord_Attachment;
        modal(options: { title: string, custom_id: string }, components: Array<Dc_Comp_text_input>): { title: string, custom_id: string, components: Array<{ type: 1, components: Dc_Comp_text_input }> };
    }
    Middleware = class Middleware {
        constructor(...arg: Array<T>): any;
        /** @example new Middleware(["GET", "POST"]).allowMethod */
        allowMethod = RequestHandle;
        /** @example new Middleware(permLevel: Number).permission */
        permission = RequestHandle;
    }
    schema = new class Schema {
        user(arg: object): { id: Number, uuid: String, username: String };
    }
    struct = new class Struct {
        /** @deprecated */
        express(): Application;
        mysql(config?: PoolConfig): Pool;
    }
}

interface Discord_Message {
    tts: boolean, content: string,
    embeds: Array<Discord_Embed>,
    allowed_mentions: { parse: Array<string>, roles: Array<string>, users: Array<string>, replied_user: boolean },
    flags: string,
    components: [{ type: 1, components: Array<Dc_Comp_button | Dc_Comp_string_select | Dc_Comp_text_input | Dc_Comp_user_select | Dc_Comp_role_select | Dc_Comp_mentionable_select | Dc_Comp_channel_select> }],
    attachments: Array<Discord_Attachment>
}

interface Discord_Embed { title: string, type: "rich" | "image" | "video" | "gifv" | "article" | "link", description: string, url: string, timestamp: Date, color: "", footer: { text: string, icon_url: string, proxy_icon_url: string }, image: { url: string, proxy_url: string, height: "", width: "" }, thumbnail: { url: string, proxy_url: string, height: "", width: "" }, video: { url: string, proxy_url: string, height: "", width: "" }, provider: { name: string, url: string }, author: { text: string, icon_url: string, proxy_icon_url: string }, fields: Array<{ name: string, value: string, inline: boolean }> };
interface Dc_Comp_button { type: 2, style: 1 | 2 | 3 | 4 | 5, label: string, emoji: string, custom_id: string, url: string, disabled: boolean };
interface Dc_Comp_string_select { type: 3, custom_id: string, options: Array<{ label: string, value: string, description: string, emoji: { id: string, name: string }, disabled: false }>, placeholder: string, default_value: Array<{ id: string, type: "user" | "role" | "channel " }>, min_values: number, max_values: number, disabled: boolean };
interface Dc_Comp_text_input { type: 4, custom_id: string, style: 1 | 2, label: string, min_length: number, max_length: number, required: boolean, value: string, placeholder: string };
interface Dc_Comp_user_select extends Dc_Comp_text_input { type: 5 }
interface Dc_Comp_role_select extends Dc_Comp_text_input { type: 6 }
interface Dc_Comp_mentionable_select extends Dc_Comp_text_input { type: 7 }
interface Dc_Comp_channel_select extends Dc_Comp_text_input { type: 8 }
interface Discord_Attachment { id: string, filename: string, description: string, content_type: string, size: number, url: string, proxy_url: string, height: number, width: number, ephemeral: boolean, duration_secs: number, waveform: string, flags: number }


export = src;