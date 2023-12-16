const { } = require("@discordjs/core");

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
    embed(x) { return { title: null, type: "rich", description: null, url: null, timestamp: null, color: null, footer: { text: null, icon_url: null, proxy_icon_url: null }, image: { url: null, proxy_url: null, height: null, width: null }, thumbnail: { url: null, proxy_url: null, height: null, width: null }, video: { url: null, proxy_url: null, height: null, width: null }, provider: { name: null, url: null }, author: { url: null, proxy_url: null, icon_url: null, proxy_icon_url: null }, fields: [], ...x } }
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

}