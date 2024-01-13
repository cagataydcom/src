const data = require("@cagatayd/data"), { PermissionFlagsBits } = require("@discordjs/core");

module.exports = new class Discord {
    message(x = {}) {
        if (x?.components) {
            let fl = (_) => x.components.filter(y => y.type === _), filter = { "0": fl(2), "1": fl(3), "2": fl(4), "3": fl(5), "4": fl(6) }, comps = []; for (let i = 0; i < 5; i++) {
                if (filter[`${i}`].length > 0 && filter[`${i}`].length <= 5) comps.push(this.components(filter[`${i}`], true));
                if (filter[`${i}`].length > 5) { comps.push(this.components(filter[`${i}`].slice(0, 5), true)); comps.push(this.components(filter[`${i}`].slice(5), true)) };
            }; x.components = comps;
        };
        return { tts: false, content: null, embeds: [], allowed_mentions: { parse: null, roles: null, users: null, replied_user: false }, flags: null, components: [], attachments: [], ...x }
    };
    embed(x) { if (x?.color) { x.color = parseInt(x.color.replace("#", ""), 16) }; return { title: null, type: "rich", description: null, url: null, timestamp: null, color: null, footer: { text: null, icon_url: null, proxy_icon_url: null }, image: { url: null, proxy_url: null, height: null, width: null }, thumbnail: { url: null, proxy_url: null, height: null, width: null }, video: { url: null, proxy_url: null, height: null, width: null }, provider: { name: null, url: null }, author: { url: null, name: null, icon_url: null, proxy_icon_url: null }, fields: [], ...x } }
    components(x = [], object = false) { let y = { type: 1, components: Array.isArray(x) ? x : [] }; return (object ? y : [y]) };

    component = {
        types: [
            { type: 2, style: 1 || 2 || 3 || 4 || 5, label: null, emoji: null, custom_id: null, url: null, disabled: false },
            { type: 3, custom_id: null, options: [], placeholder: null, default_value: [], min_values: 1, max_values: null, disabled: false },
            { custom_id: null, style: 1 || 2, label: null, min_length: null, max_length: null, required: false, value: null, placeholder: null }
        ],
        button: (x) => { return { ...this.component.types[0], ...x } },
        string_select: (x) => { return { ...this.component.types[1], ...x } },
        text_input: (x) => { return { ...this.component.types[2], max_values: 4000, type: 4, ...x } },
        user_select: (x) => { return { ...this.component.types[2], type: 5, ...x } },
        role_select: (x) => { return { ...this.component.types[2], type: 6, ...x } },
        mentionable_select: (x) => { return { ...this.component.types[2], type: 7, ...x } },
        channel_select: (x) => { return { ...this.component.types[2], type: 8, ...x } }
    }
    modal(x, y = []) { x.components = []; y.forEach(z => x.components.push({ type: 1, components: [z] })); return { title: null, custom_id: null, ...x } };

    attachment(x) { return { id: null, filename: null, description: null, content_type: null, size: null, url: null, proxy_url: null, height: null, width: null, ephemeral: false, duration_secs: null, waveform: null, flags: null, ...x }; }

    language = class {
        constructor(opt = {}) { if (!opt) opt = {}; Object.entries(opt).forEach(([key, value]) => this[key] = value); return; }

        path = data.cwd() + "/discord/language/";
        languages = require("node:fs").readdirSync(this.path, { withFileTypes: true }).filter(x => (x.isFile() && x.name.endsWith(".json"))).map(x => x.name.replace(".json", ""));

        key_prefix = "";
        default_lang = "en-US";

        _isStartsWithKey(key = "", nokey = false) { return (nokey ? key : String(key).startsWith(this.key_prefix) ? key : this.key_prefix + key) }

        getStartsWith(key, nokey = false) {
            key = this._isStartsWithKey(key, nokey);
            let a = {}, b = _ => require(this.path + _ + ".json");
            this.languages.forEach(c => { let file = b(c); a[c] = {}; Object.entries(file).filter(e => e[0].startsWith(key)).forEach(e => a[c] = { ...a[c], [e[0]]: e[1] }) })
            return a;
        }

        getOptions(key = "", nokey = false, desc_name = "description", disable_desc = false, langs) {
            key = this._isStartsWithKey(key, nokey);
            if (typeof langs !== "object") langs = this.getStartsWith(key, nokey);
            let a = { name: langs[this.default_lang][key], [desc_name]: langs[this.default_lang][`${key}_desc`], name_localizations: {}, ...(disable_desc ? {} : { [desc_name + `_localizations`]: {} }) };
            if (disable_desc) delete a[desc_name];
            delete langs[this.default_lang]; Object.entries(langs).forEach(([flag, values]) => { a.name_localizations[flag] = values[key]; if (!disable_desc) a[desc_name + `_localizations`][flag] = values[`${key}_desc`] })
            return a;
        };

        getBulk(flag) {
            let key = this._isStartsWithKey(), langs = this.getStartsWith(key), global = this.getStartsWith("global", true);
            if (!this.languages.find(a => a === flag)) flag = this.default_lang;
            return { ...langs[flag][`${key}_bulk`], ...global[flag].global };
        }

        com = {
            user: (required = true) => ({ type: 6, required, ...this.getOptions("IC__tag_user", true) })
        }
    }

    convertIDtoUnix(id) {
        id = String(id);
        let bin = (+id).toString(2), unixbin, unix, m = 64 - bin.length;
        unixbin = bin.substring(0, 42 - m); unix = parseInt(unixbin, 2) + 1420070400000;
        return String(unix);
    }

    checkPermission(a, b) { return ((BigInt(a) & b) === b) }
    permissions(a) {
        let b = []; // todo: fuck that shit
        Object.entries(PermissionFlagsBits).forEach(([name, integ]) => { if (this.checkPermission(a, integ)) b.push(name) });
        return b
    }

}